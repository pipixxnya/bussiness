<template>
  <div id="iot">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { ElConfigProvider, ElSlider } from "element-plus";
import Store from "./store";
// import elementZhLocale from "element-plus/lib/locale/lang/zh-cn";
// import elementEnLocale from "element-plus/lib/locale/lang/en";
// let lang = elementZhLocale
export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
  },
  setup() {
    // const locale = ref(elementZhLocale)
    // watch(() => Store.state.lang,
    //     newVal => {
    //         if (newVal == "en") {
    // 			locale.value = elementEnLocale
    //         } else {
    // 			locale.value = elementZhLocale
    //         }
    //     }
    // );
    // return {
    //     locale
    // };
  },
});
</script>

<style>
#iot {
  width: 100%;
  height: 100%;
  
}
</style>
