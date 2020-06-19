# API Test (NodeJS & MongoDB)



## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Postman](https://www.postman.com/)
* npm install

<h3><b>서버 실행</b></h3>

* nodemon index.js

# Postman을 이용하여 API 테스트하기


## 코디 리스트

<h3><b>코디 보기</b></h3>

* GET: localhost:3000/stylelists

![stylelists](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/stylelists.png)


<h3><b>새로운 코디 등록</b></h3>

* POST: localhost:3000/stylelists/register

![stylelists](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/registerStylelist.png)


<h3><b>tag 된 코디 보기</b></h3>

* GET: localhost:3000/stylelists/:tag

<p><t>Pre-request Script에 태그 값을 입력하여 입력된 태그 리스트만 뽑아 보기</t></p>

![TagStylelist](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/tag.png)

* ex) "훈남" 태그 리스트 보기

![TagStylelistEx](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/tagEx.png)

## 회원가입 및 로그인

<h3><b>회원가입</b></h3>

* POST: localhost:3000/users/register

![UserRegister](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/userRegister.png)


<h3><b>회원 인증토큰 받아 로그인 하기 </b></h3>

* POST: localhost:3000/users/authenticate

![UserAuthenticate](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/userAuthenticate.png)

<h3><b>인증 승인 하는 방법</b></h3>

* Postman auth에 들어가서 Type을 Bearer Token으로 변경 후 위에 받은 token 값을 복사 붙여넣기.
* 인증이 필요한 URL마다 같은 방식으로 인증을 진행.

<h3><b>로그인 회원정보 보기</b></h3>

* GET: localhost:3000/users/profile

![UserProfileUnauth](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/userProfileUnanuthorized.png)

* 토큰을 이용해 인증하기 전 Unauthorized로 표시.

![UserProfile](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/userProfile.png)

* 인증 후 로그인 회원정보 출력.


<h3><b>로그인된 회원의 "좋아요"한 코디 출력하기</b></h3>

* <:id> 값은 회원의 아이디이므로 회원정보 보기를 이용하여 로그인된 회원 아이디 복사하여 입력

ex) <br>
<t>localhost:3000/stylelists/:id/favorites => localhost:3000/stylelists/5ed8e06b96cb2b7ea7e51cf3/favorites</t>

* GET: localhost:3000/stylelists/:id/favorites

![UserFavoriteList](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/userFavoritesList.png)

<h3><b>좋아요 추가하기</b></h3>

* POST: localhost:3000/stylelists/:id/favorites/:favId

![AddFavorite](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/addFavorite.png)

*  코디리스트의 아이디값을 입력하여 사용자의 "좋아요 리스트" 추가

![AddFavorite](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/favListAfterAdded.png)

* id "5ed8e1fe96cb2b7ea7e51cf7"의 코디가 "좋아요 리스트"에 추가   

<h3><b>좋아요 지우기</b></h3>

* DELETE: localhost:3000/stylelists/:id/favorites/:favId

![removeFavorite](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/beforeDeleteFav.png)

* 코디리스트의 아이디값을 입력하여 "좋아요" 제거

![removeFavorite](https://github.com/Jaejun-Project/Stylelist_API_TEST/blob/master/img/deleteFav.png)

* "좋아요" 제거 후 "좋아요" 리스트 id "5ed8e1fe96cb2b7ea7e51cf7" 코디가 제거
