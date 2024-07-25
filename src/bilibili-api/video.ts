import {getWbiQuery} from "./util/wbi.ts";
import {downloadFile, formatVideo} from "../utils/file_util.ts";
import {RCMD_URL, VIDEO_INFO_API, VIDEO_URL_API} from "./constant.ts";
import {getQueryFromParams, getRequestHeader} from "./util/common.ts";

const getVideoInfo = async (bvid, sessdata) => {
    const url = VIDEO_INFO_API + "?bvid=" + bvid;
    const headers = getRequestHeader('SESSDATA='+sessdata);
    const res = await fetch(url, {
        headers: headers
    });
    return await res.json();
}

const getVideoPlayUrl = async (aid: number, bvid: string, cid: number, sessdata: string) => {
    const params = {
        avid: aid,
        cid: cid,
        qn: "127",
        otype: "json",
        fourk: 1,
        fnval: 4048,
        high_quality: "1",
    }

    const query = await getWbiQuery(params, sessdata)
    const url = VIDEO_URL_API + "?" + query;
    const headers = getRequestHeader('SESSDATA='+sessdata);

    const response = await fetch(url, {
            headers: headers
        }
    )

    return await response.json();
}

const downloadVideo = async (aid: number, bvid: string, cid: number, sessdata: string) => {
    const videoResponse: any = await getVideoPlayUrl(aid, bvid, cid, sessdata);
    const videoData = videoResponse.data;
    const videoUrl =  videoData.dash.video[0].baseUrl;
    let audioUrl = ""

    if (!videoData.dash.audio || videoData.dash.audio.length===0){

    }else{
        audioUrl = videoData.dash.audio[0].baseUrl;
    }
    await downloadFile(`${bvid}_video.m4s`, videoUrl, sessdata);
    await downloadFile(`${bvid}_audio.m4s`, audioUrl, sessdata);
    // 整流
    await formatVideo(bvid)
}

/**
 * 获取推荐视频列表
 */
const getRcmdVideoList = async (
    fresh_type: number = 3,
    version: number = 1,
    ps: number = 8,
    fresh_idx: number = 1,
    fresh_idx_1h: number = 1,
    sessdata: string = ""
) => {
    const query = getQueryFromParams({
        fresh_type: fresh_type,
        version: version,
        ps: ps,
        fresh_idx: fresh_idx,
        fresh_idx_1h: fresh_idx_1h
    });

    const url = `${RCMD_URL}?${query}`
    const headers = getRequestHeader('SESSDATA='+sessdata);
    const response = await fetch(url, {
        headers: headers
    });
    return await response.json();
}

const RELATED_URL = "https://api.bilibili.com/x/web-interface/archive/related"

/**
 * 获取单视频推荐列表
 */
const getRelatedVideoList = async (bvid: string, sessdata: string = "") => {
    const headers = getRequestHeader('SESSDATA='+sessdata);
    const response = await fetch(RELATED_URL + "?bvid=" + bvid, {
        headers: headers
    });
    return await response.json()
}

/**
 * 获取视频评论
 */
const getVideoComment = async (
    aid: number,
    sort: number,
    nohot: number,
    ps: number,
    pn: number,
    cookie: string = ""
) => {
    const headers = getRequestHeader(cookie);
    const query = getQueryFromParams({
        type: 1,
        oid: aid,
        nohot: nohot,
        ps: ps,
        pn: pn
    });
    const url = "https://api.bilibili.com/x/v2/reply?"+query;

    const response = await fetch(url, {
        headers: headers
    });

    return await response.json();
}

export {
    getVideoInfo,
    getVideoPlayUrl,
    downloadVideo,
    getRcmdVideoList,
    getRelatedVideoList,
    getVideoComment
}
