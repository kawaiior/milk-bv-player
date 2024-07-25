const formatNumber = (n:number) => {
    if (n < 10000) {
        return n.toString();
    } else if (n < 100000000) {
        return (n / 10000).toFixed(1) + '万';
    } else {
        return (n / 100000000).toFixed(2) + '亿';
    }
}

export {
    formatNumber
}