import {CHECK_LOGIN_STATUS_URL, GET_LOGIN_QRCODE_URL, LOGIN_INFO_URL} from "./constant.ts";
import {getRequestHeader} from "./util/common.ts";

const getLoginQrcode = async () => {
    const headers = getRequestHeader("");
    const response = await fetch(GET_LOGIN_QRCODE_URL, {
        headers: headers
    });
    return await response.json();
}

const checkLoginStatus = async (qrcode_key: string) => {
    const headers = getRequestHeader("");
    const response = await fetch(CHECK_LOGIN_STATUS_URL+"?qrcode_key="+qrcode_key, {
        headers: headers
    });
    return await response.json();
}

const getLoginInfo = async (cookies: string) => {
    const headers = getRequestHeader(cookies);
    const response = await fetch(LOGIN_INFO_URL, {
        headers: headers
    });
    return await response.json();
}

export {
    getLoginQrcode,
    checkLoginStatus,
    getLoginInfo
}