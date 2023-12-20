import { authCheck, ServerUrl, getCookie } from './utils/function.js';

const requestBoardListType = {
    category : 'notice',
    sortMethod : 'createdAt'
}

const searchBoardListType = {
    category : 'all',
    datailCategory : 'title',
    searchContent : ''
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
    requestBoardListType.category = requestBoardListType.category == 'QnA'? 'secretQnA':'QnA';
    if (requestBoardListType.category == 'secretQnA'){
        sortTypebutton.viewSorter.style.display = 'none';
    } else{
        sortTypebutton.viewSorter.style.display = 'block';
    }
    console.log(requestBoardListType)
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
    console.log(requestBoardListType)
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
    requestBoardListType.sortMethod = this.name
    Object.values(sortTypebutton).forEach(button => {
        button.disabled = false;
    });
    sortTypebutton[sortTypebuttonId].disabled = true;
    console.log(requestBoardListType)
}

//-------------------------------------검색 기준 선택 부분-------------------------------------//
const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const managerCheck = myInfo.type ? false : true;
boardCategory.noticeSelector.disabled = managerCheck;



//authCheck();