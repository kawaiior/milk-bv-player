const GET_BUVID_URL = "https://api.bilibili.com/x/frontend/finger/spi";
const UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";
const Referer = "https://www.bilibili.com/";

const getBuvid = async (sessdata: string) => {
    const response = await fetch(GET_BUVID_URL, {
            headers: {
                // SESSDATA 字段
                Cookie: 'SESSDATA='+sessdata,
                'User-Agent': UserAgent,
                Referer: Referer// 对于直接浏览器调用可能不适用
            }
        }
    )
    return await response.json();
}

export {
    getBuvid
}