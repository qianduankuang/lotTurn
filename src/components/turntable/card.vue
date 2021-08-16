<template>
  <div>
    <div class="cardDiv">
      <div class="cardContainer">
        <h4 class="cardName" v-text="cardName" v-if="cardName != ''"></h4>
        <div
          ref="cardL1Img"
          class="animate__animated cardL1"
          :class="{ animate__fadeInTopRight: cardL1ImgAnimate }"
          v-show="showImgL1"
        >
          <img src="../../assets/img/turntable/pic_card_third.png" alt="" />
        </div>
        <div
          ref="cardL2Img"
          class="animate__animated cardL2"
          :class="{ animate__fadeInTopRight: cardL2ImgAnimate }"
          v-show="showImgL2"
        >
          <img src="../../assets/img/turntable/pic_card_second.png" alt="" />
        </div>
        <div
          class="animate__animated maincards"
          :style="{ width: maincardsMaxWidth + 'px' }"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          v-show="showImgM"
        >
          <img
            v-if="cardName"
            @click.stop="lottery"
            src="../../assets/img/turntable/pic_card_front.png"
            :class="{ animate__fadeInTopRight: cardMainImgAnimate }"
          />
          <img
            ref="mainCardImg"
            @click.stop="lottery"
            :style="{
              animationDuration: 0.8 + 's',
            }"
            class="aaaa"
            :class="{
              animate__zoomOutLeft: animationL,
              animate__zoomOutRight: animationR,
              animate__fadeInTopRight: cardMainImgAnimate,
            }"
            v-show="!cardName"
            src="../../assets/img/turntable/pic_card_back.png"
          />
        </div>
        <div
          class="animate__animated cardR1"
          :style="{ width: maincardsMaxWidth + 'px' }"
          ref="cardR1Img"
          v-show="showImgR1"
        >
          <img
            :class="{ animate__fadeInTopRight: cardR1ImgAnimate }"
            src="../../assets/img/turntable/pic_card_third.png"
            alt=""
          />
        </div>
        <div
          class="animate__animated cardR2"
          :style="{ width: maincardsMaxWidth + 'px' }"
          ref="cardR2Img"
          v-show="showImgR2"
        >
          <img
            :class="{ animate__fadeInTopRight: cardR2ImgAnimate }"
            src="../../assets/img/turntable/pic_card_second.png"
            alt=""
          />
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
      cardL1ImgAnimate: false,
      cardL2ImgAnimate: false,
      cardR1ImgAnimate: false,
      cardR2ImgAnimate: false,
      cardMainImgAnimate: false,
      maincardsMaxWidth: 500,
      showImgL1: true,
      showImgL2: false,
      showImgR1: false,
      showImgR2: false,
      showImgM: false,
    };
  },
  props: {
    cardName: { type: String, default: "" },
    colorfilter: { type: Boolean },
  },
  mounted() {
    this.maincardsMaxWidth = document.body.clientWidth;
    if (!this.colorfilter) {
      this.cardL1ImgAnimate = true;

      this.$refs.cardL1Img.addEventListener("animationend", () => {
        this.showImgR1 = true;
        this.cardR1ImgAnimate = true;
        this.cardL1ImgAnimate = false;
      });
      this.$refs.cardR1Img.addEventListener("animationend", () => {
        this.cardL2ImgAnimate = true;
        this.cardR1ImgAnimate = false;
        this.showImgL2 = true;
      });
      this.$refs.cardL2Img.addEventListener("animationend", () => {
        this.cardL2ImgAnimate = false;
        this.cardR2ImgAnimate = true;
        this.showImgR2 = true;
      });

      this.$refs.cardR2Img.addEventListener("animationend", () => {
        this.cardMainImgAnimate = true;
        this.cardR2ImgAnimate = false;
        this.showImgM = true;
      });
      this.$refs.mainCardImg.addEventListener("animationend", () => {
        let className = this.$refs.mainCardImg.className;
        //console.log(this.$refs.mainCardImg.className, "sad");

        if (className.search("animate__fadeInTopRight") > -1) {
          this.cardMainImgAnimate = false;
          return;
        }
        this.animationL = false;
        //R
        this.animationR = false;
        this.showCard = true;
      });
    } else {
      //this.showImgL1 = true;
      this.showImgL2 = true;
      this.showImgR1 = true;
      this.showImgR2 = true;
      this.showImgM = true;
    }
  },
  methods: {
    lottery(ev) {
      /// alert(99977);
      if (this.cardName == "") this.$emit("lotteryCardFun");
      else this.$emit("lotteryCardFun", "repeart");
      ev.preventDefault();
    },
    touchStart(ev) {
      if (this.cardName != "") return;
      ev = ev || event;
      //ev.preventDefault();

      if (ev.touches.length == 1) {
        this.startX = ev.touches[0].clientX; // 记录开始位置
      }
      console.log("statr");
    },
    touchMove(ev) {
      if (this.cardName != "") return;
      ev = ev || event;
      // ev.preventDefault();

      if (ev.touches.length == 1) {
        this.moveX = ev.touches[0].clientX;
        this.disX = this.moveX - this.startX;

        console.log("move");
      }
    },
    touchEnd() {
      if (this.cardName != "") return;
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

  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  z-index: 9;
}
.cardContainer .maincards img {
  width: 162px;
}
.cardL1 {
  position: absolute;
  left: 0;
}
.cardL1 img,
.cardR1 img {
  height: 140px;
  margin-top: 50px;
}
.cardL2 {
  position: absolute;
  left: 13%;
}
.cardR1 {
  float: left;
  display: inline;

  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
}
.cardR2 {
  float: left;
  display: inline;

  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  padding-right: 13%;
}
.cardL2 img,
.cardR2 img {
  height: 180px;
  margin-top: 30px;
  z-index: 1;
}
.cardL2,
.cardL1,
.cardR1 img,
.cardR2 img {
  animation-duration: 0.6s;
}
.cardR1 img,
.cardR2 img {
  float: right;
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