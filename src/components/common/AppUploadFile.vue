<template>
  <div class="clearfix upload">
    <a-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        {{ $t("lang.common.upload.selectFile") }}
      </a-button>
    </a-upload>
    <a-button
      v-if="manual"
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      <!-- 上传中 -->
      <template v-if="uploading">
        {{ $t("lang.common.upload.uploading") }}
      </template>
      <!-- 开始上传 -->
      <template v-if="!uploading">
        {{ $t("lang.common.upload.startUpload") }}
      </template>
    </a-button>
  </div>
</template>

<script lang="ts">
import { message, UploadFile } from "ant-design-vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  /** 上传地址 */
  uploadUrl = prop({ type: String, default: () => "/demo/api/upload" });
  /** 上传的参数 */
  uploadParams = prop({ type: Object, default: () => new Object() });
  /** 限定文件的格式，英文逗号隔开 */
  fileType = prop({ type: String, default: () => "" });
  /** 是否支持多选 */
  multiple = prop({ type: Boolean, default: () => false });
  /** 是否手动上传 */
  manual = prop({ type: Boolean, default: () => true });
  /** 批量上传时，一次上传的文件个数 */
  maxCount = prop({ type: Number, default: () => 1 });
}

// 组件：通用文件上传
@Options({
  name: "AppUploadFile",
})
export default class AppUploadFile extends Vue.with(Props) {
  /** 限定上传的文件个格式数组 */
  get allTypes(): string[] {
    const list = this.fileType.split(",").map((type) => type.toLowerCase());
    if (list.length === 1 && list[0].trim() === "") {
      return [];
    }
    return list;
  }

  /** 文件列表 */
  fileList: UploadFile[] = [];
  /** 是否为正在上传 */
  uploading = false;
  /** 格式错误提示语，ex：beforeUpload中访问不了 this.$t  */
  typeErrMsg = "";
  /** 批量上传时，限制文件数量提示语 */
  limitErrMsg = "";

  created() {
    const typeTips = "lang.common.upload.typeError";
    this.typeErrMsg = this.$t(typeTips, { type: this.fileType });
    const limitTips = "lang.common.upload.limitError";
    this.limitErrMsg = this.$t(limitTips, { maxCount: this.maxCount });
  }

  /**
   * 上传之前校验
   * @param file 当前的文件
   * @returns true可上传 false不可上传
   */
  beforeUpload = (file: UploadFile) => {
    console.log(this.allTypes);
    if (this.allTypes.length > 0) {
      // 需要校验格式
      const theType = file.name.substr(file.name.lastIndexOf(".") + 1);
      if (!this.allTypes.find((dd) => dd === theType.toLowerCase())) {
        message.warning(this.typeErrMsg);
        return false;
      }
    }

    if (this.manual) {
      // 手动上传
      this.fileList.push(file);
    }

    return true;
  };

  /**
   * @description 上传文件
   */
  handleUpload(): void {
    //
  }

  /**
   * @description 移除文件
   */
  handleRemove(): void {
    //
  }
}
</script>