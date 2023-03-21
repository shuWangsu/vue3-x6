<template>
  <el-tooltip content="预览" placement="top">
    <el-button
      type="warning"
      @click="coverUrl(scope.row)"
      icon="el-icon-document"
      circle
    ></el-button>
  </el-tooltip>

  <el-dialog
    :customClass="[showExcel == true || showDoc == true ? 'customWidth' : '']"
    :visible="
      showExcel === true ||
      showPdf === true ||
      showImg === true ||
      showDoc === true ||
      showPPt === true
    "
    class="dialog"
    :before-close="closePreviewClick"
    :close-on-click-modal="false"
    :visible.sync="iframeState"
    v-if="iframeState"
  >
    <div
      v-if="showExcel == true"
      class="dialog-body-content-base-style"
      style="width: 100%; height: 650px; display: flex; justify-content: center"
    >
      <div id="result"></div>
    </div>
    <div
      v-else-if="showDoc == true"
      style="
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        height: 850px;
        width: 100%;
        padding: 15px;
      "
    >
      <div
        class="hemldoc"
        v-loading="docVisible"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        v-html="vHtml"
      />
    </div>
    <div v-else-if="showPdf == true" class="dialog-body-content-base-style">
      <div style="position: fixed; top: 10px; z-index: 100">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-arrow-left"
            size="mini"
            @click="prePage"
            >上一页</el-button
          >
          <el-button type="primary" size="mini" @click="nextPage"
            >下一页<i class="el-icon-arrow-right el-icon--right"></i
          ></el-button>
        </el-button-group>
        <div style="margin-top: 10px; margin-left: 60px; color: #409eff">
          {{ pageNum }} / {{ pageTotalNum }}
        </div>
      </div>
      <pdf
        style="width: 70%; margin: 0 auto; height: 850px"
        ref="pdf"
        :page="pageNum"
        :src="pdfUrl"
        @progress="loadedRatio = $event"
        @num-pages="pageTotalNum = $event"
      >
      </pdf>
    </div>
    <div
      v-else-if="showImg == true"
      class="dialog-body-content-base-style"
      style="margin-bottom: 20px; display: flex; justify-content: center"
    >
      <img :src="imgUrl" style="height: 500px; text-align: center" />
    </div>
    <div
      v-else-if="showPPt == true"
      class="dialog-body-content-base-style"
      style="
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        width: 800px;
        height: 800px;
      "
    >
      <iframe
        :src="pptUrl"
        scrolling="no"
        frameborder="0"
        style="z-index: 1000; height: 100%; width: 100%"
      ></iframe>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "",
};
</script>
<script setup>
import { ref, watch, computed, reactive } from "vue";

