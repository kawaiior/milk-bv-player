import {getWbiQuery} from "./util/wbi.ts";
import {SEARCH_ALL_URL, SEARCH_TYPE_URL} from "./constant.ts";
import {getRequestHeader} from "./util/common.ts";

const searchType = async (
    search_type: "video" | "live_room" | "article" | "bili_user",
    keyword: string,
    order: string = "totalrank",
    order_sort: number = 0,
    user_type: number = 0,
    duration: number = 0,
    tids: number = 0,
    category_id: number = 0,
    page: number = 0,
    sessdata: string
) => {
    const params = {
        search_type: search_type,
        keyword: keyword,
        order: order,
        order_sort: order_sort,
        user_type: user_type,
        duration: duration,
        tids: tids,
        category_id: category_id,
        page: page
    }

    const query = await getWbiQuery(params, sessdata)
    const url = SEARCH_TYPE_URL + "?" + query;
    const headers = getRequestHeader('SESSDATA='+sessdata);

    const response = await fetch(url, {
            headers: headers
        }
    )

    return await response.json();
}

const searchAll = async (keyword: string, sessdata: string) => {
    const params = {
        keyword: keyword
    }

    const query = await getWbiQuery(params, sessdata)
    const url = SEARCH_ALL_URL + "?" + query;
    const headers = getRequestHeader('SESSDATA='+sessdata);

    const response = await fetch(url, {
            headers: headers
        }
    )

    return await response.json();
}


export {
    searchType,
    searchAll
}