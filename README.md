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


## NPM (Node Packaged Manager)
 : Node.js로 만들어진 module을 관리해주는 툴로 기존에 만들어진 공개적인 모듈을 설치해서 사용할 수 있다. 더 나아가서 이후 그 모듈이 업데이트 할 경우 의존성이 존재해서 관리하기도 편하다.  

### uglify-js 설치하고 사용하기
1.https://www.npmjs.com 로 접속해서 uglify-js 검색한다.
2. 설치 명령어를 이용해서 설치한다.
	> npm install uglify-js -g
global이 불을 때 : 컴퓨터 전역에서 사용하는 독립적인 소프트웨어로 사용됨
	> npm install uglify-js
global이 안 붙을 때 : 패키지를 설치하는 프로젝트 안에서 부품으로 사용됨  
<img width="550" alt="2018-09-09 3 52 43" src="https://user-images.githubusercontent.com/18157844/45262036-4cdd8b80-b449-11e8-9b46-813a6c0f82f8.png">

3. js파일을 만들어서 코드를 입력한다.
<img width="306" alt="2018-09-09 3 58 45" src="https://user-images.githubusercontent.com/18157844/45262041-5ff05b80-b449-11e8-99f6-cb7122156d3e.png">

4. uglifyjs 명령어로 모듈을 실행한다.
	> uglifyjs pretty.js
4행으로 되어있던 코드가 한줄로 변경됨
	> uglifyjs pretty.js -m
name이라는 지역변수가 l로 변경됨
	> uglifyjs pretty.js -o uglified.js -m
uglified.js파일로 minify되어 새로 생성됨  
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
