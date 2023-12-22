import { authCheck, ServerUrl, getCookie, getUrlId } from './utils/function.js';
import { commentItem } from './components/comment.js';

document.addEventListener('DOMContentLoaded', async () => {
    const boardCommponent = {
        title : document.getElementById('title'),
        content : document.getElementById('content'),
        writerNickname: document.getElementById('writerNickname'),
        createdAt: document.getElementById('createdAt'),
        viewCount: document.getElementById('viewCount'),
        recommendCount: document.getElementById('recommedCount'),
        commentCount: document.getElementById('commentCount')
    };
    const boardId = getUrlId();
    const data =  await getBoard(boardId);
    console.log(data);
    Object.entries(boardCommponent).forEach(([key, element]) => {
        const detail = data[0][key];

        //console.log(data[0][key], key);
        element.innerHTML += detail;
        //console.log([key, element]);
        
    });
});

async function getBoard(id){
    const components = await fetch(ServerUrl() + '/board' + `?id=${id}`, {noCORS: true});
    const data = await components.json();
    //console.log(data);
    return data;
}

async function setComment(id){
    const commentElement = await fetch(ServerUrl() + '/comment' +  `?id=${id}`, {noCORS: true});
    const data = await commentElement.json();
    return data 
}

const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();

await authCheck();

