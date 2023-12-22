import { authCheck, ServerUrl, getCookie, getUrlId } from './utils/function.js';
import { commentItem } from './components/commentItem.js';

const addCommentButton = document.getElementById('addComment');
const comment = document.getElementById('comment');



document.addEventListener('DOMContentLoaded', async () => {
    const boardCommponent = {
        title: document.getElementById('title'),
        content: document.getElementById('content'),
        writerNickname: document.getElementById('writerNickname'),
        createdAt: document.getElementById('createdAt'),
        viewCount: document.getElementById('viewCount'),
        recommendCount: document.getElementById('recommedCount'),
        commentCount: document.getElementById('commentCount')
    };
    const boardId = getUrlId();
    const data = await getBoard(boardId);

    //console.log(data);
    Object.entries(boardCommponent).forEach(([key, element]) => {
        const detail = data[0][key];
        //console.log(data[0][key], key);
        element.innerHTML += detail;
        //console.log([key, element]);
    });
});

addCommentButton.addEventListener('click', async () => {
    await addComment();
    const newCommentList = await getComment(true);
    addNewComment(newCommentList);
});


async function getBoard(id) {
    const components = await fetch(ServerUrl() + '/board' + `?id=${id}`, { noCORS: true });
    const data = await components.json();
    return data;
}

async function addComment(){
    const content = {
        boardId : getUrlId(),
        content : comment.value
    }
    console.log(content);
    const response = await fetch(ServerUrl() + '/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session')
        },
        body: JSON.stringify(content)
    });
    const result = await response.json();
    console.log(result);
}

async function getComment(last){
    const boardId = getUrlId();
    const commentElement = await fetch(ServerUrl() + '/comment' + `?id=${boardId}` +`&&last=${last}`, {noCORS: true});
    const data = await commentElement.json();
    return data; 
}

const setComment = async (commentData) => {
    const commentList = document.querySelector('.commentList');
    if (commentList && commentData) {
        console.log(commentData);
        commentList.innerHTML = '';
        commentList.innerHTML = commentData
            .map((data) => {
                return commentItem(data.createdAt, data.writerNickname, data.content);
            })
            .join('');
    }
};

const addNewComment = (newCommentData) => {
    const commentList = document.querySelector('.commentList');
    const addCommentData = commentItem(newCommentData.createdAt, newCommentData.writerNickname, newCommentData.content);
    commentList.insertAdjacentHTML('afterbegin', addCommentData);
};

const commentList = await getComment(false);
// setComment(commentList);
document.addEventListener('DOMContentLoaded', setComment(commentList));
const myInfo = await authCheck();

