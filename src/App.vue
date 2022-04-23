<template>
  <a-config-provider :locale="uiLocale">
    <LoadingUI />
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import LoadingUI from "@/components/common/LoadingUI.vue";

@Options({
  components: { LoadingUI },
  computed: mapState(["uiLocale"]),
})
export default class App extends Vue {}
</script>

<style lang="less">
</style>
