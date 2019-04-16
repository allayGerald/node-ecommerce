const http = require('http');

http.createServer((req, res) => {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head ><h1 style="color:red">THE HEAD</h1></head>');
res.write('<body>Hello World</body>');
res.write('</html>');
res.end();
}).listen('3000');