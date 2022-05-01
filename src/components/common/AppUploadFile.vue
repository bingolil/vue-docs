<template>
  <div class="clearfix upload">
    <a-upload
      :file-list="fileList"
      :action="uploadAction"
      :data="uploadData"
      :headers="uploadHeaders"
      :disabled="disabled"
      :list-type="listType"
      :multiple="multiple"
      :directory="directory"
      :before-upload="beforeUpload"
      :max-count="maxCount"
      @change="handleChange"
      @remove="handleRemove"
    >
      <slot name="uploadContent">
        <a-button>
          <upload-outlined></upload-outlined>
          {{ $t("lang.common.upload.selectFile") }}
        </a-button>
      </slot>
      <span v-if="fileType && showType" style="margin-left: 12px">
        {{ $t("lang.common.upload.supportFileType", { type: fileType }) }}
      </span>
    </a-upload>
    <a-button
      v-if="manual"
      :style="startBtnConfig"
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
import { appService } from "@/api/request";
import { store } from "@/store";
import { message, UploadFile, UploadProps } from "ant-design-vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  /** 上传地址 */
  uploadUrl = prop({ type: String, default: () => "/demo/api/upload" });
  /** 上传的参数 */
  uploadParams = prop({ type: Object, default: () => new Object() });
  /** 限定文件的格式，英文逗号隔开 */
  fileType = prop({ type: String, default: () => "" });
  /** 是否支持多选 */
  multiple = prop({ type: Boolean, default: () => true });
  /** 是否手动上传 */
  manual = prop({ type: Boolean, default: () => false });
  /** 是否禁用 */
  disabled = prop({ type: Boolean, default: () => false });
  /** 上传列表的样式，text, picture 和 picture-card */
  listType = prop({ type: String, default: () => "text" });
  /** 是否展示支持上传文件的格式 */
  showType = prop({ type: Boolean, default: () => true });
  /** 是否支持上传文件夹 */
  directory = prop({ type: Boolean, default: () => false });
  /** 批量上传时，一次上传的文件个数，undefined不限制个数 */
  maxCount = prop({ type: Number, default: () => undefined });
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
  /** 开始上传按钮样式配置（和选择文件一样长） */
  get startBtnConfig(): { width: string } {
    if (store.state.lang === "zh-CN") return { width: "110px" };
    return { width: "113px" };
  }
  /** 上传的地址 */
  get uploadAction(): string | undefined {
    if (this.manual) return undefined; // 手动上传时，不需要action
    return this.uploadUrl;
  }
  /** 上传的额外参数data */
  get uploadData(): Object | undefined {
    if (this.manual) return undefined;
    return this.uploadParams;
  }
  /** 上传的headers */
  get uploadHeaders() {
    if (this.manual) return undefined;
    return {};
  }

  /** 文件列表 */
  fileList: UploadFile[] = [];
  /** 是否为正在上传 */
  uploading = false;
  /** 格式错误提示语，note：beforeUpload中访问不了 this.$t  */
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
   * @returns true时马上上传 false展示不上传
   */
  beforeUpload = (file: UploadFile) => {
    if (this.allTypes.length > 0) {
      const theType = file.name.substr(file.name.lastIndexOf(".") + 1);
      if (!this.allTypes.find((dd) => dd === theType.toLowerCase())) {
        message.warning(this.typeErrMsg); // 文件格式不符合需求
        return false;
      }
    }
    if (this.maxCount !== undefined && this.fileList.length >= this.maxCount) {
      message.warning(this.limitErrMsg); // 文件数量不符合需求
    }
    if (this.manual) {
      if (this.multiple) {
        this.fileList.push(file); // 批量手动上传
      } else {
        this.fileList = [file]; // 上传一个文件
      }
      return false;
    }
    return true; // 自动上传
  };

  /**
   * @description 移除文件
   * @param file 被移除的文件
   */
  handleRemove: UploadProps["onRemove"] = (file: UploadFile) => {
    const index = this.fileList.indexOf(file);
    const newFileList = this.fileList.slice();
    newFileList.splice(index, 1);
    this.fileList = newFileList;
  };

  /**
   * @description 文件状态改变的回调，上传中，上传成功，上传失败都会回调
   * @param callBackRes 回调对象
   */
  handleChange(callBackObj: any): void {
    // file 当前操作的文件对象
    // fileList 当前的文件列表
    // event 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持
    const { event, fileList } = callBackObj;
    if (Array.isArray(fileList) && !this.manual) {
      this.fileList = fileList;
    }
    // 需要配合后台，重写这块代码
    if (event) {
      const { reponse } = event;
      if (reponse) {
        this.$emit("uploadSuccess", reponse);
      }
    }
  }

  /**
   * @description 上传文件
   */
  handleUpload(): void {
    if (this.maxCount !== undefined && this.fileList.length >= this.maxCount) {
      message.warning(this.limitErrMsg); // 文件数量不符合需求
    }
    const formData = new FormData();
    this.fileList.forEach((file) => formData.append("files", file as any));
    const paramKeys = Object.keys(this.uploadParams);
    paramKeys.forEach((key) => formData.append(key, this.uploadParams[key]));
    this.uploading = true;
    const options = { url: this.uploadUrl, data: formData, loading: false };
    appService.post(options).then(
      (res) => {
        this.fileList = []; // 上传成功，清除已上传的展示
        this.uploading = false;
        this.$emit("uploadSuccess", res); // 通知父组件，上传成功
      },
      () => {
        this.uploading = false;
      }
    );
  }
}
</script>