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
  async created() {
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
    delTitle(tid) {
      //alert(tid);
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
