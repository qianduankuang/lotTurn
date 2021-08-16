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
  console.log(_items)

}


console.log(startTurn([
  {
    weight: 10,
    _id: '1'
  },
  {
    weight: 10,
    _id: '2'
  }
]))