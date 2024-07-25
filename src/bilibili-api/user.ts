import {getWbiQuery} from "./util/wbi.ts";
import {USER_CARD_API, USER_INFO_API} from "./constant.ts";
import {getRequestHeader} from "./util/common.ts";

const getUserCard = async (mid: number, photo: boolean = false, sessdata: string = "") => {
    const url = USER_CARD_API + "?mid=" + mid + "&photo=" + photo;
    const headers = getRequestHeader('SESSDATA='+sessdata);

    const res = await fetch(url, {
        headers: headers
    });
    return await res.json();
}

const getUserInfo = async (mid: number, sessdata: string = "") => {
    const params = {
        mid: mid
    }
    const query = await getWbiQuery(params, sessdata)
    const url = USER_INFO_API + "?" + query;
    const headers = getRequestHeader('SESSDATA='+sessdata);

    const res = await fetch(url, {
        headers: headers
    });
    return await res.json();
}

export {
    getUserCard,
    getUserInfo
}
