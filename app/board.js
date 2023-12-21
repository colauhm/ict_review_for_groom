import { authCheck, ServerUrl, getCookie, getUrlId } from './utils/function.js';

const boardCommponent = {
    writerNickname : document.getElementById('writerNickname'),
    createdAt : document.getElementById('createdAt'),
    viewCount : document.getElementById('viewCount'),
    recommendCount : document.getElementById('recommedCount'),
    commentCount : document.getElementById('commentCount')
}

Object.values(boardCommponent).forEach(element => {
    element.addEventListener('DOMContentLoaded',loadCommponent(element));
});

async function loadCommponent(data){
    const commponentId = this.id;
    //const boardCommponent = document.querySelector(`.${commponentClass}`);
    boardCommponent[commponentId].innerHTML += data[commponentId];
}

async function getBoard(id){
    const components = await fetch(ServerUrl() + '/board' + `?id=${id}`, {noCORS: true});
    const data = await components.json();
    console.log(data);
}

const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const boardId = getUrlId();
const element = getBoard(boardId);
console.log(element);
await authCheck();

