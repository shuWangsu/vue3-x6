<template>
  <div class="clearfix">
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
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? "Uploading" : "Start Upload" }}
    </a-button>
  </div>
</template>
<script setup>
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref } from "vue";
import axios from "axios";

const BASEURL = "http://10.11.12.10:7001";

const fileList = ref([]);
const uploading = ref(false);
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
  uploading.value = true;

  axios({
    url: BASEURL + "/upload/image",
    method: "POST",
    data: formData,
  })
    .then((res) => {
      fileList.value = [];
      uploading.value = false;
      message.success("upload successfully.");
    })
    .catch(() => {
      uploading.value = false;
      message.error("upload failed.");
    });
};
</script>
