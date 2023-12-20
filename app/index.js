import { authCheck, ServerUrl, getCookie } from './utils/function.js';


document.getElementById('writePost').addEventListener('click', function (){
    window.location.href = "/boardwrite.html";
})

const boardComponent = {
    type : 'noticeSelector',
}

const boardCategory = {
    noticeSelector :  document.getElementById('noticeSelector'),
    freeBoardSelector :  document.getElementById('freeBoardSelector'),
    QnABoardSelector :  document.getElementById('QnABoardSelector'),
}
boardCategory.noticeSelector.disabled = true;

Object.values(boardCategory).forEach(clickElement => {
    clickElement.addEventListener('click',typeChoice);
});

const secretQnABoardSelector = document.querySelector('.secretQnABoardSelector');
secretQnABoardSelector.style.display = 'none';


secretQnABoardSelector.addEventListener('change', function(){
    if (secretQnABoardSelector.check) {
        boardComponent.type = secretQnABoardSelector.className;
        console.log("check");
      } else {
        boardComponent.type = boardCategory.QnABoardSelector.id;
        console.log(boardComponent.type);
    }
})

function typeChoice(){
    //authCheck();
    const typebuttonId = this.id;
    boardComponent.type = typebuttonId;
    if (typebuttonId == "QnABoardSelector"){
        secretQnABoardSelector.style.display = 'block';
    } else {
        secretQnABoardSelector.style.display = 'none';
    }
    Object.values(boardCategory).forEach(button => {button.disabled = false;});
    boardCategory[typebuttonId].disabled = true;
    console.log(boardComponent.type);
}




const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const managerCheck = myInfo.type ? false : true;
boardCategory.noticeSelector.disabled = managerCheck;
console.log(boardComponent.type);
//authCheck();