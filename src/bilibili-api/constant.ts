const GET_LOGIN_QRCODE_URL = "https://passport.bilibili.com/x/passport-login/web/qrcode/generate";
const CHECK_LOGIN_STATUS_URL = "https://passport.bilibili.com/x/passport-login/web/qrcode/poll";
const LOGIN_INFO_URL = "https://api.bilibili.com/x/web-interface/nav";
const SEARCH_ALL_URL = "https://api.bilibili.com/x/web-interface/wbi/search/all/v2"
const SEARCH_TYPE_URL = "https://api.bilibili.com/x/web-interface/wbi/search/type"
const USER_INFO_API = "https://api.bilibili.com/x/space/wbi/acc/info"
const USER_CARD_API = "https://api.bilibili.com/x/web-interface/card"
const VIDEO_INFO_API = "https://api.bilibili.com/x/web-interface/view"
const VIDEO_URL_API = "https://api.bilibili.com/x/player/wbi/playurl"
const RCMD_URL = "https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd"
const VIDEO_REPLY_API = "https://api.bilibili.com/x/v2/reply"

const UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";
const Referer = "https://www.bilibili.com/";

export {
    GET_LOGIN_QRCODE_URL,
    CHECK_LOGIN_STATUS_URL,
    LOGIN_INFO_URL,
    SEARCH_ALL_URL,
    SEARCH_TYPE_URL,
    USER_INFO_API,
    USER_CARD_API,
    VIDEO_INFO_API,
    VIDEO_URL_API,
    RCMD_URL,
    VIDEO_REPLY_API,

    UserAgent,
    Referer,
}