import { authCheck, ServerUrl, getCookie } from './utils/function.js';
import { BoardItem } from './components/boardItem.js';
const requestBoardListType = {
    category : 'notice',
    sortMethod : 'boardCreatedAt'
}

const searchBoardListType = {
    category : 'all',
    datailCategory : 'title',
    searchContent : ''
}

const sortTypebutton = {
    recentSorter: document.getElementById('recentSorter'),
    viewSorter: document.getElementById('viewSorter'),
    recommendSorter: document.getElementById('recommendSorter')
};

const boardCategory = {
    noticeSelector :  document.getElementById('noticeSelector'),
    freeBoardSelector :  document.getElementById('freeBoardSelector'),
    QnABoardSelector :  document.getElementById('QnABoardSelector'),
}

const searchTypeButton = {
    all : document.getElementById('allSerchButton'),
    notice : document.getElementById('noticeSearchButton'),
    free : document.getElementById('freeBoardSearchButton'),
    QnA : document.getElementById('QnABoardSearchButton')
}

const searchDetailTypebutton = {
    title : document.getElementById('titleSearchButton'),
    content : document.getElementById('contentSearchButton'),
    writer : document.getElementById('writerSearchButton')
}

const selectBoardButtons = document.querySelector('.selectBoardButtons');
const secretQnABoardSelector = document.querySelector('.secretQnABoardSelector');
const secretTypeButton = document.getElementById('secretTypeButton');
const secretCheckBox = document.getElementById('secretCheckBox');

//--------------------버튼 선택시 다른 버튼은 선택버튼 활성화 나머지버튼 활성화 기능-----------//

function setupButtons(typeButton, listType, methodKey) {
    Object.values(typeButton).forEach(button => {
        button.addEventListener('click', async () => {
            const selectedButtonName = await typeChoice(button, typeButton);
            listType[methodKey] = selectedButtonName;
            const newBoardList = await boardListLoad();
            setBoardItem(newBoardList);
            console.log(requestBoardListType);
            console.log(searchBoardListType);
        });
    });
}

async function typeChoice(clickedButton, allButtons) {
    // 클릭된 버튼을 제외한 나머지 버튼들을 활성화(disabled=false)로 설정
    Object.values(allButtons).forEach(button => {
        button.disabled = (button === clickedButton) ? true : false;
    });
    return clickedButton.name;
}

//-------------------------------게시판 선택 버튼 및 기능-----------------------------------//

document.getElementById('writePost').addEventListener('click', function (){
    window.location.href = "/boardwrite.html";
})

boardCategory.noticeSelector.disabled = true;
secretTypeButton.disabled = true;

setupButtons(boardCategory, requestBoardListType, 'category');

selectBoardButtons.addEventListener('click', async () => {
    QnAcheck(requestBoardListType.category);
    await authCheck();
});

function QnAcheck(boardType){
    if (boardType == 'QnA' || boardType == 'secretQnA'){
        secretQnABoardSelector.style.display = 'block';
        sortTypebutton.recommendSorter.style.display = 'none';
        secretQnAcheck(boardType);
        
    } else {
        secretQnABoardSelector.style.display = 'none';
        sortTypebutton.recommendSorter.style.display = 'block';
        
    }
    
}

function secretQnAcheck(boardType){
    requestBoardListType.category = secretCheckBox.checked ? 'secretQnA':'QnA';
    if (boardType == 'secretQnA'){
        sortTypebutton.viewSorter.style.display = 'none';
    } else {
        sortTypebutton.viewSorter.style.display = 'block';
    }
}

//---------------------------------------정렬 선택 부분----------------------------------------//


sortTypebutton.recentSorter.disabled = true;

setupButtons(sortTypebutton, requestBoardListType, 'sortMethod');

//-------------------------------------검색 기준 선택 부분-------------------------------------//

searchTypeButton.all.disabled = true;

setupButtons(searchTypeButton, searchBoardListType, 'category');

searchDetailTypebutton.title.disabled = true;

setupButtons(searchDetailTypebutton, searchBoardListType, 'datailCategory');

//--------------------------------------보드 요소 불러오기---------------------------------------//

async function boardListLoad(){
    const {category, sortMethod} = requestBoardListType;
    //console.log(requestBoardListType, searchBoardListType);
    const boardList = await fetch(ServerUrl() + '/boards' + `?category=${category}` + `&sortType=${sortMethod}`, {noCORS: true });
    const data = await boardList.json();
    //console.log(data);
    return data;
}
const setBoardItem = async (boardData) => {
    const boardList = document.querySelector('.boardList');
    if (boardList && boardData) {
        boardList.innerHTML = '';
        boardList.innerHTML = boardData
            .map((data) => {
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

document.addEventListener('DOMContentLoaded', setBoardItem(boardList));

await authCheck();