import { authCheck, ServerUrl, getCookie } from './utils/function.js';


document.getElementById('writePost').addEventListener('click', function (){
    window.location.href = "/boardwrite.html";
})

const boardType = 'notice';

const boardComponent = {
    title :'',
    content : '',
    type : '',
    file: ''
}

const boardCategory = {
    noticeSelector :  document.getElementById('noticeSelector'),
    freeBoardSelector :  document.getElementById('freeBoardSelector'),
    QnABoardSelector :  document.getElementById('QnABoardSelector'),
}

Object.values(boardCategory).forEach(clickElement => {
    clickElement.addEventListener('click',typeChoice);
});

const secretQnABoardSelector = document.querySelector('.secretQnABoardSelector');

secretQnABoardSelector.addEventListener('change', function(){
    if (secretQnABoardSelector.checked) {
        boardComponent.type = secretQnABoardSelector.className;
      } else {
        boardComponent.type = boardCategory.QnABoardSelector.id;
    }
})

function typeChoice(){
    const typebuttonId = this.id;
    boardComponent.type = typebuttonId;
    if (typebuttonId == "QnABoardSelector"){
        secretQnABoardSelector.style.display = 'block';
    } else {
        secretQnABoardSelector.style.display = 'none';
    }
    Object.values(boardCategory).forEach(button => {button.disabled = false;});
    boardCategory[typebuttonId].disabled = true;
}




const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const managerCheck = myInfo.type ? false : true;
boardCategory.noticeSelector.disabled = managerCheck;

//authCheck();