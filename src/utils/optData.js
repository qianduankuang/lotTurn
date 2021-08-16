/**
 * @method sortObj
 * @param {string} key 
 * @description 因某一个属性值进行排序
 */
const sortObj = (key) => {
    return function(a, b) {
        var value1 = a[key];
        var value2 = b[key];
        return value1 - value2;
    }
}
export { sortObj }