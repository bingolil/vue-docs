<template>
  <div id="home">
    <p>home works!</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import dayjs from "dayjs";

@Options({
  name: "Home",
  components: {},
  methods: { dayjs: dayjs },
})
export default class Home extends Vue {}
</script>
