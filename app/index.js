import { authCheck, ServerUrl, getCookie } from './utils/function.js';
import { BoardItem } from './components/boardItem.js';
const requestBoardListType = {
    category : 'free',
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
    authCheck();
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
const searchTypeButton = {
    all : document.getElementById('allSerchButton'),
    notice : document.getElementById('noticeSearchButton'),
    free : document.getElementById('freeBoardSearchButton'),
    QnA : document.getElementById('QnABoardSearchButton')
}
searchTypeButton.all.disabled = true;


Object.values(searchTypeButton).forEach(button => {
    button.addEventListener('click', searchTypeChoice);
});

function searchTypeChoice() {
    const searchTypebuttonname = this.name;
    searchBoardListType.category = searchTypebuttonname
    Object.values(searchTypeButton).forEach(button => {
        button.disabled = false;
    });
    searchTypeButton[searchTypebuttonname].disabled = true;
    console.log(searchBoardListType);
}

const searchDetailTypebutton = {
    title : document.getElementById('titleSearchButton'),
    content : document.getElementById('contentSearchButton'),
    writer : document.getElementById('writerSearchButton')
}
searchDetailTypebutton.title.disabled = true;

Object.values(searchDetailTypebutton).forEach(button => {
    button.addEventListener('click', searchDetailTypeChoice);
});

function searchDetailTypeChoice(){
    const searchDetailTypebuttonName = this.name;
    searchBoardListType.datailCategory = searchDetailTypebuttonName
    Object.values(searchDetailTypebutton).forEach(button => {
        button.disabled = false;
    });
    searchDetailTypebutton[searchDetailTypebuttonName].disabled = true;
    console.log(searchBoardListType);
}
//--------------------------------------보드 요소 불러오기---------------------------------------//


async function boardListLoad(){
    const {category} = requestBoardListType;
    const boardList = await fetch(ServerUrl() + '/boards' + `?category=${category}` /*+ `?sortType=${sortMethod}`*/, {noCORS: true });
    const data = await boardList.json();
    console.log(data)
    return data;
}
const setBoardItem = async (boardData) => {
    const boardList = document.querySelector('.boardList');
    if (boardList && boardData) {
        boardList.innerHTML = boardData
            .map((data) => {
                console.log("1")
                return BoardItem(data.boardId, data.boardCreatedAt, data.boardTitle, data.boardViewCount, data.boardRecommendCount, data.userNickname);
            })
            .join('');
    }
};

//--------------------------------세션 유무에 따라 보이는 버튼 다르게-----------------------------//



const req = await fetch(ServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
const myInfo = await req.json();
const managerCheck = myInfo.type ? false : true;
boardCategory.noticeSelector.disabled = managerCheck;

const boardList = await boardListLoad();
setBoardItem(boardList)


authCheck();