<template>
  <div>
    <div class="cardDiv">
      <div class="cardContainer">
        <h4 class="cardName" v-text="cardName" v-if="cardName != ''"></h4>
        <div class="cardL1">
          <img src="../../assets/img/turntable/pic_card_back.png" alt="" />
        </div>
        <div class="cardL2">
          <img src="../../assets/img/turntable/pic_card_back.png" alt="" />
        </div>
        <div
          class="animate__animated maincards"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
        >
          <img
            v-if="cardName"
            src="../../assets/img/turntable/pic_card_front.png"
          />
          <img
            ref="mainCardImg"
            @click.stop="lottery"
            :style="{
              animationDuration: 0.8 + 's',
            }"
            :class="{
              animate__zoomOutLeft: animationL,
              animate__zoomOutRight: animationR,
            }"
            v-if="!cardName"
            src="../../assets/img/turntable/pic_card_back.png"
          />
        </div>
        <div class="cardR1">
          <img src="../../assets/img/turntable/pic_card_back.png" alt="" />
        </div>
        <div class="cardR2">
          <img src="../../assets/img/turntable/pic_card_back.png" alt="" />
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  data() {
    return {
      animationL: false,
      animationR: false,
      showCard: true,
      cardWidth: 150,
      cardD: [11],
      startX: 0, //开始触摸的位置
      moveX: 0, //滑动时的位置
      endX: 0, //结束触摸的位置
      disX: 0, //移动距离
    };
  },
  props: {
    cardName: { type: String },
  },
  mounted() {
    this.$refs.mainCardImg.addEventListener("animationend", () => {
      this.animationL = false;
      //R
      this.animationR = false;
      this.showCard = true;
    });
  },
  methods: {
    lottery(ev) {
      /// alert(99977);
      this.$emit("lotteryCardFun");
      ev.preventDefault();
    },
    touchStart(ev) {
      ev = ev || event;
      //ev.preventDefault();

      if (ev.touches.length == 1) {
        this.startX = ev.touches[0].clientX; // 记录开始位置
      }
      console.log("statr");
    },
    touchMove(ev) {
      ev = ev || event;
      // ev.preventDefault();

      if (ev.touches.length == 1) {
        this.moveX = ev.touches[0].clientX;
        this.disX = this.moveX - this.startX;

        console.log("move");
      }
    },
    touchEnd() {
      if (this.disX < 0) {
        //L
        this.showCard = false;
        this.animationL = true;
      } else if (this.disX > 0) {
        //R
        this.showCard = false;
        this.animationR = true;
      }
      this.disX = 0;
      console.log("end", this.disX);
    },
  },
};
</script>
<style scoped>
.cardDiv {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 30px;
}
.cardContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 230px;
  overflow: hidden;
}
.cardContainer .maincards {
  float: left;
  display: inline;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 9;
}
.cardContainer .maincards img {
  width: 162px;
}
.cardL1 {
  opacity: 0.4;
  position: absolute;
  left: 0;
}
.cardL1 img,
.cardR1 img {
  height: 140px;
  margin-top: 50px;
}
.cardL2 {
  opacity: 0.6;
  position: absolute;
  left: 15%;
}
.cardR1 {
  opacity: 0.4;
  position: absolute;
  right: 0;
}
.cardR2 {
  opacity: 0.6;
  position: absolute;
  right: 15%;
}
.cardL2 img,
.cardR2 img {
  height: 180px;
  margin-top: 30px;
  z-index: 1;
}
.cardName {
  z-index: 10;
  width: 110px;
  word-break: break-all;
}
.clear {
  clear: both;
}
</style>