import pdf from "vue-pdf"; // 预览pdf插件
import XLSX from "xlsx"; // 预览excel文件
import axios from "axios";
import mammoth from "mammoth"; // 预览word插件
export default {
  data() {
    return {
      showPPt: false,
      docVisible: false,
      vHtml: "",
      pageNum: 1,
      pageTotalNum: 1, // 总页数
      loadedRatio: 0, // 当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了
      showImg: false,
      showExcel: false,
      showDoc: false,
      showPdf: false,
      iframeState: false,
      imgUrl: "",
      url: "",
      pdfUrl: "",
      pptUrl: "",
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
    };
  },
  components: {
    AddOrUpdate,
    pdf,
    XLSX,
    mammoth,
  },

  // word 转换html流
  uploading(file) {
    const xhr = new XMLHttpRequest();
    xhr.open("get", file, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = () => {
      if (xhr.status === 200) {
        mammoth
          .convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) })
          .then((resultObject) => {
            this.$nextTick(() => {
              this.vHtml = resultObject.value;
              this.docVisible = false;
            });
          });
      }
    };
    xhr.send();
  },
  // 上一页
  prePage() {
    let page = this.pageNum;
    page = page > 1 ? page - 1 : this.pageTotalNum;
    this.pageNum = page;
  },

  // 下一页
  nextPage() {
    let page = this.pageNum;
    page = page < this.pageTotalNum ? page + 1 : 1;
    this.pageNum = page;
  },
  closePreviewClick() {
    if (this.showExcel === true) {
      this.showExcel = false;
      this.iframeState = false;
    } else if (this.showPdf === true) {
      this.showPdf = false;
      this.iframeState = false;
    } else if (this.showImg === true) {
      this.showImg = false;
      this.iframeState = false;
    } else if (this.showDoc === true) {
      this.showDoc = false;
      this.iframeState = false;
    } else if (this.showPPt === true) {
      this.showPPt = false;
      this.iframeState = false;
    }
  },
  /**
   * pdf预览
   */
  coverUrl(row) {
    let type = this.iconByType(row);
    var fileUrl = row.url;
    if (
      type.indexOf("xsl") !== -1 ||
      type.indexOf("xslx") !== -1 ||
      type.indexOf("xls") !== -1
    ) {
      this.iframeState = true;
      this.url = fileUrl;
      this.previewExcel(this.url);
      this.showExcel = true;
    } else if (type.indexOf("docx") !== -1) {
      this.iframeState = true;
      this.docVisible = true;
      this.uploading(fileUrl);
      this.showDoc = true;
    } else if (type.indexOf("pdf") !== -1) {
      this.iframeState = true;
      this.pdfUrl = fileUrl;
      this.showPdf = true;
    } else if (
      type.indexOf("jpg") !== -1 ||
      type.indexOf("png") !== -1 ||
      type.indexOf("jpeg") !== -1
    ) {
      this.iframeState = true;
      this.imgUrl = fileUrl;
      this.showImg = true;
    } else if (type.indexOf("pptx") !== -1 || type.indexOf("ppt") !== -1) {
      this.iframeState = true;
      this.pptUrl =
        "https://view.xdocin.com/xdoc?_xdoc=" + encodeURIComponent(fileUrl);
      this.showPPt = true;
    } else if (type.indexOf("doc") !== -1) {
      this.$message("当前仅支持预览“.docx”文件，请下载查看");
    } else {
      this.$message("当前文件暂不支持预览，请下载查看");
    }
  },
  // 获取下标
  iconByType(row) {
    return row.filename.substring(
      row.filename.lastIndexOf(".") + 1,
      row.filename.length
    );
  },
  //  读取excel文件流
  readWorkbook(workbook) {
    var sheetNames = workbook.SheetNames; // 工作表名称集合
    var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
    var csv = XLSX.utils.sheet_to_csv(worksheet);
    document.getElementById("result").innerHTML = this.csv2table(csv);
  },
  csv2table(csv) {
    var html = "<table   class='table'>";
    var rows = csv.split("\n");
    rows.pop(); // 最后一行没用的
    rows.forEach(function (row, idx) {
      var columns = row.split(",");
      columns.unshift(idx + 1); // 添加行索引
      if (idx === 0) {
        // 添加列索引
        html += '<tr bgcolor="#ebeffb">';
        for (var i = 0; i < columns.length; i++) {
          html +=
            "<th >" +
            (i === 0 ? "" : String.fromCharCode(65 + i - 1)) +
            "</th>";
        }
        html += "</tr>";
      }
      html += "<tr>";
      columns.forEach(function (column) {
        html += "<td>" + column + "</td>";
      });
      html += "</tr>";
    });
    html += "</table>";
    return html;
  },
  // url为文件地址， 需要预览时调用previewExcel方法传入文件地址即可
  previewExcel(url) {
    axios({
      url,
      method: "GET",
      responseType: "arraybuffer",
    }).then((res) => {
      var data = new Uint8Array(res.data);
      var workbook = XLSX.read(data, { type: "array" });
      this.readWorkbook(workbook);
    });
  },
};
</script>
<style lang="less" scoped></style>
