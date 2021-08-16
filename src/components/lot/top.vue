<template>
  <div class="lot-top">
    <h2>{{title}}</h2>
    <a class="back" href="javascript: history.back()"></a>
    <p class="p-top" v-if="text" v-html="text"> 
      
    </p>
  </div>
</template>

<script>
export default {
  name: 'C_Top',
  props: {
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
</style>
