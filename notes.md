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

## JavaScript
- While using Async/Wait, make sure function names are spelled correctly! I had a typo, and so the `try` block was jumping to the `catch` and I had no idea why until I noticed the typo.

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