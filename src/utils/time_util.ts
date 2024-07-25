const formatTimestamp = (pubdate: number) => {
    const timestamp = pubdate * 1000; // 转换为毫秒
    const now = Date.now();
    const diff = now - timestamp;

    const oneHour = 3600 * 1000;
    const twoDays = 48 * oneHour;

    if (diff < twoDays) {
        // 如果小于一小时，显示分钟
        if (diff < oneHour) {
            const minutesAgo = Math.floor(diff / (60 * 1000));
            return `${minutesAgo}分钟前`;
        }
        const hoursAgo = Math.floor(diff / oneHour);
        return `${hoursAgo}小时前`;
    } else {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1; // 月份从0开始，所以需要加1
        const day = date.getDate();
        return `${month}-${day}`;
    }
}

// 获取精确时间
const getAccurateTime = (pubdate: number) => {
    const date = new Date(pubdate * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const formatSecondTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// TODO: 待优化
const formatVideoDuration = (videoDuration: string) => {
    const durationList = videoDuration.split(":");
    const firstNum = parseInt(durationList[0]);
    if (firstNum >= 60){
        const hours = Math.floor(firstNum / 60);
        const minutes = firstNum % 60;
        let second;
        if (durationList[1].length===1){
            second = "0"+durationList[1];
        }else{
            second = durationList[1];
        }
        if (minutes < 10){
            return `${hours}:0${minutes}:${second}`;
        }else{
            return `${hours}:${minutes}:${second}`;
        }
    }
    // 如果秒数只有一位，则在前面补0
    for (let i = 0; i < durationList.length; i++) {
        const duration = durationList[i]
        if (duration.length===1){
            durationList[i] = "0" + duration;
        }
    }
    return durationList.join(":");
}

export {
    formatTimestamp,
    getAccurateTime,
    formatSecondTime,
    formatVideoDuration
}