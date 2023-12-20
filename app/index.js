import { authCheck, ServerUrl, getCookie } from './utils/function.js';

const requestBoardListType = {
    category : 'notice',
    sortMethod : 'createdAt'
}

//-------------------------------게시판 선택 버튼 및 기능-----------------------------------//


document.getElementById('writePost').addEventListener('click', function (){
    window.location.href = "/boardwrite.html";
})


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
    requestBoardListType.category =   requestBoardListType.category == 'QnA'? 'secretQnA':'QnA';
    console.log(requestBoardListType.category);
})

function BoardTypeChoice(){
    //authCheck();
    const boardTypebuttonId = this.id;
    requestBoardListType.category = this.name;
    if (boardTypebuttonId == "QnABoardSelector"){
        secretQnABoardSelector.style.display = 'block';
        sortTypebutton.recommendSorter.style.display = 'none';
    } else {
        secretQnABoardSelector.style.display = 'none';
        sortTypebutton.recommendSorter.style.display = 'block';
    }
    Object.values(boardCategory).forEach(button => {button.disabled = false;});
    boardCategory[boardTypebuttonId].disabled = true;
    console.log(requestBoardListType.category);
}

//---------------------------------------정렬 선택 부분----------------------------------------//
const sortTypebutton = {
    recentSorter: document.getElementById('recentSorter'),
    viewSorter: document.getElementById('viewSorter'),
    recommendSorter: document.getElementById('recommendSorter')
};

sortTypebutton.recentSorter.disabled = true;

Object.values(sortTypebutton).forEach(button => {
    button.addEventListener('click', sortTypeChoice);
});

function sortTypeChoice() {
    const sortTypebuttonId = this.id;
    Object.values(sortTypebutton).forEach(button => {
        button.disabled = false;
    });
    sortTypebutton[sortTypebuttonId].disabled = true;
}




//-------------------------------------검색 기준 선택 부분-------------------------------------//
const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const managerCheck = myInfo.type ? false : true;
boardCategory.noticeSelector.disabled = managerCheck;
console.log(boardComponentType);


//authCheck();