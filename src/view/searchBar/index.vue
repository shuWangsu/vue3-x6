<template>
  <div>
    <SearchBar :search-data="searchData" rememberDefaultValue :searchInfo="searchInfo" @search="search" >
    </SearchBar>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import SearchBar from "./components/SearchBar.vue";

const searchData = reactive([
  {
    type: "input-search",
    filed: "name",
    placeholder: "请输入姓名",
    width: "200px",
    props: {},
  },
  {
    type: "input",
    filed: "age",
    placeholder: "请输入姓名",
    width: "200px",
    props: {},
  },
  {
    type: "select",
    filed: "sex",
    placeholder: "请输入性别",
    width: "200px",
    options: [
      {
        value: 1,
        label: "女",
      },
      { value: 0, label: "男" },
    ],
    props: {
      mode: "multiple",
    },
  },
  {
    type: "picker",
    filed: "date",
    width: "200px",
  },
]);
const searchInfo = reactive({
  name: 123,
  age: undefined,
  sex: undefined,
  date: undefined,
});

const search = (data) => {
    console.log(data, '=====');
}

const reset = () => {
    console.log('-----')
}
</script>
