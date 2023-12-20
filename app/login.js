import {ServerUrl, authCheckReverse, setCookie, deleteCookie} from './utils/function.js';




window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        // 페이지가 캐시에서 가져온 경우 또는 뒤로가기로 인한 경우
        // 여기에서 새로고침 또는 적절한 동작을 수행
        deleteCookie('session');
        Object.values(loginInputData).forEach(inputElement => {
            inputElement.value = '';
        });
    }
});
const loginInputData = {
    id : document.getElementById('id'),
    password : document.getElementById('password')
}



async function loginLequest(){
    const id = loginInputData.id.value;
    const password = loginInputData.password.value;
    const helperTextElement = document.querySelector('.helperText')
    const res = await fetch(ServerUrl() + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password })
    });
    const result = await res.json();
    console.log(result[0]);
    if (result[0] !== 200) {
        helperTextElement.textContent = "*로그인 정보가 맞지 않습니다.";
    } else {
        helperTextElement.textContent = '';
        setCookie('session', result[1], 14);
        location.href = '/index.html';
    }
}

document.getElementById('login').addEventListener('click', loginLequest)

document.getElementById('gotoSignup').addEventListener('click', function (){
    window.location.href = "/signup.html";
}
)

await authCheckReverse();
