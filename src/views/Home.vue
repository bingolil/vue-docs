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
  SelectField,
  SwitchField,
  Textarea,
  TimeField,
} from "@/class/components/common/dynamic-form";
import dayjs from "dayjs";

@Options({
  name: "Home",
  components: { DynamicForm },
  methods: { dayjs: dayjs },
})
export default class Home extends Vue {
  /** 表单数据 */
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
    new InputPassword({
      key: "confirmPassword",
      value: null,
      label: "确认密码",
      rules: [
        { type: "required", message: "二次输入密码" },
        { type: "equal", value: "password", message: "密码不一致" },
      ],
    }),
    new InputNumber({ key: "age", value: null, label: "年龄" }),
    new DateField({
      key: "birthday",
      value: null,
      label: "出生日期",
      placeholder: "请选择年月",
      valueFormat: "YYYY-MM-DD HH:mm:ss",
      showTime: true,
      minuteStep: 30,
      format: "YYYY-MM-DD HH:mm:ss",
      disabledDateFn: (current) => {
        return current && current < dayjs().endOf("day");
      },
    }),
    new TimeField({
      key: "upTime",
      showNow: false,
      minuteStep: 30,
      value: dayjs(new Date()),
      label: "起床时间",
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
    new SwitchField({
      key: "isAuto",
      value: false,
      label: "自动项目",
    }),
    new SelectField({
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
