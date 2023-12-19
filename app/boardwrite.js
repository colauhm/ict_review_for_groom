import { authCheck, getCookie, getQueryString, ServerUrl } from './utils/function.js';

const boardInputdata = {
    title :  document.getElementById('title'),
    content : document.getElementById('content')
}

const boardComponent = {
    title :'',
    content : '',
    type : '',
    file: ''
}

const boardCategory = {
    notice : document.getElementById('notice'),
    freeBoard : document.getElementById('freeBoard'),
    QnABoard : document.getElementById('QnABoard'),
    secretQnABoard : document.getElementById('secretQnABoard')
}

Object.values(boardCategory).forEach(clickElement => {
    clickElement.addEventListener('click',typeChoice);
});

const writerRquest = {
    completed : document.getElementById('completed'),
    cance : document.getElementById('cancel')
}

Object.values(writerRquest).forEach(buttonElement => {
    buttonElement.addEventListener('click',postOrCancel);
});

function typeChoice(){
    const typebuttonId = this.id;
    if (typebuttonId != QnABoard){
        boardCategory.secretQnABoard.style.display = 'none';
    } else{
        boardCategory.secretQnABoard.style.display = 'block';
    }
    Object.values(boardCategory).forEach(button => {button.disabled = false;});
    boardCategory[typebuttonId].disabled = true;
    boardComponent.type = typebuttonId;
}

async function postOrCancel(){
    getWriteData();
    const currentbuttonId = this.id;
    if (currentbuttonId == 'cancel'){
        alert('작성취소 메인페이지로 이동합니다.')
        window.location.href = "/";
    } else if (boardComponent.title && boardComponent.content) {
        
        postWriteData();
        alert('작성완료 메인페이지로 이동합니다.')
        window.location.href = "/";
    } else {
        alert('필요내용을 전부 작성하지 않았습니다.')
    }
}
function getWriteData() {
    boardComponent.title = boardInputdata.title.value;
    boardComponent.content = boardInputdata.content.value;
}


async function postWriteData(){
    const {...props} = boardComponent;
    // signupData를 서버로 전송
    const response = await fetch(ServerUrl() + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(props)
    });

    // 서버로부터 응답을 받음
    const result = await response.json();
    console.log(result);

}

const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();

boardCategory.notice.disabled = myInfo.type;

