<template>
  <div class="Page">
    <list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <cell-group v-for="(item, index) in list" :key="index">
        <cell :title="index + 1 + '. ' + item.questionTitle" />
        <cell
          style="font-size: 14px; color: #969799"
          :title="question"
          v-for="(question, i) in item.questionSelects"
          :key="'question-' + index + '-' + i"
        />
        <cell title="答案" :value="item.questionAnswers" />
        <cell
          :title="'解析：' + item.questionDescribe"
          style="color: #1989fa"
        />
      </cell-group>
    </list>
  </div>
</template>

<script>
import { List, CellGroup, Cell } from "vant";
export default {
  name: "Page",
  props: {},
  components: {
    List,
    CellGroup,
    Cell,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      id: 0,
      activeNames: [],
    };
  },
  beforeMount() {
    this.id = this.$route.params.id;
  },
  mounted() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        let list = require("./../json/" + this.id + ".js").default.data;
        list = list.map((item) => {
          item.questionSelects = item.questionSelect.split("###");
          item.questionAnswers = item.questionAnswer.split("###").join("");
          return item;
        });
        this.list = list;
        this.loading = false;
        this.finished = true;
      }, 100);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.Page {
  width: 100%;
  text-align: left;
}
</style>
