<template>
  <div class="HomePage">
    <list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <cell-group
        v-for="(item, index) in list"
        :key="index"
        :title="item[0].examinationTypeEntity.typeName"
      >
        <cell
          v-for="(_item, index) in item"
          :key="index"
          :title="_item.examinationName"
          is-link
          :url="'/#/page/' + _item.examinationId"
        />
      </cell-group>
    </list>
  </div>
</template>

<script>
import { List, Cell, CellGroup } from "vant";
import index from "@/json/list";
export default {
  name: "HomePage",
  props: {},
  components: {
    List,
    Cell,
    CellGroup,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  beforeMount() {},
  mounted() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        let _list = index.data;
        let list = [[], [], []];
        _list.forEach((item) => {
          if (item.topTypeId == 4) list[0].push(item);
          if (item.topTypeId == 2) list[1].push(item);
          if (item.topTypeId == 3) list[2].push(item);
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
.HomePage {
  width: 100%;
  text-align: left;
}
</style>
