import {authCheckReverse} from './utils/function.js';

const emailInput = document.getElementById('email');
const idInput = document.getElementById('id');
const passwordInput = document.getElementById('password');
const passwordCheckInput = document.getElementById('passwordCheck');
const nicknameInput = document.getElementById('nickname');

async function handleInputChange() {
    const emailValue = emailInput.value;
    const idValue = idInput.value;
    const passwordValue = passwordInput.value;
    const passwordCheckValue = passwordCheckInput.value;
    const nicknameValue = nicknameInput.value;
}

function signupInfoCheck() {
    
}

// 각 입력 필드에 이벤트 리스너 등록
emailInput.addEventListener('input', handleInputChange);
idInput.addEventListener('input', handleInputChange);
passwordInput.addEventListener('input', handleInputChange);
passwordCheckInput.addEventListener('input', handleInputChange);
nicknameInput.addEventListener('input', handleInputChange);

document.getElementById('signupBtn').addEventListener('click', function () {

    // 값이 모두 채워져 있는지 확인
    if (emailValue && idValue && passwordValue && passwordCheckValue && nicknameValue) {
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


