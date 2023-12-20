import { authCheck, ServerUrl, getCookie } from './utils/function.js';

const requestBoardListType = {
    category : 'notice',
    sortMethod : 'createdAt'
}

//-------------------------------게시판 선택 버튼 및 기능-----------------------------------//


document.getElementById('writePost').addEventListener('click', function (){
    window.location.href = "/boardwrite.html";
})

var boardComponentType = 'noticeSelector';

const boardCategory = {
    noticeSelector :  document.getElementById('noticeSelector'),
    freeBoardSelector :  document.getElementById('freeBoardSelector'),
    QnABoardSelector :  document.getElementById('QnABoardSelector'),
}
boardCategory.noticeSelector.disabled = true;

Object.values(boardCategory).forEach(clickElement => {
    clickElement.addEventListener('click',BoardTypeChoice);
});

const secretQnABoardSelector = document.querySelector('.secretQnABoardSelector');

secretQnABoardSelector.addEventListener('change', function(){
    boardComponentType =  boardComponentType == 'QnABoardSelector'? 'secretQnABoardSelector':'QnABoardSelector';
    console.log(boardComponentType);
})

function BoardTypeChoice(){
    //authCheck();
    const boardTypebuttonId = this.id;
    boardComponentType = boardTypebuttonId;
    if (boardTypebuttonId == "QnABoardSelector"){
        secretQnABoardSelector.style.display = 'block';
    } else {
        secretQnABoardSelector.style.display = 'none';
    }
    Object.values(boardTypebuttonId).forEach(button => {button.disabled = false;});
    boardCategory[boardTypebuttonId].disabled = true;
    console.log(boardComponentType);
}

//---------------------------------------정렬 선택 부분----------------------------------------//
const sortTypebutton = {
    recentSortButton : document.getElementById('recentSortButton'),
    viewSortButton : document.getElementById('viewSortButton'),
    recommendSortButton : document.getElementById('recommendSortButton')
}
sortTypebutton.recentSortButton.disabled = true;

Object.values(sortTypebutton).forEach(clickElement => {
    clickElement.addEventListener('click',sortTypeChoice);
});

function sortTypeChoice(){
    const sortTypebuttonId = this.id;
    Object.values(sortTypebuttonId).forEach(button => {button.disabled = false;});
    sortTypebutton[sortTypebuttonId].disabled = true;
}



//-------------------------------------검색 기준 선택 부분-------------------------------------//
const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const managerCheck = myInfo.type ? false : true;
boardCategory.noticeSelector.disabled = managerCheck;
console.log(boardComponentType);


//authCheck();