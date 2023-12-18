import {ServerUrl, authCheckReverse} from './utils/function.js';

const emailInput = document.getElementById('email');
const idInput = document.getElementById('id');
const passwordInput = document.getElementById('pw');
const passwordCheckInput = document.getElementById('pwck');
const nicknameInput = document.getElementById('nickname');

const infoCheck = {
    email : false,
    id : false,
    nickname : false,
    passwordcheck : false
} 
const signupData = {
    email:'',
    id: '',
    password: '',
    nickname: '',
}

function infoCheckdetect() {
    return Object.values(infoCheck).every(value => value === true);
}
async function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

async function handleCheckInputChange(param) {
    console.log("check");
    const inputValues =  {
        email: emailInput.value,
        id: idInput.value,
        nickname: nicknameInput.value
    }
    const inputValue = inputValues[param];
    signupInfoCheck(param, inputValue);
}


async function signupInfoCheck(param, value){
    console.log("start");
    const Param =  await capitalizeFirstLetter(param);
    const helperElement = document.querySelector(`.inputBox p[name="${param}"]`);
    const checkValue = await fetch(ServerUrl() + '/check' + `${Param}` + `?${param}=${value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const valueck = await checkValue.json();
    //email 값이 존재하면 중복유무 체크 아닐경우 텍스트 없앰
    if (value){
        if (valueck&& valueck[0] == 200){
            helperElement.textContent = `사용가능한 ${param}입니다.`
            infoCheck[param] = true;
            signupData[param] = value;
        } else {
            helperElement.textContent = `이미 존재하는 ${param}입니다.`
            infoCheck[param] = false;
        }
    } else{
        infoCheck[param] = false;
    }
}


// 각 입력 필드에 이벤트 리스너 등록
emailInput.addEventListener('input', () => handleCheckInputChange('email'));
idInput.addEventListener('input', () => handleCheckInputChange('id'));
passwordInput.addEventListener('input', handleInputChange);
passwordCheckInput.addEventListener('input', handleInputChange);
nicknameInput.addEventListener('input', () => handleCheckInputChange('nickname'));


async function handleInputChange(){
    const passwordValue = passwordInput.value;
    const passwordCheckValue = passwordCheckInput.value;
    const helperElement = document.querySelector('.inputBox p[name="pwck"]');
    if (passwordCheckValue && passwordValue && passwordCheckValue != passwordValue){
        helperElement.textContent = "일치하지 않습니다.";
        infoCheck.passwordcheck = false;
    } else if (passwordCheckValue && passwordValue && passwordCheckValue == passwordValue){
        infoCheck.passwordcheck = true;
        helperElement.textContent = "";
    } else {
        helperElement.textContent = "";
        infoCheck.passwordcheck = false;
    }
}
document.getElementById('signupBtn').addEventListener('click', function () {
    console.log(infoCheck);
    // 값이 모두 채워져 있는지 확인
    if (emailInput.value && idInput.value && passwordInput.value && passwordCheckInput.value && nicknameInput.value) {
        if (infoCheckdetect){
            alert('회원가입 성공 로그인 페이지로 이동합니다.');
            // 모든 값이 채워져 있다면 /login.html로 이동
            window.location.href = '/login.html';
        } else {
            alert('입력하신 정보를 다시 확인해 주세요.');
        }
        // 여기에 이메일 인증 등의 추가적인 확인 절차를 넣을 수 있습니다.
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


