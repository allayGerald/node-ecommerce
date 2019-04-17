const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
res.setHeader('Content-Type', 'text/html');
const url = req.url;
const method = req.method;
if(url === '/'){
    res.write('<html>');
    res.write('<head ><h1 style="color:red">THE HEAD</h1></head>');
    res.write('<body><form method="POST" action="/message"><input type="text" name="message"/><button>Send</button></form></body>');
    res.write('</html>');
    return res.end(); 
}

if(url === '/message' && method === 'POST'){
    fs.writeFileSync('message.pdf', 'Dummy');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
}
res.write('<html>');
res.write('<head ><h1 style="color:red">THE HEAD</h1></head>');
res.write('<body>Hello World</body>');
res.write('</html>');
res.end();
}).listen('3000');