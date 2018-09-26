# Jade (Template Engine)
+ 정적인 html페이지에 동적으로 프로그래밍 요소를 결합한 Node js용으로 만들어진 view 템플릿 엔진이다.
+ jade 문법이 따로 존재하며 해당 문법을 사용해서 html과 자바스크립트를 생성해준다.

## 설치하기
~~~
npm install jade --save
~~~

## 사용하기
### Jade와 Express 연결하기
1. 템플릿 엔진과 애플리케이션이 express를 연결한다.
~~~
app.set('view engine', 'jade');
~~~
2. 템플릿이 존재하는 디렉토리를 설정해서 express에게 렌더링할 템플릿의 위치를 알려주어야 한다.  
(생략하면 express가 기본적으로 views라는 폴더를 찾도록 기본값이 설정됨)
~~~
// 템플릿 엔진과 애플리케이션인 express를 연결함
app.set('view engine', 'jade');
// 템플릿이 있는 디렉토리를 설정함
// express는 기본적으로 views라는 폴더를 찾도록 기본값이 지정되어있음
app.set('views', './views');
~~~
3. views명을 가진 디렉토리를 생성한다. 

### 렌더링
1. 렌더링할 페이지를 보여주기 위해서 라우터 경로를 추가한다.
2. views디렉토리에 'temp.jade'파일을 추가한다.
3. res.render()에 인자로 템플릿명을 전달한다.
~~~
app.get('/template', function(req, res) {
	// 기본적으로 사용하던 것
	// res.send()
	// 템플릿 파일을 웹페이지로 렌더링해서 전송
	res.render('temp'); 
}); 
~~~

### 결과 확인하기
: localhost:3000/template로 접근시 temp.jade가 렌더링되어 웹페이지로 보여진다.
<img width="377" alt="2018-09-26 9 40 59" src="https://user-images.githubusercontent.com/18157844/46084236-2b68f780-c1de-11e8-9b7c-7f969c8baae8.png">

## Jade 문법
> jade 문법을 사용해서 html 코드와 자바스크립트 사용이 가능하다.
>> [참고] http://jade-lang.com/

### html 코드 작성
~~~
html
	head
	body
		h1 Hello jade
		ul
			-for(var i=0; i<5; i++)
				li coding
~~~

+ tab : 들여쓰기를 사용해서 부모 태그 안에 있는 자식 태그를 표현할 수 있다.
+ enter : 태그 한개에 대해서 열고 닫고를 의미한다.
+ text출력 : <태그>text</태그>를 표현하고 싶을 때, 한줄로 나열해서 나타낸다.
+ 프로그래밍 코드 사용 : for문과 같은 프로그래밍 코드를 추가할때는 예약어 앞에 -를 붙여준다.

[참고] jade 문법으로 작성했을 때 html 코드 구성이 이쁘게 정렬되어있지 않은 경우 app.js에 설정을 추가한다.
~~~
# vi app.js
app.locals.pretty=true;

# node app.js
~~~

### 변수 사용
: 페이지 렌더링 시 템플릿에 정의한 변수에 필요한 인자를 express에서 전달해서 페이지를 표현할 수 있다.

1. 변수를 사용하기 위해서 title= _title, div= time을 추가한다.
~~~
html
	head
		title= _title
	body
		h1 Hello jade
		ul
			-for(var i=0; i<5; i++)
				li coding
		div= time
~~~

2. app.js에서 렌더링함수의 두번째 인자로 템플릿에 추가한 변수들에 대한 정보를 객체로 전달한다.
~~~
app.get('/template', function(req, res) {
	// 두번째 인자를 jade템플릿에 전달해서 변수로 사용할 수 있음.
	res.render('temp', {time: Date(), _title: 'jade template'});
});
~~~

3. 결과를 확인한다.
<img width="345" alt="2018-09-26 10 19 13" src="https://user-images.githubusercontent.com/18157844/46085054-15f4cd00-c1e0-11e8-88ca-dfbe47c1ef78.png">


