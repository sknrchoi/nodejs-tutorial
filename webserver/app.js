/* main application
 * 가장 최초의 진입점이라고 할 수 있는 것(entry file, entry application)
 * 프로젝트 이름으로 파일을 생성해도 되지만 보통 app.js라고 한다.
 */

var express = require('express');
var app = express();

app.locals.pretty=true;
// 템플릿 엔진과 애플리케이션인 express를 연결함
app.set('view engine', 'jade');
// 템플릿이 있는 디렉토리를 설정함
// express는 기본적으로 views라는 폴더를 찾도록 기본값이 지정되어있음
app.set('views', './views');

// public 이라는 폴더를 정적인 것으로 지정하겠다.
app.use(express.static('public'));

app.get('/template', function(req, res) {
	// 기본적으로 사용하던 것
	// res.send()
	// 템플릿 파일을 웹페이지로 렌더링해서 전송
	// 두번째 인자를 jade템플릿에 전달해서 변수로 사용할 수 있음.
	res.render('temp', {time: Date(), _title: 'jade template'});
});

// 사용자가 접속하는 방식 (get, post)
app.get('/', function(req, res) {
	// 사용자가 home ('/')으로 접속했을 때, 두번째 인자가 실행됨

	// 응답함
	res.send('Hello home');
});

// login 경로로 들어왔을 때 실행됨
app.get('/login', function(req, res) {
	res.send('<h1>Login please</h1>');
});

app.get('/code', function(req, res) {
	res.send('Hello world. <img src="/code.png">');
});

// 동적인 페이지
// ` 는 그레이브라고 불리우며 자바스크립트 안에서 html코드를 추가할 때 묶을 수 있는 표기법이다.
// 그레이브로 묶은 html문자열 사이에 변수를 넣으려면 ${변수명}으로 사용한다.
// 아래의 코드가 추가되면 node app.js로 다시 재실행 후 확인할 수 있다.(이미 기동중에 코드가 수정된다면 재기동 전까지 반영되지 않음) 
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

app.listen(3000, function() {
	// 3000 포트로 리슨되면 실행되는 콜백함수
	console.log('Connected 3000 port!');
}); // 웹 어플리케이션이 3000 포트를 리슨함

