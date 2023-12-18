import {authCheckReverse} from './utils/function.js';

const email = document.getElementById('email').value;
const id = document.getElementById('id').value;
const password = document.getElementById('password').value;
const passwordCheck = document.getElementById('passwordCheck').value;
const nickname = document.getElementById('nickname').value;

document.getElementById('signupBtn').addEventListener('click', function () {
    // Form에서 각 필드의 값을 가져오기


    // 값이 모두 채워져 있는지 확인
    if (email && id && password && passwordCheck && nickname) {
        // 여기에 이메일 인증 등의 추가적인 확인 절차를 넣을 수 있습니다.
        alert('회원가입 성공.');
        // 모든 값이 채워져 있다면 /login.html로 이동
        window.location.href = '/login.html';
    } else {
        // 모든 값이 채워져 있지 않다면 사용자에게 알림 등을 보여줄 수 있습니다.
        alert('모든 칸을 채워주세요.');
    }
});
document.getElementById('gotoLogin').addEventListener('click', function (){
    window.location.href = "/login.html";
}
)


await authCheckReverse();


