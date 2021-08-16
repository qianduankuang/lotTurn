
//简单封装nedb同步方法
const asyncFn = (fn, arg, that) => {
  return new Promise(function(resolve, reject){
    try {
      fn.call(that, arg, function(err, docs){
        if(err) return reject(err)
        resolve(docs)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const dbHelp = (db) => {
  let dbMethod = {}
  /**
   * @method create
   * @param {object} arg
   * @description 增加
   */
  dbMethod.create = async (arg) => {
    let result = await asyncFn(db.insert, arg, db)
    return result
  }
  /**
   * @method destory
   * @param {object} arg 
   * @description 删除
   */
  dbMethod.destory = (arg) => {
    return new Promise(function(resolve, reject){
      try {
        db.remove(arg, {multi: true}, function(err, ret){
          if(err) return reject(err)
          resolve(ret)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * @method update
   * @param {object} opt 
   * @param {object} where 
   * @description 修改
   */
  dbMethod.update = (opt, where) => {
    return new Promise(function(resolve, reject){
      try {
        db.update(where, {$set: opt}, function(err, ret){
          if(err) return reject(err)
          resolve(ret)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * @method findOne
   * @param {*} where 
   * @description 查找一个
   */
  dbMethod.findOne = async (where) => {
    let result = await asyncFn(db.findOne, where, db)
    return result
  }
  
  /**
   * @method findAllAndCount
   * @param {object} where 
   * @param {object} opt 
   * @description 查找多个
   */
  dbMethod.findAllAndCount = async (where, opt) => {
    let count = await asyncFn(db.count, where, db)
    return new Promise(function(resolve, reject){
      let {sort, pageNo, pageSize} = opt
      sort = sort || {}
      pageNo = pageNo || 1
      pageSize = pageSize|| 20
      let skip = (pageNo - 1) * pageSize
      try {
        db.find(where).sort(sort).skip(skip).limit(pageSize).exec(function(err, ret){
          if(err) return reject(err)
          resolve({
            count,
            rows: ret
          })
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  return dbMethod
}

export default dbHelp
