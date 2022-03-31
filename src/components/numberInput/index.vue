<!--
 * @Author: zfz
 * @Date: 2022-03-28 09:49:19
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-28 10:19:10
 * @Description: update
-->
<template>
  <div class="el-input-number-self">
    <el-input v-model="num" type="number" :placeholder="placeholder" :max="max" :min="min" :step="step" @input="returnBackValue">
      <slot name="append"></slot>
      <slot name="prepend"></slot>
    </el-input>
    <div class="arrow" v-show="showArrow">
      <span class="arrow-item top" @click="changeNum('top')">
        <el-icon>
          <CaretTop />
        </el-icon>
      </span>
      <span class="arrow-item bottom" @click="changeNum('bottom')">
        <el-icon>
          <CaretBottom />
        </el-icon>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { CaretTop, CaretBottom } from '@element-plus/icons-vue';

const props = defineProps({
  modelValue: {
    type: Number || String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
  showArrow:{
    type:Boolean,
    default:false
  }
});
watch(
  () => props.modelValue,
  (newVal) => {
    num.value = newVal;
  }
);
const emit = defineEmits(['update:modelValue', 'change']);
const num = ref<number | string>(props.modelValue);
function returnBackValue(val: number) {
  const rightNum = isInRang(val);
  if (!rightNum.state) {
    num.value = rightNum.type === 'max' ? props.max : props.min;
  }
  emit('update:modelValue', Number(num.value));
  emit('change', Number(num.value));
}
function changeNum(type: string) {
  const stepList = String(props.step).split('.');
  const stringStep = String(stepList[1]);
  const ratio = stepList[1] ? 10 ** stringStep.length : 1;
  let newNum: number = type === 'top' ? (Number(num.value) * ratio + props.step * ratio) / ratio : (Number(num.value) * ratio - props.step * ratio) / ratio;
  newNum = Number(newNum.toFixed(stringStep.length));
  const rightNum = isInRang(newNum);
  if (!rightNum.state) {
    return;
  }
  num.value = newNum;
  emit('update:modelValue', Number(num.value));
  emit('change', Number(num.value));
}
function isInRang(num: number) {
  if (!['', 'undefined', 'null'].includes(String(props.max)) && num > props.max) {
    return { state: false, type: 'max' };
  }
  if (!['', 'undefined', 'null'].includes(String(props.min)) && num < props.min) {
    return { state: false, type: 'min' };
  }
  return { state: true };
}
</script>
<script lang="ts">
export default {
  name: 'ElInputNumber',
};
</script>
<style lang="scss" scoped>
.el-input-number-self {
  position: relative;
  @include overSpread;
  .el-input {
    height: 100%;
  }
}
// :deep(.el-input__inner) {
//   @include blackInput;
//   height: 100%;
// }
.arrow {
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
</style>
