import { createVNode, render } from "vue"
import Alert from "../../components/lot/alert.vue"

const $alert = function(options) {
  options.show = true
  // 创建div
  const container = document.createElement("div")
  container.className = `__default__container__alert__`
  //创建虚拟节点
  const vm = createVNode(Alert, options)
  //渲染虚拟节点
  render(vm, container)
  document.body.appendChild(container)
};

export default {
  //组件注册
  install(app) {
    app.config.globalProperties.$alert = $alert;
  }
}