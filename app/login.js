import {ServerUrl, authCheckReverse} from './utils/function.js';


const loginInputData = {
    id : document.getElementById('id'),
    password : document.getElementById('password')
}

async function loginLequest(){
    const id = loginInputData.id.value;
    const password = loginInputData.password.value;
    const response = await fetch(ServerUrl() + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password })
    });
}

document.getElementById('login').addEventListener('click', loginLequest)

document.getElementById('gotoSignup').addEventListener('click', function (){
    window.location.href = "/signup.html";
}
)

await authCheckReverse();