<template>
  <div class="alert" v-show="isShowAlert">
    <div class="zz"></div>
    <div class="alert-wrap">
      <div class="p-wrap">
        <p>{{text}}</p>
      </div>
      <div class="bnt-wrap">
        <t-button
          text="确定"
          :handelClick="clickBnt"
          color="green"
        ></t-button>
      </div>
    </div>
  </div>
</template>

<script>
import TButton from '../../components/turntable/button.vue'


export default {
  name: 'Alert',
  components: {
    TButton
  },
  data(){
    return {
      
    }
  },
  props: {
    isShowAlert: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: '',
      required: true
    },
    handelClick: {
      type: Function
    }
  },
  methods: {
    clickBnt(){
      this.handelClick && this.handelClick()
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
  z-index: 910;
}
.alert-wrap{
  position: absolute;
  z-index: 912;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  margin-left: -40%;
  width: 80%;
  background: #ECEDF5;
  border-radius: 8px;
}
.p-wrap{
  width: 80%;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #61C3A8;
  padding: 20px 0px;
  overflow: hidden;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
}
.bnt-wrap{
  margin: 0 auto 20px;
  width: 140px;
}
.p-wrap p{
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
</style>