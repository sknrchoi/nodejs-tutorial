# nodejs
Nodejs Theory and practice

## 설치하기
1. https://nodejs.org 이동한다.
2. Download버튼을 클릭해서 해당되는 운영체제에 맞는 것을 클릭한다.
(나는 macOS를 사용중이기에 macOS Installer를 선택함)
![nodejs_down_1](https://user-images.githubusercontent.com/18157844/44954325-54e27c00-aedb-11e8-9892-f166ec7a4af8.png)
3. 다운로드된 node-v8.11.4.pkg파일을 더블클릭해서 설치를 진행한다.
4. 제대로 설치되어있는지 확인한다. 
	> node --version
	v8.11.4


## 웹 어플리케이션 만들기
~~~
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
~~~
1. webserver.js파일을 생성하고 위의 코드를 추가한다. 
2. node {파일명.js}를 입력하여 웹서버 어플리케이션을 실행시킴
	> node webserver.js
2. 브라우저를 통해서 실행시킨 웹 서버로 접속할 수 있다.
