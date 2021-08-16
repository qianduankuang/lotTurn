<template>
  <div class="sheel-top">
    <h1>{{ h1 }}</h1>
    <a class="back" v-if="showBack" href="javascript: history.back()">
      <div class="back"></div
    ></a>
    <div class="comfirm" @click="clickBnt" v-if="showConfirm">确定</div>
    <div class="set" v-if="showSet">
      <img src="../../assets/img/turntable/icon_set_nor.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  props: {
    showConfirm: { type: Boolean, default: true },
    showSet: { type: Boolean, default: false },
    h1: {
      type: String,
      default: "",
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    handelClick: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    clickBnt() {
      this.handelClick && this.handelClick();
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sheel-top {
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  background: #fff;
  position: relative;
}

.sheel-top h1 {
  font-size: 18px;
}

.back {
  width: 42px;
  height: 42px;
  position: absolute;
  background: url("../../assets/img/turntable/icon_back_pre.png") no-repeat;
  background-size: auto 44%;
  background-position: center center;
  position: absolute;
  top: 0;
  left: 0;
}
.comfirm {
  position: absolute;
  right: 5px;
  top: 0;
  line-height: 42px;
  text-align: center;
  height: 42px;
  width: 42px;
  color: #22ad87;
}
.set {
  position: absolute;
  right: 5px;
  top: 6px;
  height: 42px;
  width: 42px;
}
</style>

