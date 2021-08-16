<template>
  <div class="t-bg">
    <top h1="标题" :showConfirm="false"> </top>
    <div class="sliderDelDiv">
      <slider-del
        v-for="v in titleData"
        :key="v"
        :text="v.title"
        :tid="v._id"
        @delTitle="delTitle"
      />
    </div>
    <div class="btnSingeContainer">
      <t-button :handelClick="ctitle" color="green" text="创建标题"></t-button>
    </div>
    <alert
      :isShowAlert="isShowAlert"
      :text="alertText"
      :handelClick="comfirmAlert"
      :handelClick2="closeAlert"
      :isShowCancelAlert="true"
    ></alert>
  </div>
</template>

<script>
import "../../assets/css/turntable.css";
import Top from "../../components/turntable/top.vue";
import TButton from "../../components/turntable/button.vue";
import nedb from "../../models/turntable-items";
import mixins from "../../plugins/turntable/mixins";
import sliderDel from "../../components/turntable/sliderDel.vue";

export default {
  name: "Title",
  mixins: [mixins],
  components: {
    Top,
    TButton,
    sliderDel,
  },
  data() {
    return {
      titleData: [],
      titleCount: 0,
      ///[{type:"title",title:"dd1212121"},{type:"title",title:"aaaaaaa"},{type:"title",title:"eee"}]
    };
  },
  created() {
    //this.showAlert('太二酸菜鱼')
    console.log(window.innerHeight);
    nedb
      .findAllAndCount(
        {
          type: "title",
        },
        [1, 1, 10]
      )
      .then((v) => {
        if (v && v.count != 0) {
          this.titleData = v.rows;
          //console.log(v);
        }
      });
  },
  methods: {
    comfirmAlert() {
      let _tid = this.deltid;
      nedb
        .destory({
          _id: _tid,
        })
        .then((v) => {
          //console.log(v, "sl_after***" + _tid);

          nedb
            .findAllAndCount(
              {
                type: "title",
              },
              [1, 1, 10]
            )
            .then((v) => {
              if (v && v.count != 0) {
                this.titleData = v.rows;
                // console.log(v, "after");
              } else {
                this.titleData = {};
                //console.log(v, "after000");
              }
              this.isShowAlert = false;
            });
        });
    },
    delTitle(tid, title) {
      //alert(tid);
      this.deltid = tid;
      this.deltitle = title;
      this.isShowAlert = true;
      this.alertText = "确定要删除吗？";
    },
    ctitle() {
      if (this.titleCount >= 10) {
        this.showAlert("最多只能创建10个标题");
        return;
      }
      this.$router.push({ path: "/create-title" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sliderDelDiv {
  position: absolute;
  overflow-y: auto;
  top: 42px;
  left: 0;
  bottom: 80px;
  right: 0;
}
</style>
