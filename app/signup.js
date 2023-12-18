import {ServerUrl, authCheckReverse} from './utils/function.js';

const signupInputData = {
    email : document.getElementById('email'),
    id : document.getElementById('id'),
    pw :document.getElementById('pw'),
    pwck :document.getElementById('pwck'),
    nickname : document.getElementById('nickname')
}
Object.values(signupInputData).forEach(inputElement => {
    inputElement.addEventListener('input',elementId);
});

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

function elementId () {
    const currentInputId = this.id;
    const inputValue = signupInputData[currentInputId].value;
    
    if (currentInputId == 'pwck'){
        handleInputChange(inputValue);
    } else if (currentInputId != 'pw') {
        signupInfoCheck(currentInputId, inputValue);
    }
    
}

async function handleInputChange(pwck){
    const passwordValue = signupInputData['pw'].value;
    const helperElement = document.querySelector('.inputBox p[name="pwck"]');
    if (passwordValue){
        if (passwordValue == pwck){
            infoCheck.passwordcheck = true;
            helperElement.textContent = "";
        } else {
            helperElement.textContent = "일치하지 않습니다.";
            infoCheck.passwordcheck = false;
        }
    } else {
        helperElement.textContent = "";
        infoCheck.passwordcheck = false;
    }
}
async function signupInfoCheck(param, value){
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
        helperElement.textContent = '';
        infoCheck[param] = false;
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


