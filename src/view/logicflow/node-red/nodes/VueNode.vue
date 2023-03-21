<template>
  <div class="vue-node" :style="properties.style">
    <div class="status">
      <CheckCircleOutlined />
    </div>
    <div class="content">
      <div class="box-left">结构弛豫</div>
      <div class="box-right">
        <Tooltip placement="bottomLeft">
          <template #title>
            <Button @click="edit">编辑</Button>
            <Button @click="detail">详情</Button>
          </template>
          <SettingFilled />
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Button, Tooltip } from "ant-design-vue";
import { SettingFilled } from "@ant-design/icons-vue";
const props = defineProps({
  properties: {
    type: Object,
    default: () => ({}),
  },
  text: String,
});
const increaseFactor = ref(null);
const emits = defineEmits(["btnClick"]);
// watch(
//   () => props.properties.t,
//   (next) => {
//     increaseFactor.value = next;
//   }
// );

const edit = () => {
  emits("btnClick", { name: "hello" });
};
const detail = () => {};
</script>
<style lang="less" scoped>
.vue-node {
  display: flex;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.status {
}
.content {
  display: flex;
  border: 1px solid #ccc;
  .box-right {
    border-left: 1px solid #ccc;
  }
}
</style>
