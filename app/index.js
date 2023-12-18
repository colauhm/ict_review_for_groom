import { authCheck, ServerUrl, getCookie } from './utils/function.js';


document.getElementById('writePost').addEventListener('click', function (){
    window.location.href = "/boardwrite.html";
})

authCheck();