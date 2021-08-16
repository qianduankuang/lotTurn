<template>
  <slider />
  <div class="title t-bg">
    <top h1="修改权重" :handelClick="topConfirm"></top>
    <wrap bottom="80" top="42" ref="wrap" :scb="scb">
      <power-slider
        v-for="(v, i) in selectData"
        :key="i"
        :selectN="{ v, i }"
        @editpower="editpower"
      >
      </power-slider>
    </wrap>
    <div class="btnSingeContainer">
      <t-button :handelClick="topConfirm" color="green" text="确定"></t-button>
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
import Top from "../../components/turntable/top.vue";
import TButton from "../../components/turntable/button.vue";
import mixins from "../../plugins/turntable/mixins";
import powerSlider from "../../components/turntable/powerSlider.vue";
import nedb from "../../models/turntable-items";
import { sortObj } from "../../utils/optData";

export default {
  name: "Power",
  mixins: [mixins],
  components: {
    Top,
    TButton,
    powerSlider,
  },
  data() {
    return {
      tid: "",
      Btitle: "",
      selectData: {},
    };
  },
  async created() {
    //this.showAlert('太二酸菜鱼')
  },
  mounted() {
    this.tid = this.$route.query.tid;
    //alert(this.tid);
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
            this.selectData = data.select;
            console.log(v, this.selectData);
          }
        });
    else {
    }
  },
  methods: {
    topConfirm() {
      //alert("topConfirm");

      if (!this.tid) {
        this.showAlert("tid不能空");
        return;
      } else {
        nedb
          .update(
            {
              title: this.Btitle,
              select: this.selectData.sort(sortObj("weight")),
            },
            {
              type: "title",

              _id: this.tid,
              mes: "mes",
            }
          )
          .then(() => {
            this.showAlert("修改成功");
          })
          .catch((e) => {
            this.showAlert("修改失败");
          });
      }
    },

    editpower(pv, i) {
      //alert("确定" + pv + i);
      this.selectData[i].weight = pv;
      //console.log(this.selectData, "11112xxxxxx");
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>