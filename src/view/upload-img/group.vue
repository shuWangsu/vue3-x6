<template>
  <div>
    <a-modal v-model:visible="visible" title="新建分组" @ok="handleOk">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item
          label="分组名称"
          name="name"
          :rules="[{ required: true, message: '输入名称' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="分组描述" name="desc">
          <a-textarea v-model:value="formState.desc" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

import { BASEURL } from "./config";

const visible = ref(false);
const formState = reactive({
  name: "",
  desc: "",
});

const handleOk = () => {
  console.log(formState, "=formState=");
  axios({
    url: BASEURL + "/group/creategroup",
    method: "POST",
    data: formState,
  }).then((res) => {
    console.log(res, "===put===");
    // dataSource.value = res.data.data;
    // total.value = res.data.total;
  });
  hide();
};
const hide = () => {
  visible.value = false;
};
const open = () => {
  visible.value = true;
};

defineExpose({
  open,
});
</script>
