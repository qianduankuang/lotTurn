<template>
  <div class="index t-bg">
    <top h1="实用工具" :showBack="false" :showConfirm="false" :showSet="true">
    </top>

    <h2 class="tt" v-text="Btitle"></h2>
    <wheel
      @lotteryFun="lotteryFun"
      :prizes="titleData"
      v-show="showWheel"
    ></wheel>
    <card
      @lotteryCardFun="lotteryCardFun"
      v-show="!showWheel"
      :cardName="lotName"
    />
    <div class="middleDiv">
      <span class="mL">
        <img src="../../assets/img/turntable/icon_share_nor.png" alt="" />
        分享</span
      ><span class="mR" @click="changF">更换方式 >></span>
      <div class="clear"></div>
    </div>
    <div class="btnContainer">
      <t-button :handelClick="select" color="green" text="选项"></t-button>

      <t-button :handelClick="title" color="blue" text="标题"></t-button>
    </div>
    <alert
      :isShowAlert="isShowAlert"
      :text="alertText"
      :handelClick="closeAlert"
    ></alert>
  </div>
</template>

<script>
import "../../assets/css/turntable.css";
import turntableList from "../../models/turntable-lis";
import Wheel from "../../components/turntable/wheel.vue";
import TButton from "../../components/turntable/button.vue";
import mixins from "../../plugins/turntable/mixins";
import Top from "../../components/turntable/top.vue";
import Card from "../../components/turntable/card.vue";
import nedb from "../../models/turntable-items";

export default {
  name: "Index",
  mixins: [mixins],
  data() {
    return {
      titleData: {},
      Btitle: "",
      tid: "",
      showWheel: true,
      lotName: "",
    };
  },
  components: {
    Wheel,
    TButton,
    Top,
    Card,
  },
  async beforeCreate() {
    try {
      this.tid = this.$route.query.tid;
      console.log(this.tid);
      if (this.tid)
        nedb
          .findAllAndCount(
            {
              type: "title",
              _id: this.tid,
            },
            [1, 1, 1]
          )
          .then((v) => {
            if (v && v.count != 0) {
              let data = v.rows[0];
              this.Btitle = data.title;
              this.tid = data._id;
              this.titleData = data.select;
              //console.log(v, this.titleData);
            }
          });
      else
        nedb
          .findAllAndCount(
            {
              type: "title",
              use: true,
            },
            [1, 1, 1]
          )
          .then((v) => {
            if (v && v.count == 0) {
              nedb
                .findAllAndCount(
                  {
                    type: "title",
                  },
                  [1, 1, 1]
                )
                .then((v) => {
                  if (v && v.count != 0) {
                    let data = v.rows[0];
                    this.Btitle = data.title;
                    this.tid = data._id;
                    this.titleData = data.select;
                    //console.log(v, this.titleData);
                  } else {
                    nedb
                      .create({
                        type: "title",
                        title: "今晚吃点啥？",
                        select: [
                          { name: "海南椰子鸡", weight: 10 },
                          { name: "韩国拌饭加鸡翅包饭", weight: 10 },
                          { name: "太二酸菜鱼", weight: 10 },
                          { name: "龙门烤鱼", weight: 10 },
                          { name: "东南亚菜", weight: 10 },
                          { name: "广式茶点", weight: 10 },
                        ],
                      })
                      .then((v) => {
                        if (v && v.count != 0) {
                          let data = v;
                          this.Btitle = data.title;
                          this.tid = data._id;
                          this.titleData = data.select;
                          //console.log(v, this.titleData, "000000鱼");
                        }
                      });
                  }
                });
            }
          });
    } catch {}
  },
  methods: {
    changF() {
      this.showWheel = !this.showWheel;
    },
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
    lotteryCardFun(q) {
      let nl = parseInt(this.randomNum(10, this.titleData.length * 10) / 10);
      console.log(nl);
      this.lotName = this.titleData[nl].name;
      ///this.showAlert(this.lotName);
    },
    lotteryFun(q) {
      this.showAlert(q.name);
    },
    select() {
      this.$router.push({
        path: "/select",
        query: { tid: this.tid },
        params: { userId: this.tid },
      });
    },
    title() {
      this.$router.push({ path: "/title", query: { tid: this.tid } });
    },
    showResult() {
      // this.showAlert('太二酸菜鱼')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.middleDiv {
  position: absolute;
  width: 90%;
  bottom: 110px;
  color: #379e82;
  left: 5%;
}
.clear {
  clear: both;
}
.mL {
  font-size: 14px;
  float: left;
  line-height: 25px;
  width: 54px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid #3ea186;
}
.mR {
  float: right;
}
</style>
