<template>
  <div class="index t-bg">
    <top h1="实用工具" :showBack="false" :showConfirm="false" :showSet="true">
    </top>

    <h2 class="tt" v-text="Btitle"></h2>
    <wheel
      @lotteryFun="lotteryFun"
      :prizes="titleData"
      v-show="showWheel"
      :class="{ colorfilter: colorfilter }"
    ></wheel>
    <card
      @lotteryCardFun="lotteryCardFun"
      v-if="!showWheel"
      :cardName="lotName"
      :colorfilter="colorfilter"
      :class="{ colorfilter: colorfilter }"
    />
    <div class="middleDiv">
      <span class="mL" @click="showShare">
        <img src="../../assets/img/turntable/icon_share_nor.png" alt="" />
        分享</span
      ><span class="mR" @click="changF">更换方式 >></span>
      <div class="clear"></div>
    </div>
    <div class="btnContainer">
      <t-button
        :handelClick="!colorfilter ? select : ''"
        color="green"
        text="选项"
        :class="{ colorfilter: colorfilter }"
        :LBtnAbled="colorfilter"
      ></t-button>

      <t-button :handelClick="title" color="blue" text="标题"></t-button>
    </div>
    <div class="shareIconDiv" v-show="showShareIcon">
      <div class="textDiv">分享到：</div>
      <div class="iconBDiv">
        <div class="iconCon">
          <img
            @click.stop="shareToApp('Wechat')"
            src="../../assets/img/turntable/icon_wechat_nor.png"
            alt=""
          />
        </div>
        <div class="iconCon">
          <img
            @click.stop="shareToApp('WechatCircle')"
            src="../../assets/img/turntable/icon_circle_nor.png"
            alt=""
          />
        </div>
      </div>
      <div class="iconBDiv">
        <div class="iconDesc">
          <span @click.stop="shareToApp('Wechat')"> 微信</span>
        </div>
        <div class="iconDesc">
          <span @click.stop="shareToApp('WechatCircle')"> 朋友圈</span>
        </div>
      </div>
    </div>
    <div class="zz" v-show="showShareIcon" @click="closeShare"></div>
    <alert
      :isShowAlert="isShowAlert"
      :text="alertText"
      :handelClick="closeAlert"
    ></alert>
  </div>
</template>

<script>
import "../../assets/css/turntable.css";
import { randomNum } from "../../utils/optNum";
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
      colorfilter: false,
      showShareIcon: false,
    };
  },
  components: {
    Wheel,
    TButton,
    Top,
    Card,
  },
  beforeCreate() {
    try {
      this.tid = this.$route.query.tid;
      console.log(this.tid, this.$route);
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
                      .findAllAndCount(
                        {
                          openFirst: "first",
                        },
                        [1, 1, 1]
                      )
                      .then((v) => {
                        console.log(v.count, 99);
                        if (v.count == 0) this.defaultTitle();
                        else {
                          //删除最后一个标题
                          let data = {
                            title: "请点击右下角按钮输入标题",
                            select: [
                              { name: "", weight: 10 },
                              { name: "", weight: 10 },
                              { name: "", weight: 10 },
                              { name: "", weight: 10 },
                              { name: "", weight: 10 },
                              { name: "", weight: 10 },
                              { name: "", weight: 10 },
                              { name: "", weight: 10 },
                            ],
                            mes: "mes",
                          };
                          this.Btitle = data.title;
                          this.tid = "";
                          this.titleData = data.select;
                          this.colorfilter = true;
                        }
                      })
                      .catch((e) => {
                        console.log(e, "e");
                      });
                  }
                });
            }
          });
    } catch {}
  },
  methods: {
    shareToApp(str) {
      //alert(str);
      this.$appCmdApply("notShak", { str });
    },
    showShare() {
      this.showShareIcon = true;
    },
    closeShare() {
      this.showShareIcon = false;
    },
    defaultTitle() {
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
          mes: "mes",
        })
        .then((v) => {
          if (v && v.count != 0) {
            let data = v;
            this.Btitle = data.title;
            this.tid = data._id;
            this.titleData = data.select;
            //console.log(v, this.titleData, "000000鱼");
          }
          nedb.create({ openFirst: "first", bool: false });
        });
    },
    changF() {
      this.showWheel = !this.showWheel;
      this.lotName = "";
    },

    lotteryCardFun(q) {
      if (q == "repeart") {
        this.lotName = "";
        return;
      }
      let d = Math.floor(Math.random() * this.titleData.length);
      let nl = parseInt(d);
      console.log(d, "df");
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
.shareIconDiv {
  width: 90%;
  height: 122px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 16px;

  bottom: 0;
  box-sizing: border-box;
  position: fixed;
  left: 5%;
  z-index: 11;
}
.shareIconDiv .textDiv {
  text-align: left;
  color: #fff;
  font-size: 13px;
}
.shareIconDiv .iconCon,
.iconDesc {
  float: left;
  width: 50%;
}
.iconDesc {
  color: white;
  font-size: 12px;
}
.zz {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: fixed;
  top: 0;
}
</style>
