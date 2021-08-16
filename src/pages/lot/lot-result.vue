<template>
  <div class="lot-result lot-inside">
    <Top 
      title="解签"></Top>
    <div class="tap">
      <span 
        class="tap-title" 
        @click="tapNum = tap.index"
        v-for="tap of tapList"
        v-bind:class="{'tap-title-c': tapNum === tap.index}"
        key="tap.index">{{tap.text}}</span>
    </div>
    <div id="tap-contai" class="tap-contai" v-if="result">
      <div class="tap-wrap tap-wrap-1" v-if="tapNum === 0">
        <h5 class="h5">观音灵签 <span class="red">{{result.name}}</span></h5>
        <p><label>凶吉：</label>{{result.qianXiang.xiongJi}}</p>
        <p><label>典故：</label>{{result.qianXiang.dianGu}}</p>
        <p><label>签诗：</label> <p v-html="result.qianXiang.qianShi"></p> </p>
        <p><label>诗意：</label> <p>{{result.qianXiang.shiYi}}</p> </p>
      </div>
      <div class="tap-wrap tap-wrap-2" v-if="tapNum === 1">
        <h5><span class="red">{{result.dianGu.title}}</span></h5>
        <p v-html="result.dianGu.detail"></p>
      </div>
      <div class="tap-wrap tap-wrap-2" v-if="tapNum === 2">
        <h5><span class="red">解曰：</span></h5>
        <p v-html="result.yunChen.jieYue"></p>
        <h5><span class="red">仙机：</span></h5>
        <p v-html="result.yunChen.xianJi"></p>
      </div>
    </div> 
    <a @click="toIndex" class="big-bnt" href="javascript: void(0)">退出</a>
  </div>
</template>

<script>
import '../../assets/css/lot.css'
import Top from '../../components/lot/top.vue'
import {getResult} from '../../utils/lot'

export default {
  components: {
    Top
  },
  data(){
    return {
      result: null,
      tapNum: 0,
      tapList: [
        {
          index: 0,
          text: '签像'
        },
        {
          index: 1,
          text: '典故'
        },
        {
          index: 2,
          text: '运程'
        }
      ]
    }
  },
  name: 'Result',
  created(){
    this.$appCmdApply('notShak', {})
    this.result = getResult(this.$route.query.num)
    this.$nextTick(() => {
      let wHeight = Number(document.body.clientHeight)
      
      document.getElementById('tap-contai').style.maxHeight = wHeight - 300 + 'px'
    })
  },
  methods: {
    toIndex(){
      this.$router.push({path:'/'})
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tap-contai{
  text-align: left;
}
h5{
  font-size: 16px;
  color: #191919; 
}
.h5{
  margin-bottom: 10px;
}
h5 .red{
  color: #8A0600;
}
p{
  font-size: 14px;
  padding: 5px 0;
  line-height: 1.5em;
}
label{
  color: #014686;
  font-weight: bold;
}
</style>
