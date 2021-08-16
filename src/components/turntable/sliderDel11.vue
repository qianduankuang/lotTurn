<template>
  <div>
    <div class="container" v-for="v in titleData" :key="v">
      <div
        class="ttL"
        @touchstart="touchStart($event)"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <h2 class="tt" :class="{ marginR: isShow }">
          {{ v.name }}
          <span class="barC">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </span>
        </h2>
      </div>
      <div class="remove ttR" ref="remove" v-show="isShow">
        <p v-for="item in handles" :key="item.id">
          <img src="../../assets/img/turntable/icon_bin_nor.png" alt="" />
        </p>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      isShow: false,
      startX: 0, //开始触摸的位置
      moveX: 0, //滑动时的位置
      endX: 0, //结束触摸的位置
      disX: 0, //移动距离
      slideEffect: "", //滑动时的效果,使用v-bind:style="deleteSlider"

      handles: [{ id: 12, title: "dsf" }],
    };
  },
  props: { titleData: { type: Array, default: [] } },
  methods: {
    touchStart(ev) {
      console.log(ev, "dddzz", ev);
      ev = ev || event;

      if (ev.touches.length == 1) {
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = ev.touches[0].clientX; // 记录开始位置
      }
    },
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      console.log(ev);
      if (ev.touches.length == 1) {
        //滑动时距离浏览器左侧的距离
        this.moveX = ev.touches[0].clientX;

        //实时的滑动的距离-起始位置=实时移动的位置
        this.disX = this.startX - this.moveX;
        if (this.disX < 0) {
          ev.target.style.right = "0px";
          this.isShow = false;
        } else if (this.disX > 0) {
          ev.target.style.right = "60px";
          this.isShow = true;
        }
      }
    },
  },
};
</script>
<style scope>
.container {
  position: relative;
}
.ttL {
  width: 100%;
  height: 100%;

  float: left;
  position: relative;
}
.ttR {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tt {
  margin: 15px auto;
}
.barC {
  margin: 12px;
  float: right;
}
.marginR {
  margin-right: 0px;
}
</style>