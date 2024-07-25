const XOR_CODE = 23442827791579n;
const MASK_CODE = 2251799813685247n;

const data = ['F', 'c', 'w', 'A', 'P', 'N', 'K', 'T', 'M', 'u', 'g', '3', 'G', 'V', '5', 'L', 'j', '7', 'E', 'J', 'n', 'H', 'p', 'W', 's', 'x', '4', 't', 'b', '8', 'h', 'a', 'Y', 'e', 'v', 'i', 'q', 'B', 'z', '6', 'r', 'k', 'C', 'y', '1', '2', 'm', 'U', 'S', 'D', 'Q', 'X', '9', 'R', 'd', 'o', 'Z', 'f'];

const BASE = 58n;

const bvid2aid = (bvid) => {
    /**
     * BV 号转 AV 号。
     * @param {string} bvid - BV 号。
     * @returns {number} AV 号。
     */
    let bvidArray = bvid.split('');
    [bvidArray[3], bvidArray[9]] = [bvidArray[9], bvidArray[3]];
    [bvidArray[4], bvidArray[7]] = [bvidArray[7], bvidArray[4]];
    bvidArray = bvidArray.slice(3);

    let tmp = 0n;
    for (const char of bvidArray) {
        const idx = BigInt(data.indexOf(char));
        tmp = tmp * BASE + idx;
    }
    return (tmp & MASK_CODE) ^ XOR_CODE;
}

export {
    bvid2aid
}
