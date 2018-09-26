# nodejs
Nodejs Theory and practice


[설치하기](#설치하기)  
[웹 서버 기동시키기](#웹-어플리케이션-만들기)  
[NPM](#npm)  
[Express](#express)


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
3. http://127.0.0.1:3000 으로 접속하여 실행시킨 웹 서버로 접속할 수 있다.  
<img width="232" alt="2018-09-09 10 29 45" src="https://user-images.githubusercontent.com/18157844/45260200-67007500-b41b-11e8-92ab-a7ea8c651381.png">

사용자가 브라우저 주소 입력창에서 http://127.0.0.1:3000 을 입력했을 때 hostname(127.0.0.1), port(3000) 정보를 웹 어플리케이션이 Listen하고 있다가 결과를 처리는 것  
<img width="521" alt="2018-09-09 10 42 29" src="https://user-images.githubusercontent.com/18157844/45260263-2c97d780-b41d-11e8-9b45-5a7ecf01d682.png">

#### 코드설명
+ require  
: 'http'라는 모듈을 가져와서 사용하게하는 것으로 변수 http를 통해서 모듈을 제어할 수 있음  const 상수, 한번 할당되면 값을 중간에 바꿀 수 없음

+ http.createServer
: http에 해당하는 server객체를 반환함 

+ server.listen 
: http connections을 위한 listening이 시작됨  


## NPM
 : Node Packaged Manager의 약자로 Node.js로 만들어진 module을 관리해주는 툴로 기존에 만들어진 공개적인 모듈을 설치해서 사용할 수 있다. 더 나아가서 이후 그 모듈이 업데이트 할 경우 의존성이 존재해서 관리하기도 편하다.  

### uglify-js 설치하고 사용하기
1. https://www.npmjs.com 로 접속해서 uglify-js 검색한다.
2. 설치 명령어를 이용해서 설치한다.
- global이 불을 때 : 컴퓨터 전역에서 사용하는 독립적인 소프트웨어로 사용됨
~~~
npm install uglify-js -g
~~~
- global이 안 붙을 때 : 패키지를 설치하는 프로젝트 안에서 부품으로 사용됨 
~~~
npm install uglify-js
~~~ 
<img width="550" alt="2018-09-09 3 52 43" src="https://user-images.githubusercontent.com/18157844/45262036-4cdd8b80-b449-11e8-9b46-813a6c0f82f8.png">

3. js파일을 만들어서 코드를 입력한다.
<img width="306" alt="2018-09-09 3 58 45" src="https://user-images.githubusercontent.com/18157844/45262041-5ff05b80-b449-11e8-99f6-cb7122156d3e.png">

4. uglifyjs 명령어로 모듈을 실행한다.
~~~
uglifyjs pretty.js
~~~
-> 4행으로 되어있던 코드가 한줄로 변경됨
~~~
uglifyjs pretty.js -m
~~~
-> name이라는 지역변수가 l로 변경됨
~~~
uglifyjs pretty.js -o uglified.js -m
~~~
-> uglified.js파일로 minify되어 새로 생성됨  
<img width="436" alt="2018-09-09 4 01 29" src="https://user-images.githubusercontent.com/18157844/45262079-f290fa80-b449-11e8-9b0f-25b9f15abcea.png">

### 프로젝트를 패키지화 하기
1. 패키지화 할 프로젝트 내에서 npm init 명력어를 입력한다.
2. 디폴트 값으로 설정 후 모두 enter눌러서 넘어가고 제일 마지막에 yes를 입력해서 완료한다.
<img width="532" alt="2018-09-09 4 15 02" src="https://user-images.githubusercontent.com/18157844/45262135-b8c0f380-b44b-11e8-9e7e-737af9c6398f.png">
3. 완료하면 프로젝트 내에 package.json파일이 생성된다.
<img width="662" alt="2018-09-09 4 17 04" src="https://user-images.githubusercontent.com/18157844/45262141-d1c9a480-b44b-11e8-92c4-ee0f0ba46263.png">

### underscore
#### 설치하기
1. 설치 명령어를 이용해서 설치한다.
	> npm install underscore  
	> npm install underscore --save  

--save : dependencies가 추가되며포함되어 있는 모듈을 쉽게 가져올 수 있음  
(설명) 일시적으로 사용하는 것들에 대해서는 --save를 빼고 설치한다.  
프로젝트에 반드시 같이 가지고 다녀야 한다면 --save를 추가해서 설치하고 dependencies안에 추가되어 사용할 수 있다.  
![underscore](https://user-images.githubusercontent.com/18157844/45262242-2ff78700-b44e-11e8-8bd5-f7738706b5cd.png)

2. 설치된 프로젝트 폴더 내에 node_module이 생성된 것을 확인할 수 있다.
<img width="270" alt="2018-09-09 4 30 01" src="https://user-images.githubusercontent.com/18157844/45262217-b364a880-b44d-11e8-867d-41565b928da6.png">

#### 사용하기
1. 스크립트 파일을 생성해서 아래의 코드를 입력한다.
~~~
var _ = require('underscore');
var array = [1,2,3,4,5];
~~~
2. 첫번째 요소, 마지막 요소 가져오기
~~~
console.log('첫번째 요소 : ' + array[0]);
console.log('첫번째 요소 : ' + _.first(array));
console.log('마지막 요소 : ' + array[array.length -1]);
console.log('마지막 요소 : ' + _.last(array));
~~~
3. 결과 확인하기
<img width="156" alt="2018-09-09 4 44 51" src="https://user-images.githubusercontent.com/18157844/45262329-bb254c80-b44f-11e8-87ef-60ce87c87b91.png">

## Express
> Express는 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크입니다.
>> [참조] http://expressjs.com/ko/

### 설치하기
1. 어플리케이션을 보관할 디렉토리를 생성한다.
~~~
# mkdir webserver
# cd webserver
~~~
2. 디렉토리를 패키지화 하기 위해서 npm init 명령어를 이용하여 package.json파일을 생성한다.
~~~
# npm init
// 필요한 정보를 입력한다. (enter로 넘어가면 기본값 설정됨)
package name: (webserver) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
~~~
3. express를 설치하기 위해 npm install명령어를 이용하여 설치한다. 단, dependencies로 설정되어 프로젝트 내에서 일회성이 아닌 모듈을 포함해서 사용하기 위해 --save 옵션을 주어 express를 설치한다.
~~~
# npm install --save express
~~~
4. package.json파일에서 express설치를 확인한다.
~~~
# cat package.json
{
  "name": "webserver",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3"
  }
}
~~~
#### 기본 파일
: express를 사용해서 웹 어플리케이션을 만들기 위해 기본적으로 app.js 파일을 생성해야한다. app.js는 가장 최초의 진입점이라고 할 수 있는 파일이며 main application이라고 칭한다.
1. app.js 파일을 생성한다.
2. 아래의 코드를 작성한다.
~~~
var express = require('express');
var app = express();

app.listen(3000, function() {
	// 3000 포트로 리슨되면 실행되는 콜백함수
	console.log('Connected 3000 port!');
}); // 웹 어플리케이션이 3000 포트를 리슨함
~~~
3. app.js를 실행한다.
~~~
# node app.js
Connected 3000 port!
~~~
4. localhost:3000 로 접속해서 확인한다.
<img width="260" alt="2018-09-15 5 09 00" src="https://user-images.githubusercontent.com/18157844/45930075-aab7ba80-bf95-11e8-81da-4f4784e9f977.png">

### 라우트
: 라우터란 사용자의 요청을 어떤 컨트롤러(요청에 대한 처리)로 전달할지에 대해 결정하는 중간 연결자의 역할을 하는 것을 의미한다.  
(사용자 - 라우터 - 컨트롤러)
> 라우팅은 애플리케이션 엔드 포인트(URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식을 말합니다.
>> [참조] http://expressjs.com/ko/guide/routing.html

+ 기본적인 라우트
~~~
var express = require('express');
var app = express();

// 사용자가 접속하는 방식 (get, post)
app.get('/', function(req, res) {
	// 사용자가 home ('/')으로 접속했을 때, 두번째 인자가 실행됨

	// 응답함
	res.send('Hello home');
});
~~~
<img width="259" alt="2018-09-15 5 13 18" src="https://user-images.githubusercontent.com/18157844/45930027-d25a5300-bf94-11e8-8ea6-48c74fbe4a4f.png">

+ 라우트 경로 (루트와 다른 경로)
~~~
// 루트 경로
app.get('/', function(req, res) {
	res.send('Hello home');
});
// login 경로
app.get('/login', function(req, res) {
	res.send('<h1>Login please</h1>');
});
~~~
<img width="305" alt="2018-09-15 5 14 32" src="https://user-images.githubusercontent.com/18157844/45930032-e30ac900-bf94-11e8-91cf-d44eb61e5248.png">

### 정적 파일 제공
> 프로그래밍 적으로 만들어진 정보를 동적이라고 하며 한번 만들어진 것이 언제나 똑같이 보이는 것을 정적이라고 한다. 예) CSS, JavaScript, 이미지 등등
1. 실행될 nodejs파일과 같은 레벨에 public 폴더를 생성한다.  
2. 폴더에 이미지 파일을 하나 추가한다. (code.png파일을 public폴더에 추가함)
3. 다음과 같이 app.js에 public폴더를 정적인 것으로 지정한다는 코드를 작성하고 실행시킨다.
~~~
# vi app.js

var express = require('express');
var app = express();

app.use(express.statuc('public'));

app.listen(3000, function() {
	console.log('Connected 3000 port!');
});

# node app.js
~~~
4. localhost:3000/code.png 실행 -> 이미지가 보임
5. 라우트 경로를 통해서 html페이지를 보이고 싶을 때 다음과 같은 코드를 작성하고 실행시킨다.
~~~
# vi app.js

app.get('/code', function(req, res) {
	res.send('Hello world. <img src="/code.png">');
});

# node app.js
~~~
6. localhost:3000/code 실행 -> code.png이미지가 추가된 html페이지가 보임
<img width="775" alt="2018-09-23 11 55 03" src="https://user-images.githubusercontent.com/18157844/45929507-d8006a80-bf8d-11e8-9c61-e007fe36979d.png">

### 동적인 웹페이지 제공
: 동적인 페이지는 프로그래밍 적으로 코드의 수정이 있으면 다시 node app.js로 재실행 후 결과를 확인할 수 있다. 다시 말해서, 이미 기동중인 코드가 수정된다면 재기동 전까지 반영되지 않는다.
1. app.js에 아래와 같은 코드를 추가한 후 다시 실행시킨다.
~~~
# vi app.js

app.get('/dynamic', function(req, res) {
        var lis = '';
        for (var i=0; i<5; i++) {
                lis = lis + '<li>dynamic</li>';
        }

        var time = Date();
        var output = `
        <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title></title>
            </head>
            <body>
                Hello, Dynamic!
                <ul>
                  ${lis}
                </ul>
                ${time}
            </body>
          </html>`;

          res.send(output);
});

# node app.js
~~~
+ `는 그레이브라고 불리우며 자바스크립트 안에서 html코드를 추가할 때 묶을 수 있는 표기법이다.  
(mac에서 그레이브는 option + ~ 을 입력해서 사용함)
+ 그레이브로 묶은 html문자열 사이에 변수를 넣으려면 ${변수명}으로 사용한다.

2. 결과를 확인한다.
<img width="347" alt="2018-09-24 4 18 14" src="https://user-images.githubusercontent.com/18157844/46078968-acb98d80-c1d0-11e8-9fa4-128e5b75993e.png">
