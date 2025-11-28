# CS 260 Notes

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [AWS Console](https://us-east-2.console.aws.amazon.com/console/home?region=us-east-1#)
- [My Website](http://52.7.203.77)

## AWS

My IP address is: `52.7.203.77`  
Domain name: `leeway001.click` (Test domain [here](https://leeway001.click))

### Domain records:
I need to do some research or asking to better understand the meaning of Hosted Zone, Domain, and Domain Records.

| Record Type | Purpose                                |
|-------------|----------------------------------------|
| A | Associate IP address with Domain name |
| SOA | "Start of Authority" - Contact info for owner |
| NS | "Name Server" - Notes which name server authorized you to use this name. Security. |

## Caddy

## HTML
- Certain HTML elements don't behave any differently from a `div` element, they simple provide variety to semantics.
  - header
  - fooder
  - section
  - aside
- A `nav` element does behave slightly differently.

## CSS
- Bootstrap is very new to me, and so far feels harder than CSS because I can't get as granular with it.
- Bootstrap is great for easy formatting, but animations and more customized styles require CSS
#### How to allow dark mode
I did some experimenting and figured out a way I could implement system theme detection and automatically enable dark mode. Here's a general outline:
- A high-level div (body makes good sense) just needs the `data-bs-theme` attribute. [Using a hook to update theme](https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48) here could work great.
- Body element needs to be colored with bootstrap theme colors

```js
// App.jsx //

<div className="body" data-bs-theme="dark">...</div>
```

```css
/* App.css */
.body {
    background-color: var(--bs-body-bg);
    color: var(--bs-body-color);
}
```  
Now those colors--and the colors of any descenant elements without specified colors--will respond to theme.

## JavaScript
- While using Async/Wait, make sure function names are spelled correctly! I had a typo, and so the `try` block was jumping to the `catch` and I had no idea why until I noticed the typo.
- Placing a function inside `(...)()` will make it run immediately. This seems pointless, but to run `async` code it may prove useful.
- Inside any useEffect() function for a component, any state variable you want to use inside must be included in the dependency array. Otherwise they will evaluate to null when you try to use them.

## Service
- Commands to test authentication:
    ```
    host=http://localhost:4000

    curl -X POST $host/api/auth/create -H 'Content-Type: application/json' -d '{"email":"cosmo@byu.edu", "password":"byu"}' -c cookies.txt -b cookies.txt

    curl -X GET $host/api/test/secure -H "Content-Type: application/json" -c cookies.txt -b cookies.txt
    ```
- Turns out lots of errors don't print when you're running the server via `node`. I got really confused when user creation started ending execution after bcrypt hashes the password, I thought it was stalling (because my print statements made it look like it was), but the client was getting an undefined result back. Turns out, the password was undefined in the request body.

- I used to get this error when I accessed a page via route any way other than navigating with a routing button (e.g. reloading the page) `"Cannot GET /\<route>"` The solution was to add the following endpoint:
```js
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
```

## Database
- **Middleware** - The procedures that run between endpoint requests to backend API before responding. Example:
```js
app.use(function(req, res, next) {
  // 2
});

app.get('/path', (req, res) => { // 1
  res.send(''); // 3
});
```

## WebSocket
To debug websocket connections on local machine with Vite (e.g. `npm run dev`), specify a `/ws` proxy in vite config similar to how you would for hosting a server.
```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});
```
### Upgrade to WebSocket connection (must be done by the client):
```js
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'; // ws for http, wss for https
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`); 

    this.socket.onopen = (event) => {
        console.log("WebSocket Connected");
    };
    this.socket.onclose = (event) => {
        console.log("WebSocket Disconnected");
    };
    this.socket.onmessage = async (msg) => {
      try {
        const text = JSON.parse(await msg.data);
        console.log(`From server: ${text}`);
      } catch {}
    };
```

### Handle WebSocket from server
This code is almost directly from simon-websocket, just refactored to fit in one script. I only mostly understand it.
```js
    const { WebSocketServer } = require('ws');

    // Create a WebSocket instance for the server
    const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    });

    const socketServer = new WebSocketServer({ server: httpServer }); // Create instance

    socketServer.on('connection', (socket) => { // Receive upgrade request, which automatically comes here with instance created?
        socket.isAlive = true;

        // Forward messages to everyone except the sender
        socket.on('message', function message(data) {
        socketServer.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(data); // Simple example of how to send messages from server to client
            }
        });
        });

        // Respond to pong messages by marking the connection alive
        socket.on('pong', () => {
        socket.isAlive = true;
        });
    });

    // Periodically send out a ping message to make sure clients are alive
    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
        if (client.isAlive === false) return client.terminate();

        client.isAlive = false;
        client.ping();
        });
    }, 10000);
```

### Message from client to server
```js
    this.socket.send(JSON.stringify(msg));
```