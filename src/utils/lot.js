import list from './lot-list'

/**
 * @method shakeResult
 * @description 摇签
 */
const shakeResult = () => {
  let leng = list.length
  //获取随机数
  let num = Math.floor(Math.random()*leng)
  let item = list[num]
  if(!item) return {
    num: 0,
    text: '第一签'
  }
  return {
    num,
    text: item.name
  }
}

/**
 * @method getResult
 * @param {number} num 
 * @des
 */
const getResult = (num) => {
  return list[num]
}

export {
  getResult,
  shakeResult
}