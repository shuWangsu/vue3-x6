<template>
  <div>
    <a-modal v-model:visible="visible" title="上传分组" @ok="handleOk">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item
          label="图片名称"
          name="name"
          :rules="[{ required: true, message: '输入名称' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item
          label="所属分组"
          name="group"
          :rules="[{ required: true, message: '选择分组' }]"
        >
          <a-select
            v-model:value="formState.group"
            :options="groupOptions"
            :fieldNames="{ label: 'name', value: 'id' }"
          ></a-select>
        </a-form-item>

        <a-form-item label="图片描述" name="desc">
          <a-textarea v-model:value="formState.desc" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

import { BASEURL } from "./config";

const visible = ref(false);
const formState = reactive({
  name: "",
  desc: "",
  group: "",
});

const groupOptions = ref([]);

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

const getGroupList = () => {
  axios({
    url: BASEURL + "/group/list",
    method: "GET",
    params: {
      userId: "001",
    },
  }).then(({ data }) => {
    // console.log(res, "===put===");
    groupOptions.value = data.data;
  });
};

onMounted(() => {
  getGroupList();
});

defineExpose({
  open,
});
</script>
