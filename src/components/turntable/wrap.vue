<template>
  <div
    :style="{ top: top + 'px', bottom: bottom + 'px' }"
    class="main-wrap"
    ref="wrap"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Wrap",
  props: {
    top: {
      type: Number,
    },
    bottom: {
      type: Number,
    },
    scb: {
      type: Number,
      default: 0,
    },
  },
  updated: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
      // console.log(0);
      let ele = this.$refs.wrap;
      ele.scrollTop = this.scb;
    });
  },
  watch: {},
  methods: {},
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* transform: rotate(70deg) skew(0,-20deg); */
.main-wrap {
  position: absolute;
  right: 0;
  left: 0;
  overflow-y: scroll;
}
</style>
