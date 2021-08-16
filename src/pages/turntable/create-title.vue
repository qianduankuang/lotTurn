<template>
  <div class="title t-bg">
    <top h1="创建新标题" :handelClick="topConfirm"></top>
    <h2 class="tt">
      <input
        v-model="title"
        placeholder="请输入标题"
        maxlength="20"
        type="text"
      />
      <span>{{ title.trim().length }}/20</span>
    </h2>
    <wrap ref="wrap" bottom="80" top="120">
      <ul class="d-wrap">
        <li v-for="(l, i) of list" :key="i">
          <p>
            <input
              placeholder="请输入选项"
              v-model="l.name"
              @blur="checkList"
              type="text"
            />
          </p>
          <span class="del" @click="handelDel(i)"></span>
        </li>
      </ul>
    </wrap>

    <div class="ti-bnt-wrap">
      <t-button :handelClick="addObj" :color="color" text="添加选项"></t-button>
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
  name: "Title",
  mixins: [mixins],
  components: {
    Top,
    TButton,
  },
  computed: {
    color() {
      let title = this.title.trim();
      if (title) {
        return "green";
      } else {
        return "null";
      }
    },
  },
  data() {
    return {
      title: "",
      name: "test",
      list: [],
      selectObj: {},
      obj: {},
    };
  },
  async created() {
    //this.showAlert('太二酸菜鱼')
    /* nedb
      .findAllAndCount(
        {
          type: "title",
          title: this.title,
        },
        [1, 1, 1]
      )
      .then((v) => {
        let _D = v.rows[0].select;
        for (const key in _D) {
          if (Object.hasOwnProperty.call(_D, key)) {
            const element = _D[key];
            console.log(element);
          }
        }
        return;
      }); */
  },
  methods: {
    topConfirm() {
      //alert("topConfirm");

      if (!this.title) {
        this.showAlert("请输入标题");
        return;
      } else {
        nedb
          .findAllAndCount(
            {
              type: "title",
              title: this.title,
            },
            [1, 1, 10]
          )
          .then((v) => {
            let exist = 0;
            if (v) {
              exist = v.count;
              if (exist > 0) {
                this.showAlert("此标题已经存在");
                return;
              } else {
                let _obj = v.rows;
                /*  _obj.then((v) => {
              console.log(v);
              _obj = v;
            }); */
                if (Object.keys(this.selectObj).length < 3) {
                  this.showAlert("请添加至少三个选项");
                  return;
                }
                //alert(2);
                let obj = [];
                let object = this.selectObj;
                for (const key in object) {
                  if (Object.hasOwnProperty.call(object, key)) {
                    const l = object[key][0];
                    let item = l.name.trim() + "";
                    obj.push({ name: item, weight: 12 });
                  }
                }
                console.log(obj, "213123");
                nedb
                  .create({
                    type: "title",
                    title: this.title,
                    select: obj,
                    mes: "mes",
                  })
                  .then(() => {
                    this.showAlert("添加成功");
                  })
                  .catch((e) => {
                    this.showAlert("添加失败");
                  });
              }
            }
          });
      }
    },
    addObj() {
      if (this.list.length >= 10) {
        return this.showAlert("最多只能创建10个选项");
      }
      this.list.push({
        name: "",
      });
    },
    handelDel(index) {
      this.list.splice(index, 1);
    },
    checkList() {
      let obj = {};

      this.list.map((l) => {
        let item = l.name.trim() + "";
        obj[item] = [{ name: item, weight: 10 }];
      });
      console.log("obj--->", obj);
      this.selectObj = obj;
      let _list = [];
      for (let i in obj) {
        _list.push({
          name: i,
        });
      }
      this.list = _list;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tt {
  overflow: hidden;
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
  width: 80%;
  padding-bottom: 20px;
  left: 10%;
}
.tt {
  position: relative;
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
