<template>
  <a-form id="dynamic-form" :layout="layout">
    <template v-for="item in formItems" :key="item.value">
      <a-form-item :label="item.label">
        <!-- 单行文本输入框 -->
        <template v-if="item.type === 'inputText'">
          <a-input
            v-model:value="item.value"
            :max-length="item.maxLength || Infinity"
            :min-length="item.minLength || 0"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 多行文本输入框 -->
        <template v-else-if="item.type === 'textArea'">
          <a-textarea
            v-model:value="item.value"
            :max-length="item.maxLength || Infinity"
            :min-length="item.minLength || 0"
            :disabled="item.disabled"
            :autosize="item.rowsConfig || { minRows: 1, maxRows: Infinity }"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 密码框 -->
        <template v-if="item.type === 'inputPassword'">
          <a-input-password
            v-model:value="item.value"
            :max-length="item.maxLength || Infinity"
            :min-length="item.minLength || 0"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 数字输入框 -->
        <template v-else-if="item.type === 'inputNumber'">
          <a-input-number
            v-model:value="item.value"
            :min="item.min || -Infinity"
            :max="item.max || Infinity"
            :step="item.step || 1"
            :disabled="!!item.disabled"
            :placeholder="item.placeholder"
          />
        </template>
        <!-- 下拉框 -->
        <template v-else-if="item.type === 'select'">
          <a-select
            v-model:value="item.value"
            :disabled="item.disabled"
            :allowClear="item.allowClear"
            :mode="item.mode || 'combobox'"
            :placeholder="item.placeholder"
          >
            <a-select-option
              v-for="option in item.options || []"
              :key="option.value"
              :disabled="!!option.disabled"
              >{{ option.text }}</a-select-option
            >
          </a-select>
        </template>
        <!-- 单选框组 -->
        <template v-else-if="item.type === 'radioGroup'">
          <a-radio-group v-model:value="item.value">
            <a-radio v-for="option in item.options || []" :key="option.value">{{
              option.text
            }}</a-radio>
          </a-radio-group>
        </template>
        <!-- 单个多选框 -->
        <template v-else-if="item.type === 'checkbox'">
          <a-checkbox
            v-model:checked="item.value"
            :disabled="!!item.disabled"
          ></a-checkbox>
        </template>
        <!-- 多选框组 -->
        <template v-else-if="item.type === 'checkboxGroup'">
          <a-checkbox-group
            v-model:value="item.value"
            :disabled="item.disabled"
            :options="item.options || []"
          />
        </template>
        <!-- 日期控件 -->
        <template v-else-if="item.type === 'date'">
          <a-date-picker
            v-model:value="item.value"
            :disabled="item.disabled"
            :show-time="!!item.showTime"
            :packer="item.packer || 'date'"
            :format="item.format || 'YYYY-MM-DD'"
            :value-format="item.valueFormat || 'YYYY-MM-DD'"
          />
        </template>
        <!-- 日期范围控件 -->
        <template v-else-if="item.type === 'dateRange'">
          <a-range-picker
            v-model:value="item.value"
            :disabled="item.disabled"
            :format="item.format || 'YYYY-MM-DD'"
            :value-format="item.valueFormat || 'YYYY-MM-DD'"
          />
        </template>
        <!-- 时间控件 -->
        <template v-else-if="item.type === 'time'">
          <a-time-picker
            v-model:value="item.value"
            :disabled="item.disabled"
            :format="item.format || 'HH:mm:ss'"
            :value-format="item.valueFormat || 'HH:mm:ss'"
          />
        </template>
        <!-- swicth开关 -->
        <template v-else-if="item.type === 'switch'">
          <a-switch :disabled="item.disabled" v-model:checked="item.value" />
        </template>
      </a-form-item>
    </template>
  </a-form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IFormControl } from "@/interfaces/components/dynamic-form";

@Options({
  prop: {
    /** 表单对象list */
    formControls: {
      type: Array,
      default(): IFormControl[] {
        return [];
      },
    },
  },
})
export default class DynamicForm extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>

