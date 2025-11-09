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

## Service
- Commands to test authentication:
    ```
    host=http://localhost:4000

    curl -X POST $host/api/auth/create -H 'Content-Type: application/json' -d '{"email":"cosmo@byu.edu", "password":"byu"}' -c cookies.txt -b cookies.txt

    curl -X GET $host/api/test/secure -H "Content-Type: application/json" -c cookies.txt -b cookies.txt
    ```
- Turns out lots of errors don't print when you're running the server via `node`. I got really confused when user creation started ending execution after bcrypt hashes the password, I thought it was stalling (because my print statements made it look like it was), but the client was getting an undefined result back. Turns out, the password was undefined in the request body.

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