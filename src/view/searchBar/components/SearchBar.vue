<template>
  <div class="search-bar">
    <a-space :size="size">
      <div v-for="(item, index) in searchData" :key="index">
        <a-input
          v-if="item.type == 'input'"
          v-model:value="searchInfo[item.filed]"
          :placeholder="item.placeholder"
          :style="{ width: item.width || '200px' }"
          v-bind="item.props"
          @pressEnter="onSearch"
        />
        <a-input-search
          v-if="item.type == 'input-search'"
          v-model:value="searchInfo[item.filed]"
          :placeholder="item.placeholder"
          :style="{ width: item.width || '200px' }"
          v-bind="item.props"
          @search="onSearch"
        />
        <a-textarea
          v-if="item.type == 'textarea'"
          v-model:value="searchInfo[item.filed]"
          :placeholder="item.placeholder"
          :style="{ width: item.width || '200px' }"
          v-bind="item.props"
          @pressEnter="onSearch"
        />
        <a-select
          v-if="item.type == 'select'"
          v-model:value="searchInfo[item.filed]"
          :placeholder="item.placeholder"
          :options="item.options"
          :style="{ width: item.width || '200px' }"
          v-bind="item.props"
          @select="onSearch"
        >
        </a-select>
        <a-date-picker
          v-if="item.type === 'picker'"
          v-model:value="searchInfo[item.filed]"
          show-time
          type="date"
          :placeholder="item.placeholder"
          :style="{ width: item.width || '200px' }"
          v-bind="item.props"
        />
      </div>
    </a-space>
    <slot name="searchBox" v-bind="{ searchInfo }">
      <a-button
        style="margin-left: 20px"
        v-bind="searchBtn"
        :type="searchBtn.type || 'primary'"
        @click="onSearch"
        >{{ searchBtn.label || "搜索" }}</a-button
      >
      <a-button style="margin-left: 8px" v-bind="resetBtn" @click="reset">{{
        resetBtn.label || "重置"
      }}</a-button>
    </slot>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
};
</script>
<script setup>
import { reactive, useAttrs } from "vue";
import {
  string,
  oneOfType,
  number,
  oneOf,
  object,
  array,
  bool,
} from "vue-types";

const attrs = useAttrs();
const props = defineProps({
  // 每一项的间距
  size: oneOfType([oneOf(["samll", "middle", "large"]), number()]).def(8),
  //   搜索按钮
  searchBtn: object().def({}),
  //   重置按钮
  resetBtn: object().def({}),
  //   搜索的字段
  searchInfo: object(),
  //   搜索的配置
  searchData: array(),
  //   记住默认值
  rememberDefaultValue: bool().def(false),
});
const emit = defineEmits(["search", "reset"]);

const searchData = reactive(props.searchData);
const searchInfo = reactive(props.searchInfo);
const defaultInfo = reactive({});
// 记录有初始值的，重置的时候可保留数据
Object.keys(searchInfo).forEach((item) => {
  if (searchInfo[item]) {
    defaultInfo[item] = searchInfo[item];
  }
});

const onSearch = () => {
  emit("search", searchInfo);
};
const reset = () => {
  // 重置 赋值为 undefined
  Object.keys(searchInfo).forEach((item) => {
    searchInfo[item] = undefined;
  });
  // 保留默认值
  if (props.rememberDefaultValue) {
    Object.assign(searchInfo, defaultInfo);
  }
  emit("reset", searchInfo);
};
</script>

<style scoped lang="less">
.search-bar {
  display: flex;
  flex-wrap: wrap;
}
</style>
