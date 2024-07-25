import {Referer, UserAgent} from "../constant.ts";

const getQueryFromParams = (params: object) => {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

const getRequestHeader = (cookie: string) => {
    return {
        // SESSDATA 字段
        Cookie: cookie,
        'User-Agent': UserAgent,
        Referer: Referer
    }
}

export {
    getQueryFromParams,
    getRequestHeader
}
