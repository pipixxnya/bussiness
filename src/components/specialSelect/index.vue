<!--
 * @Author: zfz
 * @Date: 2022-03-22 15:22:19
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-22 16:09:07
 * @Description: 特殊的选择框，用于显示特殊样式的值
-->
<template>
  <div style="poistion:relative" class="overSpread">
    <div class="select-model el-input" @click="showOptions">
      <slot name="model" :item="selectModel"></slot>
    </div>
    <el-select v-model="selectModel" placeholder="" ref="specialSelect" class="ori-select" @change="changeModel">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <slot name="option" :item="item"></slot>
      </el-option>
    </el-select>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
const props = defineProps({
  options:{
    type:Array,
    default:()=>[]
  },
  modelValue:{
    type:Number,
    default:0
  }
})
const emits = defineEmits(['update:modelValue'])
const specialSelect = ref<any>('')
const selectModel = ref<any>(props.modelValue)
function showOptions(){
  specialSelect.value.focus()
}
function changeModel(val:number){
  emits('update:modelValue',val)
}
</script>
<script lang='ts'>
export default {
    name:'SpecialSelect'
}
</script>
<style lang='scss' scoped>
.select-model{
  @extend .flexVerCenter;
  width:100%;
  border:1px solid #dcdfe6;
  border-radius:4px;
  padding:0 11px;
  cursor:pointer;
}
.ori-select{
  position:absolute;
  width:100%;
  top:0;
  :deep(.el-input__inner){
    opacity:0;
  }
}
</style>