<template>
  <div class="upload">
    <a-space>
      <a-upload
        :file-list="fileList"
        :before-upload="beforeUpload"
        accept=".png,.jpg,.jpeg,.gif,.webp"
        multiple
        @remove="handleRemove"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          Select File
        </a-button>
      </a-upload>

      <a-button type="primary" :loading="uploading" @click="handleUpload">
        {{ uploading ? "Uploading" : "Start Upload" }}
      </a-button>
      <a-button @click="changeInfo">修改</a-button>
      <a-button type="primary" @click="uploadImg">上传图片</a-button>
      <a-button @click="createGroup">新建分组</a-button>
    </a-space>
    <div>
      <img
        v-for="item in imgList"
        class="set-img"
        :key="item.id"
        :src="item.address"
        :alt="item.name"
      />
    </div>
  </div>
  <a-table
    :columns="columns"
    :row-key="(record) => record.id"
    :data-source="dataSource"
    :pagination="pagination"
    @change="handleChange"
  >
  </a-table>
  <GroupModal ref="groupRef" />
  <UploadImgModal ref="uploadImgRef" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import axios from "axios";

import { columns, BASEURL } from "./config";
import GroupModal from "./group";
import UploadImgModal from "./upload";

const fileList = ref([]);
const imgList = ref([]);
const dataSource = ref([]);
const uploading = ref(false);
const total = ref(0);
const current = ref(1);
const pageSize = ref(10);
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));
const groupRef = ref(null);
const uploadImgRef = ref(null);

const createGroup = () => {
  groupRef.value.open();
};

const uploadImg = () => {
  uploadImgRef.value.open();
};

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
const beforeUpload = (file) => {
  fileList.value = [...fileList.value, file];
  return false;
};
const handleUpload = () => {
  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append("file", file);
  });
  formData.append("paramId", 1);
  // uploading.value = true;

  axios({
    url: BASEURL + "/upload/image",
    method: "POST",
    data: formData,
  })
    .then((res) => {
      // fileList.value = [];
      // uploading.value = false;
      imgList.value = res.data.data;
      message.success("upload successfully.");
    })
    .catch(() => {
      uploading.value = false;
      message.error("upload failed.");
    });
};

const handleChange = (pagination) => {
  current.value = pagination.current;
  pageSize.value = pagination.pageSize;
  getTableList({ ...pagination });
};

const changeInfo = () => {
  const dataValue = {
    id: 5,
  };
  axios({
    url: BASEURL + "/upload/updateImg",
    method: "PUT",
    data: dataValue,
  }).then((res) => {
    console.log(res, "===put===");
    // dataSource.value = res.data.data;
    // total.value = res.data.total;
  });
};

const getTableList = ({ current = 1, pageSize = 10 }) => {
  axios({
    url: BASEURL + "/upload/list",
    method: "GET",
    params: {
      current,
      pageSize,
    },
  }).then(({ data }) => {
    console.log(data, "---");
    dataSource.value = data.data.result;
    total.value = data.data.page.total;
  });
};

onMounted(() => {
  getTableList({});
});
</script>

<style lang="less">
.upload {
  margin: 20px;
}
.set-img {
  height: 200px;
  width: 200px;
}
</style>
