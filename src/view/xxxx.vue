<template>
  <div></div>
</template>

<script>
export default {
  name: "",
};
</script>
<script setup>
import { ref, watch, computed, reactive } from 'vue';
import axios from 'axios'
import { asynLoad } from"@/utils/excel"
import LuckyExcel from "luckyexcel";
const a =  {
 data() {
 return{
 fileName:'hello'
    }
  },
 created(){
 this.loadPlugins();
 },

 methods: {
 // 获取传递的url参数
 getComment(){
 var afterUrl =  window.location.search;
 let str = afterUrl.split("?")[1].split("&");
 for (let i = 0; i < str.length; i++) {
 let a = str[i].split('=')
 this.obj[a[0]] = a[1]
          }
    },
 loadPlugins() {
 const baseURL = '//cdn.jsdelivr.net/npm/luckysheet@latest/dist';
 Promise.all([
 asynLoad(`${baseURL}/plugins/css/pluginsCss.css`, true),
 asynLoad(`${baseURL}/plugins/plugins.css`, true),
 asynLoad(`${baseURL}/css/luckysheet.css`, true),
 asynLoad(`${baseURL}/assets/iconfont/iconfont.css`, true),
 asynLoad(`${baseURL}/plugins/js/plugin.js`),
 asynLoad(`${baseURL}/luckysheet.umd.js`)
      ])
        .then(() => {

 luckysheet = window.luckysheet;
 this.getOriginFile(); // 获取远端文件
        })
        .catch(res => {
        })
    },
 getOriginFile() {
 axios({
 method: 'post',
 responseType: 'blob',
//请求头，要自己写
 headers: {
      },
//excel文件路径
 url:
    }).then(({ data }) => {
 const blob = new Blob([data]);
 const file = new File([blob], this.fileName);
 this.init(file); // 开始渲染
    }).catch(e => {
    }).finally(() => {
    })
  },
 // 渲染方法，接受文件对象，如果是本地文件直接传入文件即可
 init(file) {
 luckysheet.destroy(); // 先销毁当前容器
 LuckyExcel.transformExcelToLucky(file, exportJson => {
 if (exportJson.sheets === null || !exportJson.sheets.length) {
 this.$message.error('无法读取excel文件的内容,当前不支持xls文件!');
 return;
      }
 luckysheet.create({
 container: 'luckysheet',
 showinfobar: false,
 lang: 'zh',
 data: exportJson.sheets,
 title: exportJson.info.name,
 userInfo: exportJson.info.name.creator
      });
    });

  }
  }
}
</script>
<style lang="less" scoped></style>
