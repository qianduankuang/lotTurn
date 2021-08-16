<template>
  <div class="alert" v-if="isShowAlert">
    <div class="zz"></div>
    <div class="alert-wrap">
      <div class="alert-ins">
        <img v-if="!title" class="bg" src="../../assets/img/lot/bg_popup2.png" alt="">
        <img v-if="title" class="bg" src="../../assets/img/lot/bg_popup3.png" alt="">
        <div class="text-wrap">
          <h2>{{title}}</h2>
          <p class="text">
            {{text1}} <span class="red">{{text2}}</span>{{text3}}
          </p>
          <span @click="clickBnt" class="bnt">{{bntText}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data(){
    return {
      isShowAlert: this.show,
      isTitle: this.title
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text1: {
      type: String,
      default: '',
      required: true
    },
    text2: {
      type: String,
      default: '',
      required: true
    },
    text3: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    bntText: {
      type: String,
      default: '确定',
      required: true
    },
    cb: {
      type: Function,
      required: true
    }
  },
  methods: {
    clickBnt(){
      this.isShowAlert = false
      this.cb && this.cb()
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zz{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0, 0.4);
  z-index: 10;
}
.alert-wrap{
  position: absolute;
  z-index: 12;
  top: 50%;
  margin-top: -90px;
  left: 50%;
  margin-left: -40%;
  width: 80%;
}
.bg{
  width: 100%;
}
.alert-ins{
  position: relative;
}
.text-wrap{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.text{
  padding: 40px 0 30px;
  text-align: center;
  font-size: 16px;
  color: #191919;
  width: 60%;
  margin: 0 auto;
}
.text-1{
  padding-top: 70px;
}
.text .red{
  color: #8A0600;
}
.bnt{
  width: 141px;
  height: 41px;
  line-height: 41px;
  text-align: center;
  background: url('../../assets/img/lot/btn_small_pre.png');
  background-size:100% 100%;
  background-position: center center;
  display: block;
  color: #fff;
  font-size: 14px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  margin-left: -70.5px;
  bottom: 30px;
}
.bnt:active{
  background: url('../../assets/img/lot/btn_small_nor.png');
  background-size:100% 100%;
  background-position: center center;
}
h2{
  background-image: -webkit-linear-gradient(bottom,#B9670C,#FFA800,#FFD35B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-size: 20px;
  padding-top: 10px;
}
</style>
