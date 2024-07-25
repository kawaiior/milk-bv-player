import path from "path";
import fs from "fs";
import {getBuvid} from "./util/buvid.ts";


const cookieDataFilePath = path.join(__dirname, "cookie.json");
let cookieData = {}
let first = true;

// TODO: 数据本地化
const saveLoginCookie = async (cookies: object) => {
    // 拿到buvid
    const response: any = await getBuvid(cookies["SESSDATA"]);

    cookieData = Object.fromEntries(Object.entries(cookies).map(
        ([key, value]) => [key, encodeURIComponent(value)]
    ));

    cookieData["buvid3"] = response.data.b_3;
    cookieData["buvid4"] = response.data.b_4;

    await fs.writeFile(cookieDataFilePath, JSON.stringify(cookieData), 'utf-8', async (err) => {
        return {
            success: false,
            data: err
        }
    });
    return {
        success: true,
        data: cookieData
    }
}

const loadLoginCookie = () => {
    if (fs.existsSync(cookieDataFilePath)) {
        cookieData = JSON.parse(fs.readFileSync(cookieDataFilePath, 'utf-8'));
    } else {
        cookieData = {}
    }
}

// TODO: 实现用户登录
const getSessData = () => {
    if (first) {
        loadLoginCookie();
    }
    return cookieData["SESSDATA"];
}

const getCookies = () => {
    if (first) {
        loadLoginCookie();
    }
    return Object.entries(cookieData).map(([key, value]) => `${key}=${value}`).join(';');
}

const getRawCookies = () => {
    return JSON.parse(JSON.stringify(cookieData));
}

const cleanLoginCookie = () => {
    cookieData = {
        "DedeUserID": "",
        "DedeUserID__ckMd5": "",
        "SESSDATA": "",
        "bili_jct": "",
        "buvid3": "",
        "buvid4": ""
    }
    // 保存data
    fs.writeFileSync(cookieDataFilePath, JSON.stringify(cookieData), 'utf-8');
}

export {
    saveLoginCookie,
    getSessData,
    getCookies,
    getRawCookies,
    cleanLoginCookie
}