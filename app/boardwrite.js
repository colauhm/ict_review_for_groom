import { authCheck, getCookie, getQueryString, ServerUrl } from './utils/function.js';

const boardComponent = {
    title :  document.getElementById('title'),
    content : document.getElementById('content'),
    type : '',
    file: ''
}

const boardCategory = {
    notice : document.getElementById('notice'),
    freeBoard : document.getElementById('freeBoard'),
    QnABoard : document.getElementById('QnABoard'),
    secretQnABoard : document.getElementById('secretQnABoard')
}

const writerRquest = {
    completed : document.getElementById('completed'),
    cance : document.getElementById('cancel')
}

Object.values(writerRquest).forEach(buttonElement => {
    buttonElement.addEventListener('click',postOrCancel);
});

async function postOrCancel(){
    const currentbuttonId = this.id;
    if (currentbuttonId == 'cancel'){
        alert('작성취소 메인페이지로 이동합니다.')
        window.location.href = "/";
    } else if (boardComponent.title && boardComponent.content) {
        getWriteData();
        postWriteData();
        alert('작성완료 메인페이지로 이동합니다.')
        window.location.href = "/";
    } else {
        alert('필요내용을 전부 작성하지 않았습니다.')
    }
}

function getWriteData(){

}
function postWriteData(){
    
}

const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();

boardCategory.notice.disabled = myInfo.type;


await authCheck();