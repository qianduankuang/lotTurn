<template>
  <div>
    <div class="power">
      <div class="txtDiv">
        <span class="txtDiv" v-text="selectName"></span>
        <strong class="txtR" v-text="pValue + '%'"> </strong>
      </div>
      <div class="btn" ref="remove">
        <div class="pLDiv">
          <div
            class="removeBG"
            :style="{
              width: pValue + '%',
            }"
          ></div>
          <span
            class="pL"
            v-for="v in 99"
            :style="{ left: v - 1 + '%' }"
            :key="v"
            :class="{
              pL1: v % 10 == 0 ? true : false,
              pL2: v % 10 != 0 ? true : false,
            }"
            >|</span
          >
        </div>

        <span
          ref="btnImg"
          class="btn-move"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          :style="slideEffect"
        >
          <!-- <span class="pValue" v-text="pValue"> </span> -->
        </span>
      </div>
      <div class="numDiv">
        <span
          v-for="v in 11"
          :style="{ left: v == 1 ? '0px' : (v - 1) * 10 - 4 + '%' }"
          :key="v"
          v-text="(v - 1) * 10"
        ></span>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "power",
  data() {
    return {
      isShow: false,
      startX: 0, //开始触摸的位置
      moveX: 0, //滑动时的位置
      endX: 0, //结束触摸的位置
      disX: 0, //移动距离
      slideEffect: "",
      pValue: 0,
      selectName: "",
    };
  },
  props: {
    selectN: { type: Object, default: {} },
  },
  mounted() {
    this.selectName = this.selectN.v.name;
    this.pValue = this.selectN.v.weight;
    this.slideEffect = "left:" + this.pValue + "%";
  },
  methods: {
    touchStart: function (ev) {
      ev = ev || event;
      ev.preventDefault();
      //      console.log(ev.targetTouches);
      //      console.log(ev.changedTouches);
      if (ev.touches.length == 1) {
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = ev.touches[0].clientX; // 记录开始位置
      }
    },
    touchMove: function (ev) {
      ev = ev || event;
      ev.preventDefault();
      let btnWidth = this.$refs.remove.offsetWidth;
      let btnImg = this.$refs.btnImg.offsetWidth;
      var oFL = ev.target.offsetLeft;

      if (ev.touches.length == 1) {
        this.moveX = ev.touches[0].clientX;

        this.disX = this.moveX - this.startX;

        if (this.disX < 0 || this.disX == 0) {
          var d = oFL + this.disX;

          //console.log(this.disX, "ol" + ev.target.offsetLeft, d, "<-");
          this.slideEffect = "left:" + (d > 0 ? d : 0) + "px";
        } else if (this.disX > 0) {
          var d = this.disX + oFL;
          // console.log(this.disX, "ol" + ev.target.offsetLeft, d, "->");

          // 最大也只能等于删除按钮宽度
          if (d >= btnWidth) {
            this.slideEffect = "left:" + btnWidth + "px";
          } else {
            this.slideEffect = "left:" + d + "px";
          }
        }
        this.pValue = parseInt((d / btnWidth) * 100);
        this.startX = this.moveX;
      }
    },
    touchEnd: function (ev) {
      //console.log("end");
      var oFL = ev.target.offsetLeft;
      var d = oFL + this.disX;
      let btnWidth = this.$refs.remove.offsetWidth;
      let btnImg = this.$refs.btnImg.offsetWidth;
      this.pValue = parseInt((oFL / btnWidth) * 100);

      //console.log(this.disX, "ol" + ev.target.offsetLeft, "d" + d);
      this.slideEffect = "left:" + this.pValue + "%";
      console.log(
        "btnWidth" + btnWidth,
        "ol" + ev.target.offsetLeft,
        parseInt((ev.target.offsetLeft / btnWidth) * 100)
      );
      this.$emit("editpower", this.pValue, this.selectN.i);
    },
  },
};
</script>
 
<style scoped>
.tts {
  width: 100%;
  height: 20px;
  background: #333;

  position: relative;
}
.btn {
  width: 90%;

  background: #d5e4e0;
}
.btn,
.pLDiv {
  border-radius: 4px;
  height: 36px;
  position: relative;
}
.pL1 {
  height: 18px;
  opacity: 1;
}
.pL2 {
  height: 9px;
  opacity: 0.7;
}
.btn-move {
  position: absolute;

  box-shadow: 0px 0px 4px 0px #bbbfcb;
  top: -2px;
  width: 10px;
  height: 40px;
  border-radius: 2px;
  background: #f3f4f7;
}
.pValue {
  position: relative;
  top: -20px;
  /* left: -50%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tt {
  font-size: 20px;
  color: #008000;
  text-align: center;
  margin-top: 50px;
}
.pL {
  position: absolute;
  bottom: 0;
  overflow: hidden;

  color: #8a8b90;
}
.power {
  padding-top: 20px;
  height: 90px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: left;
  flex-direction: row;
}
.pLDiv {
  width: 100%;
  overflow: hidden;
}
.removeBG {
  height: 100%;
  background: #61c3a8;
}
.txtDiv {
  margin-bottom: 10px;
  width: 90%;
}
.numDiv {
  width: 90%;
  position: relative;
}
.numDiv span {
  position: absolute;
  font-size: 12px;
  color: #8a8b90;
}
.txtR {
  float: right;
  font-size: 17px;
}
.txtL {
  float: left;
  font-size: 17px;
}
</style> 