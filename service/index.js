// Express
const express = require('express');
const app = express();

// Server
const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));
app.use(express.json());

// WebSocket
const { WebSocketServer } = require('ws');

/// Database
const DB = require('./database.js');

// Auth
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const authCookieName = 'token';

app.use(cookieParser());

var apiRouter = express.Router();
app.use('/api', apiRouter);

//////////////////////
// Authentication  //

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user); // Update token in DB
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
    res.status(401).send({ msg: 'Incorrect username or password (or username is taken)' });
    return;
  }
  res.status(404).send({ msg: 'User does not exist' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Helper functions

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 2);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  
  await DB.createUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value)
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

////////////////////////////
// Applicaiton Endpoints //

// Send message
apiRouter.post('/send', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    req.body.message.sender = user.email; // Make sure the user isn't pretending to be someone else

    await DB.saveMessage(req.body.message);

    res.status(201).send({status: "sent"});
})

// Get messages
apiRouter.get('/inbox', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const messages = await DB.getMessages(user.email);
    
    res.status(201).send(messages);
});

// Delete a message
apiRouter.delete('/inbox/:id', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    await DB.deleteMessage(req.params.id, user.email);
    
    res.status(204).end();
});

// Mark a message as read
apiRouter.patch('/inbox/:id', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    await DB.markMessage(req.params.id, req.body.isUnread, user.email);

    res.status(204).end();
});

// Test
apiRouter.get('/test', (_req, res) => {
    res.send({text: "Hello World!"});
});

// Secure test
apiRouter.get('/test/secure', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    res.send({text: "Hello to you, " + user.email});
});

//////////////////////////////////////
// Additional Server Configuration //

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

////////////////
// WebSocket //

const socketServer = new WebSocketServer({ server: httpService });

socketServer.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log("From client: ", data);
    });

    console.log("WebSocket Connected")
});