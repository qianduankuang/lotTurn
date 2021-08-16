/**
 * @method randomNum
 * @param {number} minNum 
 * @param {number} maxNum 
 * @description 生成从minNum到maxNum的随机数
 */
const randomNum = (minNum, maxNum) => {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 3;
    }
}
export { randomNum }