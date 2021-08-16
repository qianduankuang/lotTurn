<template>
  <div class="sheel-wrap" :style="SWBG">
    <div class="sheel-wrap-in">
      <div class="startWheel" @click="startWheel">
        <!-- <img src="../../assets/img/turntable/btn_start_nor.png" alt="" /> -->
        <div class="bgimg"></div>
      </div>
    </div>

    <div
      class="fg"
      :style="{
        transform: 'rotate(' + degWheel + 'deg)',
      }"
    >
      <div
        :style="{
          transform: 'rotate(' + p.rotate + 'deg)  skewY(' + p.skewY + 'deg)',
          background: p.color,
        }"
        class="ss"
        v-for="p of prizes1"
        :key="p"
        :d="p.name"
      ></div>
    </div>
    <div
      class="fg fgFlex"
      :style="{
        transform: 'rotate(' + degWheel + 'deg)',
      }"
    >
      <div
        class="wheeltt"
        :style="{
          transform: 'rotate(' + p.rotateT + 'deg)  skewY(' + 0 + 'deg)',
        }"
        v-for="p of prizes1"
        :key="p"
        v-text="p.name"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wheel",
  data() {
    return {
      lottery: "",
      showAlert: false,
      turning: false,
      t: 0,
      ttStart: 0,
      ttEnd: 10,
      speed: 0,
      sTime: 200,
      timer: "",
      SWBG: "",
      degWheel: 0,
      /* prizes: [
        {
          name: "龙门龙门烤dsfaf落坧硅酸天地西奈 夏雨来枯干枯去工鱼烤鱼",
          weight: 10,
        },
        {
          name: "韩国拌饭11",
          weight: 20,
        },
        {
          name: "韩国拌饭222",
          weight: 20,
        },
        {
          name: "韩国拌饭333",
          weight: 40,
        },

        {
          name: "海南椰子鸡11",
          weight: 10,
        },

        {
          name: "海南椰子鸡2222",
          weight: 10,
        },
        {
          name: "海南椰子鸡333",
          weight: 90,
        },
      ], */
      prizes1: [],
      prizesName1: [],
    };
  },
  props: {
    prizes: { type: Object, default: {} },
  },
  mounted() {
    //this.initPrizes();
  },
  watch: {
    prizes() {
      this.initPrizes();
    },
  },
  methods: {
    //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 3;
      }
    },
    setT() {
      clearInterval(this.timer);
      //console.log(this.ttStart, this.ttEnd, this.speed, "sTime" + this.sTime);
      if (this.speed == 0) {
        this.ttStart = this.ttStart + 1;
        let tD = 180 - this.ttStart * 15;
        this.sTime = tD < 20 ? 20 : tD;
      } //fast
      else if (this.speed == 1) {
        this.ttStart = this.ttStart + 1;
        this.sTime = 20;
      } else if (this.speed == 2) {
        //slow
        this.ttStart = this.ttStart - 1;

        this.sTime = 760 / this.ttStart;
      }

      switch (this.t) {
        case 0:
          {
            this.degWheel += 19;
          }
          break;
        case 1:
          {
            this.degWheel += 39;
          }
          break;
        case 2:
          {
            this.degWheel += 9;
          }
          break;
      }

      //this.ttStart = this.t;
      if (this.ttStart >= this.ttEnd && this.speed != 2) {
        //console.log(this.t, "sdfds", this.timer, "sTime" + this.sTime);
        if (this.t == 0) {
          //********************时间拉升 */
          this.ttStart = 0;
          this.ttEnd = parseInt(this.randomNum(12, 20) * 13);
          console.log(this.ttEnd);
          this.speed = 1;
          this.t = 1;
        } else if (this.t == 1) {
          this.ttStart = 28;
          this.ttEnd = 0;
          this.speed = 2;
          this.t = 2;
        }
      }
      if (this.t == 2 && this.ttStart == this.ttEnd) {
        clearInterval(this.timer);
        this.t = 0;
        console.log(
          this.t,
          "over",
          this.timer,
          "deg",
          360 - (this.degWheel % 360),
          this.prizes1
        );
        //this.degWheel = 46; //调试试
        this.degWheel % 360 == 0 ? (this.degWheel = 356) : "";

        let wdeg = 360 - (this.degWheel % 360);
        for (let w = 0; w < this.prizes1.length; w++) {
          let wrotate = this.prizes1[w].rotate;
          let wrotate1 = this.prizes1[w == 0 ? 0 : w - 1].rotate;
          let wrotate2 =
            this.prizes1[w == this.prizes1.length - 1 ? w : w + 1].rotate;
          w == this.prizes1.length - 1 ? (wrotate2 = 360) : "";
          if (wdeg < wrotate2 && wdeg >= wrotate) {
            let _lottery = this.prizes1[w];
            this.$emit("lotteryFun", _lottery);
            console.log(this.prizes1[w]);
            break;
          } else if (wdeg < wrotate2 && wdeg >= wrotate) {
            let _lottery = this.prizes1[w];
            this.$emit("lotteryFun", _lottery);
            console.log(this.prizes1[w]);
            break;
          }
        }
        this.turning = false;
        return;
      }
      this.timer = setInterval(this.setT, this.sTime);
    },
    startWheel() {
      if (this.turning) return;
      this.degWheel = 0;
      this.ttStart = 0;
      this.ttEnd = 28;
      this.speed = 0;
      this.turning = true;
      this.timer = setInterval(this.setT, this.sTime);
      //this.setT((this.ttStart = 0), (this.ttEnd = 55), (this.speed = 1));
      //this.timer = this.setT(10, 0, 2);
      //this.setT((this.ttStart = 5), (this.ttEnd = 0), (this.speed = 3));
    },
    initPrizes() {
      console.log(this.prizes, "sd1111");
      let totalWeight = this.prizes.reduce((pre, b) => pre + b.weight, 0);
      //console.log(totalWeight);

      this.prizes.map((p, i) => {
        let ps = p.weight / totalWeight;

        let item = {};
        //0---> 1/4  -90----> 0

        item.skewY = p.weight;

        if (i % 2) {
          item.color = "#B5F0DF";
        } else {
          item.color = "#8FDAC5";
        }
        if (i === this.prizes.length - 1 && item.color === "#8FDAC5") {
          item.color = "#CCF7EB";
        }
        item.name = p.name;
        this.prizes1.push({
          ...item,
        });
      });
      let rotate = 0;
      let deg = 0;
      this.prizes1.map((p, i) => {
        //console.log(p.skewY);
        p.rotate = deg;
        p.rotateT = deg + (360 * (p.skewY / totalWeight)) / 2;
        deg += 360 * (p.skewY / totalWeight);
        p.skewY = 360 * (p.skewY / totalWeight) - 90;
        if (
          (i > 0 && p.rotate - this.prizes1[i - 1].rotate > 180) ||
          (360 - p.rotate > 180 && i == this.prizes1.length - 1)
        ) {
          this.SWBG =
            "background-color:" +
            this.prizes1[i == this.prizes1.length - 1 ? i : i - 1].color;
          //console.log(this.SWBG);
        }
        //console.log(p.skewY, p.rotate, "ffd");
      });
      // console.log(111, this.prizes1);
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* transform: rotate(70deg) skew(0,-20deg); */
.sheel-wrap {
  border-radius: 50%;
  overflow: hidden;
  width: 250px;
  height: 250px;
  position: relative;
  margin: 10px auto;
  border: 15px solid #ccf7eb;
  box-shadow: 0px 6px 0px #93d7c4;
}
.sheel-wrap-in {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px #55a58f inset;
  position: absolute;
  z-index: 20;
  overflow: hidden;
  left: 0;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.ss {
  left: 250px;
  top: -400px;
  box-sizing: border-box;
  border-left: 0px solid red;
  width: 450px;
  height: 650px;
  position: absolute;
  transform-origin: 0% 100%;
}
.fg {
  width: 500px;
  height: 500px;
  position: absolute;
  left: -125px;
  top: -125px;
}
.sheel-wrap .wheeltt {
  position: absolute;
  transform-origin: 50% 100%;
  word-break: break-all;
  /* display: block; 
  left: 240px;*/
  top: 50px;
  /* padding: 0 20px; */
  box-sizing: border-box;
  max-width: 40px;
  height: 200px;
  padding-top: 80px;
  padding-bottom: 40px;
  -ms-writing-mode: tb-rl;
  overflow: hidden;
  writing-mode: vertical-lr;
  text-align: left;
}
.startWheel {
  width: 100px;
  height: 100px;
}
.startWheel .bgimg {
  background-image: url("../../assets/img/turntable/btn_start_nor.png");
  width: 67px;
  height: 90px;
  background-repeat: no-repeat;
  margin: auto;
}
.startWheel .bgimg:active {
  background-image: url("../../assets/img/turntable/btn_start_pre.png");
}
.fgFlex {
  display: flex;
  justify-content: center;
}
</style>
