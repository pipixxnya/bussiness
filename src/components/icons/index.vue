<template>
  <i class="svg-icon" v-bind="$attrs">
    <svg :style="{ color: color }">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
});
const iconName = computed(() => `#icon-${props.name}`);
watch(() => props.name,(newVal: string) => {
  console.log('aa',newVal)
})
// const svgClass = computed(() => {
//   if (props.name) {
//     return `icon-${props.name}`;
//   }
//   return '';
// });
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  line-height: 1em;
  text-align: center;
  fill: currentColor;
  vertical-align: middle;
  display: inline-block;
  font-size: 18px;
}

.svg-icon svg {
  width: 1em;
  height: 1em;
}
</style>