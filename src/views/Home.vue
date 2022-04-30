<template>
  <div id="home">
    <p>home works!</p>
    <AppUploadFile />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import dayjs from "dayjs";
import AppUploadFile from "@/components/common/AppUploadFile.vue";

@Options({
  name: "Home",
  components: { AppUploadFile },
  methods: { dayjs: dayjs },
})
export default class Home extends Vue {}
</script>
