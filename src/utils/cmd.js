import {isAndroid} from './index'

/**
 * @method 
 * @param {string} cmd -- 命令
 * @param {object} param -- 参数
 * @param {string} cbn -- 回调方法名
 * @description 调用app
 */
const appCmdApply = (cmd='close', param={}, cbn) => {
  console.log('------cmd------', cmd);
  let data = {
    cmd,
    param,
    cbn
  }
  let type = isAndroid();
  try{
    if (type == 1){
      // 安卓
      helper.bridgeCmd(JSON.stringify(data))
    }else if(type == 2){
      // IOS
      window.webkit.messageHandlers.bridgeCmd.postMessage(data)
    }else {
      console.log('cmd->', cmd)
    }
  }catch(e){
    console.log('调试阶段不用管', e)
    if(e && cmd == 'goBack') {
      window.history.go(-1);
    } 
  }
}

export {
  appCmdApply
}