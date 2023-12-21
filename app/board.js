import { authCheck, ServerUrl, getCookie } from './utils/function.js';

const boardCommponent = {
    nick : document.querySelector('.nick'),
    createdAt : document.querySelector('.viewCount'),
    viewCount : document.querySelector('.recommendCount')
}



async function getBoard(){

}

const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();