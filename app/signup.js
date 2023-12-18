import {ServerUrl, authCheckReverse} from './utils/function.js';

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
    signupInfoCheck(emailValue, idValue, nicknameValue);
}

async function signupInfoCheck(email, id, nickname) {
    //이메일, 아이디, 닉네임 중복확인
    //중복되는 경우 text출력 
    const checkEmail = await fetch(ServerUrl() + '/checkEmail' + `?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const emailck = await checkEmail.json();
    if (emailck && emailck[0] == 200){
        console.log("1good");
    } else {
        console.log("1not good");
    }
    const checkId = await fetch(ServerUrl() + '/checkId' + `?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const idck = await checkId.json();
    if (idck && idck[0] == 200){
        console.log("2good");
    } else {
        console.log("2not good");
    }
    const checkNickname = await fetch(ServerUrl() + '/checkNickname' + `?nickname=${nickname}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const nicknameck = await checkNickname.json();
    if (nicknameck && nicknameck[0] == 200){
        console.log("3good");
    } else {
        console.log("3not good");
    }
}

// 각 입력 필드에 이벤트 리스너 등록
emailInput.addEventListener('input', handleInputChange);
idInput.addEventListener('input', handleInputChange);
passwordInput.addEventListener('input', handleInputChange);
passwordCheckInput.addEventListener('input', handleInputChange);
nicknameInput.addEventListener('input', handleInputChange);

document.getElementById('signupBtn').addEventListener('click', function () {

    // 값이 모두 채워져 있는지 확인
    if (emailInput && idInput && passwordInput && passwordCheckInput && nicknameInput) {
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


