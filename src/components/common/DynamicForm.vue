<template>
  <a-form
    id="dynamic-form"
    :layout="layout"
    v-bind="formColConfig"
    :hideRequiredMark="!showStar"
  >
    <template v-for="item in formItems" :key="item.key">
      <a-form-item
        :label="item.label"
        v-bind="dynamicUseForm.validateInfos[item.key]"
        :required="starObj[item.key]"
      >
        <!-- 单行文本输入框 -->
        <template v-if="item.type === 'inputText'">
          <a-input
            v-model:value="formRef[item.key]"
            :showCount="item.showCount"
            :maxlength="item.maxLength"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
            :allow-clear="item.allowClear"
            @change="formValueChange($event, item.key, true)"
          />
        </template>
        <!-- 多行文本输入框 -->
        <template v-else-if="item.type === 'textarea'">
          <a-textarea
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :maxlength="item.maxLength"
            :autoSize="item.rowsConfig"
            :allow-clear="item.allowClear"
            :placeholder="item.placeholder"
            :showCount="item.showCount"
            @change="formValueChange($event, item.key)"
          />
        </template>
        <!-- 密码框 -->
        <template v-if="item.type === 'inputPassword'">
          <a-input-password
            v-model:value="formRef[item.key]"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
            @change="formValueChange($event, item.key, true)"
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
            @change="formValueChange($event, item.key)"
          />
        </template>
        <!-- 下拉框 -->
        <template v-else-if="item.type === 'select'">
          <a-select
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :allow-clear="item.allowClear"
            :mode="item.mode"
            :show-search="item.showSearch"
            :filter-option="filterOption"
            :default-open="item.defaultOpen"
            :maxTagCount="item.maxTagCount"
            :placeholder="item.placeholder"
            @change="formValueChange($event, item.key)"
          >
            <a-select-option
              v-for="option in item.options"
              :key="option.value"
              :text="option.text"
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
            @change="formValueChange($event, item.key)"
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
            @change="formValueChange($event, item.key)"
          ></a-checkbox>
        </template>
        <!-- 多选框组 -->
        <template v-else-if="item.type === 'checkboxGroup'">
          <a-checkbox-group
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :options="item.options"
            @change="formValueChange($event, item.key)"
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
            :disabled-date="item.disabledDateFn"
            :disabled-time="item.disabledTimeFn"
            :use12Hours="item.use12Hours"
            :showNow="item.showNow"
            :hour-step="item.hourStep"
            :minute-step="item.minuteStep"
            :second-step="item.secondStep"
            @change="formValueChange($event, item.key)"
          />
        </template>
        <!-- 日期范围控件 -->
        <template v-else-if="item.type === 'dateRange'">
          <a-range-picker
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :picker="item.picker"
            :format="item.format"
            :value-format="item.valueFormat"
            :allow-clear="item.allowClear"
            :placeholder="item.placeholder"
            :disabled-date="item.disabledDateFn"
            :disabled-time="item.disabledTimeFn"
            :use12Hours="item.use12Hours"
            :show-time="item.showTime"
            :hour-step="item.hourStep"
            :minute-step="item.minuteStep"
            :second-step="item.secondStep"
            @change="formValueChange($event, item.key)"
          />
        </template>
        <!-- 时间控件 -->
        <template v-else-if="item.type === 'time'">
          <a-time-picker
            v-model:value="formRef[item.key]"
            :disabled="item.disabled"
            :picker="item.picker"
            :format="item.format"
            :value-format="item.valueFormat"
            :disabled-time="item.disabledTimeFn"
            :use12Hours="item.use12Hours"
            :showNow="item.showNow"
            :hour-step="item.hourStep"
            :minute-step="item.minuteStep"
            :second-step="item.secondStep"
            @change="formValueChange($event, item.key)"
          />
        </template>
        <!-- swicth开关 -->
        <template v-else-if="item.type === 'switch'">
          <a-switch
            :disabled="item.disabled"
            v-model:checked="formRef[item.key]"
            @change="formValueChange($event, item.key)"
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
  layout = prop({ type: String, default: () => "inline" });
  /** 是否展示重置按钮 */
  showReset = prop({ type: Boolean, default: () => true });
  /** 展示必填红色必填星号 */
  showStar = prop({ type: Boolean, default: () => true });
  /** col栅格配置 */
  colConfig = prop({
    type: Object,
    default: () => {
      return { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
    },
  });
}

// 通用组件：动态表单（ex：dayjs使用的时候可以在Options中methods赋值一下）
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
  /** 必填绑定星号对象 */
  starObj: { [key: string]: boolean } = {};

  created() {
    console.log(toRaw(this.formControls));
    const formObj: { [key: string]: any } = {}; // 表单对象
    const rulesObj: { [key: string]: any } = {}; // 表单校验规则对象
    this.formItems.forEach((item) => {
      formObj[item.key] = item.value;
      this.starObj[item.key] = !!item.rules.find((dd: IRuleItem) => {
        return dd.type === "required";
      });
      const validateFn = async (_rule: Rule, value: any) => {
        // item.rules.forEach(()=>{}) // return不能结束forEach循环，采用for循环
        for (let i = 0; i < item.rules.length; i++) {
          const kk = item.rules[i] as IRuleItem;

          if (kk.type === "equal" && !!kk.isListen === true) {
            // 存在值相等时，触发校验
            const otherValue = toRaw(this.formRef[kk.value as string]);
            if (otherValue) {
              // 对比控件存在值，触发校验
              this.dynamicUseForm.validate(kk.value as string);
            }
          }

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
              kk.type === "minStrLen" &&
              String(value).length < Number(kk.value)
            ) {
              return Promise.reject(kk.message); // string 最小长度
            } else if (
              kk.type === "maxStrLen" &&
              String(value).length > Number(kk.value)
            ) {
              return Promise.reject(kk.message); // string最大长度
            } else if (
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
            } else if (kk.type === "equal" && !!kk.isListen === false) {
              const otherValue = toRaw(this.formRef[kk.value as string]);
              if (otherValue && value !== otherValue) {
                return Promise.reject(kk.message); // 两个控件的值相等
              }
            }
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

  /**
   * @description 下拉框输入过滤方法，showSearch为true时生效
   * @param input 输入的值
   * @param option 过滤的项
   * @returns true展示当前项，false不展示当前项
   */
  filterOption(input: string, option: any): boolean {
    return option.text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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

  /**
   * @description 监听表单数据变化，通知父组件（父组件若需要）
   * @param event 事件本身
   * @param formObjKey 发生变化的表单key
   * @param isInput 是否为文本输入框
   */
  formValueChange(event: any, formObjKey: string, isInputText?: boolean): void {
    const { value } = isInputText ? event.target : { value: event };
    console.log(value);
    this.$emit("valueChange", { key: formObjKey, value });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/deep/ .ant-form-item {
  margin-bottom: 24px;
  &.ant-form-item-with-help {
    margin-bottom: 0px;
  }
  .ant-form-item-control {
    .ant-form-item-control-input-content {
      .ant-input-number,
      .ant-select {
        min-width: 200px;
      }
    }
    .ant-form-item-explain {
      min-height: 24px;
    }
  }
}
</style>

