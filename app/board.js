import { authCheck, ServerUrl, getCookie, getUrlId } from './utils/function.js';


document.addEventListener('DOMContentLoaded', () => {
    const boardCommponent = {
        writerNickname: document.getElementById('writerNickname'),
        createdAt: document.getElementById('createdAt'),
        viewCount: document.getElementById('viewCount'),
        recommendCount: document.getElementById('recommedCount'),
        commentCount: document.getElementById('commentCount')
    };

    // 각 요소에 addHello 함수 호출
    Object.entries(boardCommponent).forEach(([key, element]) => {
        // id를 요소에 추가
        element.id = `my${key}`;

        // addHello 함수 호출
        addHello(element, key);
    });
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
    return data;
}

const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const boardId = getUrlId();
const element = await getBoard(boardId);
console.log(element);
await authCheck();

