import { authCheck, ServerUrl, getCookie, getUrlId } from './utils/function.js';

const boardCommponent = {
    nick : document.querySelector('.nick'),
    createdAt : document.querySelector('.viewCount'),
    viewCount : document.querySelector('.recommendCount')
}



async function getBoard(id){
    const components = await fetch(ServerUrl() + '/board' + `?id=${id}`, {noCORS: true});
    const data = await components.json();
    console.log(data);
}

const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const boardId = getUrlId();
getBoard(boardId);

await authCheck();
