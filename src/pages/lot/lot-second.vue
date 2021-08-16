<template>
  <div class="lot-second lot-inside">
    <Top 
      title="掷杯筊"
      text="摇完签，需要掷杯筊，<br /> 出现圣杯该签才是灵签。"></Top>
    <div 
      class="bg-wrap-s"
      v-bind:class="{ 'bg-wrap-s-1': bgWrap1, 'bg-wrap-s-2': bgWrap2 , 'bg-wrap-s-3': bgWrap3, 'bg-start': startState }">
      <img class="lot-pot" src="../../assets/img/lot/dt.png" alt="">
    </div>
    <a @click="startShak" class="big-bnt" href="javascript: void(0)">上下摇动手机掷杯筊</a>
  </div>
</template>

<script>
import '../../assets/css/lot.css'
import Top from '../../components/lot/top.vue'
import {shakeResult} from '../../utils/lot'

export default {
  components: {
    Top
  },
  data(){
    return {
      bgWrap1: false,
      bgWrap2: false,
      bgWrap3: false,
      startState: false,
      num: this.$route.query.num
    }
  },
  name: 'Second',
  created(){
  },
  methods: {
    startShak(){
      this.bgWrap1 = false
      this.bgWrap2 = false
      this.bgWrap3 = false
      this.startState = true
      let tm = setTimeout(() => {
        clearTimeout(tm)
        this.startState = false
        this.getCup()
      }, 2500)
    },
    getCup(){
      let num = Math.floor(Math.random()*3)
      if(num == 0){
        this.bgWrap1 = true
        let dd = setTimeout(() => {
          this.$alert({
            text1: '你掷到了',
            text2: '“笑杯”',
            text3: '此签不灵，请重新抽签',
            cb: () => {
              this.$router.push({path:'/lot-first'})
            }
          })
          clearTimeout(dd)
        }, 1000)
      }
      if(num == 1){
        this.bgWrap2 = true
        let dd = setTimeout(() => {
          this.$alert({
            text1: '你掷到了',
            text2: '“无杯”',
            text3: '此签不灵，请重新抽签',
            cb: () => {
              this.$router.push({path:'/lot-first'})
            }
          })
          clearTimeout(dd)
        }, 1000)
      }
      if(num == 2){
        this.bgWrap3 = true
        let dd = setTimeout(() => {
          this.$alert({
            text1: '你掷到了',
            text2: '“圣杯”',
            text3: '此签为灵签',
            title: '恭喜你！',
            bntText: '解签',
            cb: () => {
              this.$router.push({path:'/lot-result', query: {num: this.num}})
            }
          })
          clearTimeout(dd)
        }, 1000)
      }
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
