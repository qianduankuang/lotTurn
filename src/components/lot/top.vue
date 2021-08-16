<template>
  <div class="lot-top">
    <h2>{{title}}</h2>
    <!-- <a 
      v-if="!hideBack" 
      class="back" 
      href="javascript: void(0)" 
      @click="to"></a> -->
    <p class="p-top" v-if="text" v-html="text"></p>
    <div class="op" @click="isShowOp = true">
      <span class="sp-1"></span>
      <span class="sp-2"></span>
      <span class="sp-3"></span>
    </div>
    <div v-show="isShowOp">
      <div
        @click="isShowOp = false" 
        class="zz"></div>
      <ul class="menu">
        <li @click="toApp('setUp')">设置</li>
        <li @click="toApp('moreApp')">更多应用</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'C_Top',
  data(){
    return {
      isShowOp: false
    }
  },
  props: {
    hideBack: {
      type: Boolean,
      default: false,
    },
    isClose: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    to(){
      if(this.isClose) return this.$appCmdApply('close', {})
      history.go(-1)
    },
    toApp(page){
      this.isShowOp = false
      this.$appCmdApply('toAppPage', {
        page
      })
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back{
  position: absolute;
  width: 18px;
  height: 24px;
  background: url('../../assets/img/lot/icon_back_pre.png') no-repeat;
  left: 10px;
  top: 24px;
}
.back:active{
  background: url('../../assets/img/lot/icon_back_nor.png') no-repeat;
}

.op{
  position: absolute;
  width: 80px;
  height: 24px;
  right: 10px;
  top: 24px;
}
.op span{
  content: "";
  background: #91583b;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  float: right;
  margin-left: 5px;
  box-shadow: 1px 1px 1px #333;
}

h2{
  background: url('../../assets/img/lot/bg_title.png') no-repeat;
  width: 157px;
  height: 30px;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  margin: 20px auto;
  color: #FFDE46;
}

.p-top{
  font-size: 16px;
  color: #fff;
  background: rgba(0,0,0,0.2);
  border-radius: 20px;
  margin: 20px;
  padding: 10px;
  line-height: 2em;
}

.zz{
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: rgba(0,0,0,0.2);
}

.menu{
  list-style-type: none;
  position: fixed;
  z-index: 10;
  width: 6em;
  text-align: center;
  line-height: 2.5em;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  right: 10px;
  top: 40px;
}
</style>
