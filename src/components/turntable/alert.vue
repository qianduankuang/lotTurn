<template>
  <div class="alert" v-show="isShowAlert">
    <div class="zz"></div>
    <div class="alert-wrap">
      <div class="p-wrap">
        <p>{{ text }}</p>
      </div>
      <div class="bnt-wrap">
        <t-button text="确定" :handelClick="clickBnt" color="green"></t-button>
        <br v-show="isShowCancelAlert" />
        <t-button
          text="取消"
          v-show="isShowCancelAlert"
          :handelClick="clickBnt2"
          color="blue"
        ></t-button>
      </div>
    </div>
  </div>
</template>

<script>
import TButton from "../../components/turntable/button.vue";

export default {
  name: "Alert",
  components: {
    TButton,
  },
  data() {
    return {};
  },
  props: {
    isShowAlert: {
      type: Boolean,
      default: true,
    },
    isShowCancelAlert: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
      required: true,
    },
    handelClick: {
      type: Function,
      default: null,
    },
    handelClick2: {
      type: Function,
      default: null,
    },
  },
  methods: {
    clickBnt() {
      this.handelClick && this.handelClick();
    },
    clickBnt2() {
      this.handelClick2 && this.handelClick2();
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zz {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 910;
}
.alert-wrap {
  position: absolute;
  z-index: 912;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  margin-left: -40%;
  width: 80%;
  background: #ecedf5;
  border-radius: 8px;
}
.p-wrap {
  width: 80%;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #61c3a8;
  padding: 20px 0px;
  overflow: hidden;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
}
.bnt-wrap {
  margin: 0 auto 20px;
  width: 140px;
}
.p-wrap p {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
</style>