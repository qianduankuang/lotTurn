<template>
  <div>
    <div class="container">
      <div :style="slideEffect" class="ttL" ref="ttL" :tid="tid">
        <div
          class="tt"
          :class="{ marginR: isShow }"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @click="selectTitle"
          @touchend="touchEnd"
        >
          {{ text }}

          <span class="barC" @click.stop="showDelBtn">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </span>
        </div>
      </div>
      <div class="remove ttR" v-show="isShow">
        <p @click="del" ref="del" :tid="tid">
          <img src="../../assets/img/turntable/icon_bin_nor.png" alt="" />
        </p>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import nedb from "../../models/turntable-items";
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
  props: {
    text: { type: String, default: "" },
    tid: { type: String, default: "" },
  },
  methods: {
    showDelBtn() {
      if (!this.isShow) {
        this.slideEffect = "right:60px";
        this.isShow = true;
      } else {
        this.slideEffect = "right:0px";
        this.isShow = false;
      }
    },
    selectTitle() {
      let _tid = this.$refs.ttL.getAttribute("tid");
      //this.$emit("selectTitle", _tid);

      this.$router.push({
        path: "/",

        query: { tid: _tid },
      });
    },
    del() {
      let _tid = this.$refs.del.getAttribute("tid");
      if (_tid != "") {
        //删除
        // nedb
        //   .destory({
        //     title: this.text,
        //     _id: _tid,
        //   })
        //   .then((v) => {
        //
        //     //console.log(v, "sl_after***" + _tid);
        //   });
        this.$emit("delTitle", _tid, this.text);
      } else {
        this.showAlert("tid不能空");
      }
    },
    touchStart(ev) {
      ev = ev || event;
      //ev.preventDefault();
      if (ev.touches.length == 1) {
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = ev.touches[0].clientX; // 记录开始位置
      }
    },
    touchMove(ev) {
      ev = ev || event;
      //ev.preventDefault();

      if (ev.touches.length == 1) {
        //滑动时距离浏览器左侧的距离
        this.moveX = ev.touches[0].clientX;

        //实时的滑动的距离-起始位置=实时移动的位置
        this.disX = this.startX - this.moveX;
        if (this.disX < 0) {
          this.slideEffect = "right:0px";
          this.isShow = false;
        } else if (this.disX > 0) {
          this.slideEffect = "right:60px";
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
.ttR img {
  width: 30px;
}
.ttR p {
  margin-top: 15px;
}
.tt {
  margin: 15px auto;
  margin-bottom: 0;
}
.barC {
  margin: 12px;
  float: right;
  margin-top: 16px;
}
.marginR {
  margin-right: 0px;
}
</style>