// node js module import
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// http 객체에 있는 createServer함수를 호출 -> 서버를 만듬
// callback  함수를 통해서 응답, 요청에 대해 객체로 인자를 사용하여 웹서버 접속에 대해서 응답을 줌
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// server 갹채룰 이용하여 웹서버가 특정 ip, port로 바라보도록 함
// listen함수는 비동기로 동작하고 특정 포트로 접속이 완료되면 callback함수를 실행함 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


