const { MongoClient, ObjectId } = require('mongodb');
const config = require('./db-config.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('sincerely-app');
const userColl = db.collection('users');
const msgColl = db.collection('messages');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
    return userColl.findOne({email: email});
}

function getUserByToken(token) {
    return userColl.findOne({token: token});
}

async function createUser(user) {
    await userColl.insertOne(user);
}

async function updateUser(user) {
    return userColl.updateOne({email: user.email}, {$set: user});
}

function getMessages(email) {
    const cursor = msgColl.find({recipient: email});
    return cursor.toArray();
}

async function saveMessage(message) {
    return msgColl.insertOne(message);
}

async function deleteMessage(id, email) {
    if (id !== '0') {
        return msgColl.deleteOne({ _id: new ObjectId(id), recipient: email })
    }
    return msgColl.deleteMany({ recipient: email, isUnread: false });
}

async function markMessage(id, unread, email) {
    if (id !== '0') {
        return msgColl.updateOne({ _id: new ObjectId(id), recipient: email }, { $set: {isUnread: unread} });
    }

    return msgColl.updateMany({ recipient: email }), { $set: {isUnread: unread} };
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUser,
  getMessages,
  saveMessage,
  deleteMessage,
  markMessage
};