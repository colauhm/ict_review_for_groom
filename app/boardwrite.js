import { authCheck, getCookie, getQueryString, ServerUrl } from './utils/function.js';

const boardComponent = {
    title : document.getElementById('title'),
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



