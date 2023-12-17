import { authCheckReverse, ServerUrl, validEmail } from './utils/function.js';

const signupData = {
    email: '',
    id: '',
    passwordCheck: '',
    password: '',
    nickname: ''
};

const getSignupData = () => {
    const { email, id, password, passwordCheck, nickname } = signupData;

    // id, pw, pwck, nickname, profile 값이 모두 존재하는지 확인
    if (!id || !password || !passwordCheck || !nickname || !email) {

        return false;
    }

    sendSignupData();
};

const sendSignupData = async () => {
    const { passwordCheck, ...props } = signupData;
    // signupData를 서버로 전송
    const response = await fetch(ServerUrl() + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(props)
    });

    // 서버로부터 응답을 받음
    const result = await response.json();

    // 응답이 성공적으로 왔을 경우
    if (result[0] == 200) {

        location.href = '/login.html';

    } 
};
const signupClick = () => {
    // signup 버튼 클릭 시
    const signupBtn = document.querySelector('#signupBtn');
    signupBtn.addEventListener('click', getSignupData);
};

const loginhtml = () => {
    const gologin = document.querySelector('#loginhtml');
    gologin.addEventListener('click', window.location.href = "/login.html")
}


const blurEventHandler = async (e, uid) => {
    if (uid == 'email') {
        const value = e.target.value;
        const isValid = validEmail(value);
        const helperElement = document.querySelector(`.inputBox p[name="${uid}"]`);
        let isComplete = false;
        if (!helperElement) return;
        if (value == '' || value == null) {
            helperElement.textContent = '*이메일을 입력해주세요.';
        } else if (!isValid) {
            helperElement.textContent = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        } else {
            const checkEmail = await fetch(ServerUrl() + '/checkEmail' + `?email=${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await checkEmail.json();
            if (res && res[0] == 200) {
                helperElement.textContent = '';
                isComplete = true;
            } else {
                helperElement.textContent = '*중복된 이메일 입니다.';
            }
        }
        if (isComplete) {
            signupData.email = value;
        } else {
            signupData.email = '';
        }
    } else if (uid == 'id'){
        const value = e.target.value;
        const helperElement = document.querySelector(`.inputBox p[name="${uid}"]`);
        let isComplete = false;
        if (!helperElement) return;
        if (value == '' || value == null) {
            helperElement.textContent = '*아이디를 입력해 주세요.';
        }  else {
            const checkEmail = await fetch(ServerUrl() + '/checkId' + `?id=${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await checkId.json();
            if (res && res[0] == 200) {
                helperElement.textContent = '';
                isComplete = true;
            } else {
                helperElement.textContent = '*중복된 아이디 입니다.';
            }
        }
        if (isComplete) {
            signupData.id = value;
        } else {
            signupData.id = '';
        }

    } else if (uid == 'pw') {
        const value = e.target.value;
        const helperElement = document.querySelector(`.inputBox p[name="${uid}"]`);
        const helperElementCheck = document.querySelector(`.inputBox p[name="pwck"]`);
        if (!helperElement) return;

        if (value == '' || value == null) {
            helperElement.textContent = '*비밀번호를 입력해주세요.';
        } else if (signupData.passwordCheck !== value) {
            helperElement.textContent = '*비밀번호가 다릅니다.';
            signupData.password = value;
        } else {
            helperElementCheck.textContent = '';
            helperElement.textContent = '';
            signupData.password = value;
        }
    } else if (uid == 'pwck') {
        const value = e.target.value;
        const helperElement = document.querySelector(`.inputBox p[name="${uid}"]`);
        const helperElementOrigin = document.querySelector(`.inputBox p[name="pw"]`);
        if (value == '' || value == null) {
            helperElement.textContent = '*비밀번호를 입력해주세요.';
        } else if (signupData.password !== value) {
            helperElement.textContent = '*비밀번호가 다릅니다.';
            signupData.passwordCheck = value;
        } else {
            helperElementOrigin.textContent = '';
            helperElement.textContent = '';
            signupData.passwordCheck = value;
        }
    } else if (uid == 'nickname') {
        const value = e.target.value;
        const helperElement = document.querySelector(`.inputBox p[name="${uid}"]`);
        let isComplete = false;
        if (value == '' || value == null) {
            helperElement.textContent = '*닉네임을 입력해주세요.';
        } else if (value.length > 10) {
            helperElement.textContent = '*닉네임은 최대 10자 까지 작성 가능합니다.';
        } else {
            const checkId = await fetch(ServerUrl() + '/checkNickname' + `?nickname=${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await checkId.json();
            if (res && res[0] == 200) {
                helperElement.textContent = '';
                isComplete = true;
            } else {
                helperElement.textContent = '*중복된 닉네임 입니다.';
            }
        }
        if (isComplete) {
            signupData.nickname = value;
        } else {
            signupData.nickname = '';
        }
    }

};

const addEventForInputElements = () => {
    const InputElement = document.querySelectorAll('input');
    InputElement.forEach((element) => {
        const id = element.id;
        if (id === 'profile') element.addEventListener('change', (e) => changeEventHandler(e, id));
        if (id !== 'profile') element.addEventListener('blur', (e) => blurEventHandler(e, id));
    });
};

await authCheckReverse();
addEventForInputElements();
signupClick();