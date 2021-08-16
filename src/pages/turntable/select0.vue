<template>
  <div class="title t-bg">
    <top h1="选项" :handelClick="topConfirm"></top>
    <h2 class="tt" v-text="Btitle"></h2>
    <wrap bottom="80" top="120">
      <ul class="d-wrap">
        <li v-for="(v, i) in titleData" :key="i">
          <p>{{ v.name }}</p>
          <span
            class="del"
            ref="del"
            :deltitle="v.name"
            @click="delOpt($event)"
          ></span>
        </li>
        <!--       <li>
          <p>1212酸菜鱼</p>
          <span class="del"></span>
        </li> -->
        <li :class="{ Hide: isIns }">
          <p><input placeholder="请输入选项" type="text" /></p>
          <span class="del"></span>
        </li>
      </ul>
    </wrap>

    <div class="btnContainer">
      <t-button
        :handelClick="editPower"
        color="green"
        text="修改权重"
      ></t-button>
      <t-button color="blue" text="添加选项" @click="isIns = false"></t-button>
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
import nedb from "../../models/turntable-items";

export default {
  name: "Select",
  mixins: [mixins],
  components: {
    Top,
    TButton,
  },
  data() {
    return {
      name: "test",
      isIns: true,
      titleData: {},
      tid: "",
      Btitle: "",
    };
  },
  async created() {
    //this.showAlert('太二酸菜鱼')
    //alert(23);
    console.log(this.$route.params, this.$route.query, "00022222200");
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
              console.log(v, this.titleData, "dzzzzz00000");
            }
          });
      else {
      }
    } catch {
      nedb
        .findAllAndCount(
          {
            type: "title",
            _id: tid,
          },
          [1, 1, 1]
        )
        .then((v) => {
          if (v && v.count != 0) {
            this.titleData = v.rows[0];
            //console.log(v);
          }
        });
    }
    nedb.update(
      {
        num: ["ssssszzzzz", 1],
      },
      {
        mes: "111111sss",
      }
    );
    var dd = nedb.findAllAndCount(
      {
        name: "select",
      },
      [1, 1, 20]
    );
    dd.then((v) => {
      let s = v.rows;
      console.log(s, "ddddddddddd");
    });

    /* nedb.create({
      name: "select",
      title: "2323",
      mes: "131333",
    });
    nedb.create({
      name: "select",
      title: "2323",
      mes: "131333",
    });
    nedb.create({
      name: "select",
      title: "asds",
      mes: "dfs",
    });
    nedb.create({
      name: "select1",
      title: "asds111",
      mes: "dfs111",
    });
    dd = nedb.findOne({
      name: "select",
    });
    console.log(dd);
    dd = nedb.findAllAndCount(
      {
        name: "select",
      },
      [1, 1, 20]
    );
    console.log(dd);
    nedb.destory({
        name: "select"
      })*/
  },
  methods: {
    topConfirm() {
      alert("topCo33333333333nfirm");
    },
    delOpt(e) {
      console.log(e.target.getAttribute("deltitle"));
    },
    editPower() {
      //alert(this.name)
      this.$router.push({ path: "/power" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Hide {
  display: none;
}
.ti-bnt-wrap {
  position: absolute;
  bottom: 0;
  overflow: hidden;
  width: 86%;
  padding-bottom: 20px;
  left: 7%;
}
.ti-bnt-wrap .fl {
  width: 45%;
}
.ti-bnt-wrap .fr {
  width: 45%;
}
</style>
