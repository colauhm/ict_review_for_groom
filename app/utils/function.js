export const setCookie = (cookie_name, value, days) => {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = escape(value) + (days == null ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
};

export const getCookie = (cookie_name) => {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
};

export const deleteCookie = (cookie_name) => {
    setCookie(cookie_name, '', -1);
};

export const serverSessionCheck = async () => {
    const res = await fetch(getServerUrl() + '/checkSession', { headers: { session: getCookie('session') } });
    const data = await res.json();
    return data;
};

export const authCheck = async () => {
    const session = getCookie('session');
    if (session === undefined) {
        location.href = '/login.html';
    }

    const data = await serverSessionCheck();
    // console.log(data);
    if (!data) {
        deleteCookie('session');
        location.href = '/login.html';
    }
    return data;
};

export const authCheckReverse = async () => {
    const session = getCookie('session');
    if (session) {
        const data = await serverSessionCheck();
        if (data) {
            location.href = '/';
        }
    }
};
// 이메일 유효성 검사
export const validEmail = (email) => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
};

export const prependChild = (parent, child) => {
    parent.insertBefore(child, parent.firstChild);
};

export const ServerUrl = () => {
    return 'http://localhost:8088/api';
};

/**
 *
 * @param {string} param
 * @returns
 */
export const getQueryString = (param) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
};