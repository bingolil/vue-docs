<template>
  <div id="home">
    <p>home works!</p>
    <div>
      <DynamicForm :formControls="formItems" @emitFormValue="getFormValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DynamicForm from "@/components/common/DynamicForm.vue";
import {
  BasicField,
  DateField,
  DateRange,
  InputNumber,
  InputPassword,
  InputText,
  Select,
} from "@/class/components/common/dynamic-form";

@Options({
  name: "Home",
  components: { DynamicForm },
})
export default class Home extends Vue {
  /** 表单列表 */
  formItems: BasicField<any>[] = [
    new InputText({
      key: "username",
      value: null,
      label: "姓名",
      maxLength: 6,
      rules: [
        { type: "required", message: "请填写姓名" },
        { type: "minStrLen", value: 4, message: "姓名长度为4-5" },
      ],
    }),
    new InputPassword({ key: "password", value: null, label: "密码" }),
    new InputNumber({ key: "age", value: null, label: "年龄" }),
    new DateField({
      key: "birthday",
      value: null,
      label: "出生日期",
      picker: "year",
      placeholder: "请选择年月",
      valueFormat: "YYYY-MM",
      format: "YYYY-MM",
    }),
    new DateRange({
      key: "gaozhong",
      value: [],
      label: "高中",
      picker: "year",
      placeholder: ["开始时间", "结束时间"],
      valueFormat: "YYYY-MM",
      format: "YYYY-MM",
      rules: [{ type: "required", message: "请选择高中时期" }],
    }),
    new Select({
      key: "sex",
      value: null,
      label: "性别",
      options: [
        { value: "1", text: "男" },
        { value: "2", text: "女" },
      ],
    }),
  ];

  getFormValue(value: any) {
    console.log(value);
  }
}
</script>
