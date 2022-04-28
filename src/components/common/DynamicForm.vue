<template>
  <a-form id="dynamic-form" :layout="layout" v-bind="formColConfig">
    <template v-for="item in formItems" :key="item.key">
      <a-form-item
        :label="item.label"
        v-bind="dynamicUseForm.validateInfos[item.key]"
      >
        <!-- 单行文本输入框 -->
        <template v-if="item.type === 'inputText'">
          <a-input
            v-model:value="formRef[item.key]"
            :maxLength="item.maxLength"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 多行文本输入框 -->
        <template v-else-if="item.type === 'textarea'">
          <a-textarea
            v-model:value="formRef[item.key]"
            :maxLength="item.maxLength"
            :disabled="item.disabled"
            :autosize="item.rowsConfig"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 密码框 -->
        <template v-if="item.type === 'inputPassword'">
          <a-input-password
            v-model:value="formRef[item.key]"
            :maxLength="item.maxLength"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 数字输入框 -->
        <template v-else-if="item.type === 'inputNumber'">
          <a-input-number
            v-model:value="formRef[item.key]"
            :min="item.min"
            :max="item.max"
            :step="item.step"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 下拉框 -->
        <template v-else-if="item.type === 'select'">
          <a-select
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :allow-clear="item.allowClear"
            :mode="item.mode"
            :default-open="item.defaultOpen"
            :placeholder="item.placeholder"
          >
            <a-select-option
              v-for="option in item.options"
              :key="option.value"
              :disabled="!!option.disabled"
            >
              {{ option.text }}
            </a-select-option>
          </a-select>
        </template>
        <!-- 单选框组 -->
        <template v-else-if="item.type === 'radioGroup'">
          <a-radio-group
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
          >
            <a-radio
              v-for="option in item.options"
              :key="option.value"
              :disabled="option.disabled"
            >
              {{ option.text }}
            </a-radio>
          </a-radio-group>
        </template>
        <!-- 单个多选框 -->
        <template v-else-if="item.type === 'checkbox'">
          <a-checkbox
            v-model:checked="formRef[item.key]"
            :disabled="!!item.disabled"
          ></a-checkbox>
        </template>
        <!-- 多选框组 -->
        <template v-else-if="item.type === 'checkboxGroup'">
          <a-checkbox-group
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :options="item.options"
          />
        </template>
        <!-- 日期控件 -->
        <template v-else-if="item.type === 'date'">
          <a-date-picker
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :show-time="!!item.showTime"
            :picker="item.picker"
            :format="item.format"
            :placeholder="item.placeholder"
            :allow-clear="item.allowClear"
            :value-format="item.valueFormat"
          />
        </template>
        <!-- 日期范围控件 -->
        <template v-else-if="item.type === 'dateRange'">
          <a-range-picker
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :format="item.format"
            :allow-clear="item.allowClear"
            :value-format="item.valueFormat"
          />
        </template>
        <!-- 时间控件 -->
        <template v-else-if="item.type === 'time'">
          <a-time-picker
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :format="item.format"
            :value-format="item.valueFormat"
          />
        </template>
        <!-- swicth开关 -->
        <template v-else-if="item.type === 'switch'">
          <a-switch
            :disabled="item.disabled"
            v-model:checked="formRef[item.key]"
          />
        </template>
      </a-form-item>
    </template>
    <a-form-item :wrapper-col="btnColConfig">
      <!-- 
        slot 用法 ex：
          <template v-slot:okSlot>
            html or text content
          </template>
       -->
      <a-button type="primary" @click.prevent="onSubmit">
        <slot name="okSlot">{{ $t("lang.common.form.submit") }}</slot>
      </a-button>
      <a-button style="margin-left: 10px" v-if="showReset" @click="resetFields">
        {{ $t("lang.common.form.reset") }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { IRuleItem } from "@/interfaces/components/common/dynamic-form";
import { AntdUseFormType } from "@/types";
import { TypeJudgeUtil } from "@/utils";
import { Form } from "ant-design-vue";
import { Rule } from "ant-design-vue/lib/form";
import { reactive, toRaw } from "vue";
import { Options, Vue, prop } from "vue-class-component";

/** 组件prop */
class Props {
  /** 表单对象list */
  formControls = prop({ type: Array, default: () => [] });
  /** 表单布局 'horizontal水平' | 'vertical堆叠' | 'inline内联' */
  layout = prop({ type: String, default: () => "horizontal" });
  /** 是否展示重置按钮 */
  showReset = prop({ type: Boolean, default: () => true });
  /** col栅格配置 */
  colConfig = prop({
    type: Object,
    default: () => {
      return { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
    },
  });
}

@Options({
  name: "DynamicForm",
})
export default class DynamicForm extends Vue.with(Props) {
  /** 表单控件对象列表 */
  get formItems(): any[] {
    if (Array.isArray(this.formControls)) {
      return this.formControls;
    }
    const jsonval = JSON.stringify(this.formControls);
    console.error("Prop formControls type is error: " + jsonval);
    return []; // 默认空数组
  }
  /** 表单栅格配置 */
  get formColConfig() {
    return this.layout === "horizontal" ? this.colConfig : {};
  }
  /** 按钮位置配置 */
  get btnColConfig() {
    if (this.layout === "horizontal") {
      const { labelCol, wrapperCol } = this.colConfig;
      return { span: wrapperCol?.span, offset: labelCol?.span };
    }
    return {};
  }

  /** 定义表单对象 */
  formRef: { [key: string]: any } = {};
  /** 定义表单校验规则 */
  rulesRef: { [key: string]: any } = {};
  /** 定义动态表单useForm */
  dynamicUseForm!: AntdUseFormType;

  created() {
    const formObj: { [key: string]: any } = {}; // 表单对象
    const rulesObj: { [key: string]: any } = {}; // 表单校验规则对象
    this.formItems.forEach((item) => {
      formObj[item.key] = item.value;
      const validateFn = async (_rule: Rule, value: any) => {
        // item.rules.forEach(()=>{}) // return不能结束forEach循环，采用for循环
        for (let i = 0; i < item.rules.length; i++) {
          const kk = item.rules[i] as IRuleItem;
          if (kk.type === "required" && !value) {
            return Promise.reject(kk.message);
          }
          if (
            kk.type === "required" &&
            TypeJudgeUtil.isArray(value) &&
            value.length === 0
          ) {
            // 数组必填（范围时间）
            return Promise.reject(kk.message);
          }
          if (!TypeJudgeUtil.isNullOrUndefined(value)) {
            // 存在值时，往下校验
            if (kk.type === "minNum" && Number(value) < Number(kk.value)) {
              return Promise.reject(kk.message); // number 最小值
            } else if (
              kk.type === "maxNum" &&
              Number(value) > Number(kk.value)
            ) {
              return Promise.reject(kk.message); // number 最大值
            } else if (
              kk.type === "minStrLen" && // string 最小长度
              String(value).length < Number(kk.value)
            ) {
              return Promise.reject(kk.message);
            } else if (
              kk.type === "maxStrLen" && // string最大长度
              String(value).length > Number(kk.value)
            ) {
              return Promise.reject(kk.message);
            } else if (
              // 正则校验
              kk.type === "regexp" &&
              !(kk.value as RegExp).test(value)
            ) {
              return Promise.reject(kk.message); // 正则校验
            } else if (
              kk.type === "minArrLen" &&
              (value as []).length < Number(kk.value)
            ) {
              return Promise.reject(kk.message); // 数组最小长度
            } else if (
              kk.type === "maxArrLen" &&
              (value as []).length > Number(kk.value)
            ) {
              return Promise.reject(kk.message); // 数组最大长度
            }
            // if (kk.type === "equal") { // 密码相等
            // }
          }
        }
        return Promise.resolve();
      };
      rulesObj[item.key] = [{ validator: validateFn, trigger: "change" }];
    });
    this.formRef = reactive(formObj);
    this.rulesRef = reactive(rulesObj);

    this.dynamicUseForm = Form.useForm(this.formRef, this.rulesRef);

    console.log("dynamic form created...");
  }

  /** 重置表单 */
  resetFields(): void {
    this.dynamicUseForm.resetFields();
  }

  /** 表单提交 */
  onSubmit(): void {
    this.dynamicUseForm.validate().then(
      () => {
        this.$emit("emitFormValue", toRaw(this.formRef));
      },
      () => {}
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>

