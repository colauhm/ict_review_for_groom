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
    noticeSelector :  document.getElementById('noticeSelector'),
    freeBoardSelector :  document.getElementById('freeBoardSelector'),
    QnABoardSelector :  document.getElementById('QnABoardSelector'),
}

Object.values(boardCategory).forEach(clickElement => {
    clickElement.addEventListener('click',typeChoice);
});

const secretQnABoardSelector = document.querySelector('.secretQnABoardSelector');

secretQnABoardSelector.addEventListener('click', function(){
    boardComponent.type =  boardComponent.type == 'QnABoardSelector'? 'secretQnABoardSelector':'QnABoardSelector';
    console.log(boardComponent.type);
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
    boardCategory.noticeSelector.disabled = managerCheck;

}

const writerRquest = {
    completed : document.getElementById('completed'),
    cancel : document.getElementById('cancel')
}

Object.values(writerRquest).forEach(buttonElement => {
    buttonElement.addEventListener('click',postOrCancel);
});


async function postOrCancel(){
    getWriteData();
    const currentbuttonId = this.id;
    if (currentbuttonId == 'cancel'){
        alert('작성취소 메인페이지로 이동합니다.')
        window.location.href = "/";
    } else if (boardComponent.title && boardComponent.content) {
        
        postWriteData();
        alert('작성완료 메인페이지로 이동합니다.');
        window.location.href = "/";
    } else {
        alert('필요내용을 전부 작성하지 않았습니다.');
    }
}
function getWriteData() {
    boardComponent.title = boardInputdata.title.value;
    boardComponent.content = boardInputdata.content.value;
}

const fileInput = document.getElementById('fileInput');
const fileUploadButton = document.getElementById('fileUpload');

fileUploadButton.addEventListener('click', function() {
    // 파일이 선택되었는지 확인
    if (fileInput.files.length > 0) {
        // FormData 객체 생성
        const formData = new FormData();

        // 파일 추가
        formData.append('file', fileInput.files[0]);

        // 서버로 파일 업로드 요청
        uploadFile(formData);
    } else {
        alert('파일을 선택해주세요.');
    }
});
async function uploadFile(formData) {
    try {
        const response = await fetch(ServerUrl() + '/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log(result);

        // 업로드 성공 시 추가 작업 수행
        alert('파일이 업로드되었습니다.');
    } catch (error) {
        console.error('파일 업로드 오류:', error);
        alert('파일 업로드에 실패했습니다.');
    }
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
const managerCheck = myInfo.type ? false : true;
boardCategory.noticeSelector.disabled = managerCheck;


