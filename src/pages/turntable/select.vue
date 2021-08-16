<template>
  <div class="title t-bg">
    <top h1="选项" :handelClick="topConfirm"></top>
    <h2 class="tt">
      <input
        v-model="title"
        placeholder="请输入标题"
        maxlength="20"
        type="text"
      />
      <span>{{ title.trim().length }}/20</span>
    </h2>
    <wrap bottom="80" top="120" ref="wrap" :scb="scb">
      <ul class="d-wrap" ref="dWrap">
        <li v-for="(v, i) in selectData" :key="i">
          <p>
            <input
              placeholder="请输入选项"
              v-model="v.name"
              @blur="checkList"
              type="text"
            />
          </p>
          <span
            ref="del"
            :delselect="v.name"
            class="del"
            @click="handelDel(i)"
          ></span>
        </li>
      </ul>
    </wrap>

    <div class="btnContainer">
      <t-button
        :handelClick="editPower"
        color="green"
        text="修改权重"
      ></t-button>
      <t-button color="blue" text="添加选项" :handelClick="addObj"></t-button>
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
      selectData: {},
      tid: "",
      title: "",
      scb: 0,
    };
  },
  async created() {
    //this.showAlert('太二酸菜鱼')
    //alert(23);
    //console.log(this.$route.params, this.$route.query, "00022222200");
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
              this.title = data.title;
              this.tid = data._id;
              this.selectData = data.select;
              //console.log(v, this.titleData, "dzzzzz00000");
            }
          });
      else {
      }
    } catch {}
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
  },
  methods: {
    topConfirm() {
      //alert("topConfirm");

      if (!this.title) {
        this.showAlert("请输入标题");
        return;
      } else {
        if (this.selectData.length < 3) {
          this.showAlert("请添加至少三个选项");
          return;
        }
        //alert(2);
        /*      let obj = [];
                let object = this.selectObj;
                for (const key in object) {
                  if (Object.hasOwnProperty.call(object, key)) {
                    const l = object[key][0];
                    let item = l.name.trim() + "";
                    obj.push({ name: item, weight: 12 });
                  }
                }
                console.log(obj, "213123"); */
        nedb
          .update(
            { title: this.title, select: this.selectData },
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
    addObj() {
      if (this.selectData.length >= 10) {
        return this.showAlert("最多只能创建10个选项");
      }
      this.selectData.push({
        name: "",
        weight: 10,
      });
      this.scb = this.$refs.dWrap.offsetHeight + 60;
    },
    handelDel(index) {
      this.selectData.splice(index, 1);
    },
    checkList() {
      let obj = [];
      var index = -1;
      this.selectData.map((l, k) => {
        console.log(l, "lllllselectData");
        let item = l.name.trim() + "";
        this.selectData.map((ll, kki) => {
          let item2 = ll.name.trim() + "";

          if (item == item2 && k != kki) index = k;
        });
      });
      index >= 0 ? this.selectData.splice(index, 1) : "";
      //console.log("obj--sss->", this.selectData, index);
      //this.selectObj = obj;

      //this.selectData = _list;
    },
    editPower() {
      //alert(this.name)
      this.$router.push({ path: "/power", query: { tid: this.tid } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Hide {
  display: none;
}
.tt {
  overflow: hidden;
  position: relative;
}
.tt input {
  height: 48px;
  border: none;
  background: none;
  font-size: 18px;
  text-indent: 1em;
  outline: none;
  position: absolute;
  left: 0;
  right: 20px;
  top: 0;
  display: block;
  width: 84%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
.tt span {
  position: absolute;
  right: 5px;
  height: 48px;
  line-height: 48px;
  font-size: 12px;
  color: #aaa;
}
</style>
