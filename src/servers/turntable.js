import {uuid} from '../utils'
import List from '../models/turntable-lis'
import Items from '../models/turntable-items'


/**
 * @method createTurntable
 * @param {string} title 
 * @param {Array} items 
 * @description 创建转盘
 */
const createTurntable = async (title, items) => {
  let listId = uuid(10)

  //去重
  let iObj = {}
  items.map(i => {
    iObj.i = i
  })
  let _items = []
  for(let i of items){
    _items.push({
      listId,
      des: i,
      weight: 1,
      createAt: new Date().getTime()
    })
  }

  //创建标题
  await List.create({
    title,
    listId,
    createAt: new Date().getTime()
  })
  //创建item
  await Items.create(_items)
}


/**
 * @method findList
 * @description 查找全部
 */
const findList = async () => {
  return await List.findAllAndCount({}, {
    pageNo: 1,
    pageSize: 10000
  })
}


/**
 * @method findTurntable
 * @param {string} listId 
 * @description 根据listId查找转盘
 */
const findTurntable = async (listId) => {
  let list = await List.findOne({
    listId
  })
  if(!list) throw new Error('100')
  let items = await Items.findAllAndCount({
    listId
  })
  return {
    title: list.title,
    items
  }
}

/**
 * @method deleteList
 * @param {string} listId 
 * @description 删除转盘
 */
const deleteList = async (listId) => {
  await Items.destory({
    listId
  })
  await List.destory({
    listId
  })
}

/**
 * @method deleteItem
 * @param {string} id 
 * @description 删除选项
 */
const deleteItem = async (id) => {
  await Items.destory({
    _id: id
  })
}

/**
 * @method changeWeight
 * @param {Array} items 
 * @description 修改权限
 */
const changeWeight = async (items) => {
  for(let i = 0; i < items.length; i++){
    let item = items[i]
    await Items.update({
      weight: item.weight
    }, {
      _id: item._id
    })
  }
}

/**
 * @method startTurn
 * @param {Array} items 
 * @description 开始转盘
 */
const startTurn = (items) => {
  //全部权重
  let totalWeight = 0
  let _items = {}
  let index = 0
  items.map((item, i) => {
    let weight = item.weight
    totalWeight += Number(weight)
    let id = item._id
    for(let i = 0; i < weight; i++){
      _items[index] = id
      index++
    }
  })
  //获取随机数
  let num = Math.floor(Math.random()*totalWeight)
  
  let id = _items[num]
  if(!id) return _items[0]
  return id
}




export {
  createTurntable,
  findTurntable,
  deleteList,
  changeWeight,
  deleteItem,
  findList,
  startTurn
}