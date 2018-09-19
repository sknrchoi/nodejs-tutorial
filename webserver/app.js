/* main application
 * 가장 최초의 진입점이라고 할 수 있는 것(entry file, entry application)
 * 프로젝트 이름으로 파일을 생성해도 되지만 보통 app.js라고 한다.
 */

var express = require('express');
var app = express();

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

app.listen(3000, function() {
	// 3000 포트로 리슨되면 실행되는 콜백함수
	console.log('Connected 3000 port!');
}); // 웹 어플리케이션이 3000 포트를 리슨함

