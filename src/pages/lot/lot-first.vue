<template>
  <div class="lot-first lot-inside">
    <Top 
      title="抽签"
      text="请摒除杂念，在心中默念所要测算之事， 所念之事越具体越准确"></Top>
    <div 
      class="bg-wrap"
      v-bind:class="{ 'bg-wrap-1': bgWrap1, 'bg-wrap-2': bgWrap2, 'bg-wrap-rotate': rotate1, 'bg-wrap-rotate-1': rotate2 }">
      <img class="lot-pot" src="../../assets/img/lot/pic_pot_bg.png" alt="">
    </div>
    <img v-show="showTemp" class="pic-temp" src="../../assets/img/lot/pic_temple.png" alt="">
    <a @click="startShak" class="big-bnt" href="javascript: void(0)">上下摇动手机抽签</a>
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
      showTemp: false,
      tm: null,
      bgWrap1: false,
      bgWrap2: false,
      rotate1: false
    }
  },
  name: 'First',
  created(){
  },
  methods: {
    toggleBg(){
      this.rotate1 = true
      let index = 1
      this.tm = setInterval(() => {
        this.rotate2 = !this.rotate2
        if(index == 1){
          this.bgWrap1 = true
          this.bgWrap2 = false
        }
        if(index == 2){
          this.bgWrap1 = false
          this.bgWrap2 = true
        }
        if(index == 3){
          this.bgWrap1 = false
          this.bgWrap2 = false
        }
        index += 1
        if(index > 3) index = 1
      }, 500)
    },
    stopToggleBg(){
      try {
        clearInterval(this.tm)
      } catch (error) {}
      this.bgWrap1 = false
      this.bgWrap2 = false
      this.rotate1 = false
      this.rotate2 = false
      this.showTemp = true
    },
    startShak(){
      this.showTemp = false
      this.toggleBg()
      setTimeout(() => {
        console.log(shakeResult)
        let result = shakeResult()
        let dd = setTimeout(() => {
          this.$alert({
            text1: '你抽到了',
            text2: result.text,
            cb: () => {
              this.$router.push({path:'/lot-second', query: {num: result.num}})
            }
          })
          clearTimeout(dd)
        }, 1000)
        this.stopToggleBg()
      }, 5000)
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
