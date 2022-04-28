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
}

// 组件：通用文件上传
@Options({
  name: "AppUploadFile",
})
export default class AppUploadFile extends Vue.with(Props) {
  /** 文件列表 */
  fileList: UploadFile[] = [];
  /** 是否为正在上传 */
  uploading = false;

  /**
   * 上传之前校验
   * @param file 当前的文件
   * @returns true可上传 false不可上传
   */
  beforeUpload = (file: UploadFile) => {
    // 限定的文件格式
    const allType = this.fileType.split(",").map((type) => type.toLowerCase());
    // 当前文件格式
    const theType = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
    if (allType.find((dd) => dd === theType)) {
      const tips = "lang.common.upload.typeError";
      message.warn(this.$t(tips, { type: this.fileType }));
      return false;
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