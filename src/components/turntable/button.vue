<template>
  <div
    class="sheel-button"
    @click="bntClick"
    v-bind:class="{
      green: color === 'green',
      blue: color === 'blue',
      null: color === 'null',
      sheelButtonAbled: LBtnAbled,
    }"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    LBtnAbled: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "green",
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
    bntClick() {
      if (this.color === "null") return;
      this.handelClick && this.handelClick();
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sheel-button {
  color: #fff;
  border-radius: 12px;
  font-size: 18px;
  height: 44px;
  line-height: 44px;
  width: 100%;
}
.green {
  background: #6bc0a9;
  box-shadow: rgb(64, 165, 137) 0px 4px 0px;
}
.blue {
  background: #8a90ee;
  box-shadow: rgb(111, 119, 219) 0px 4px 0px;
}
.null {
  background: #c2c4cd;
  box-shadow: rgb(177, 179, 188) 0px 4px 0px;
}
.sheelButtonAbled:active {
  box-shadow: none;
}

.sheel-button.null {
  box-shadow: rgb(177, 179, 188) 0px 4px 0px;
}
</style>

