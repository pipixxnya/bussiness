<!--
 * @Author: zfz
 * @Date: 2022-03-21 10:57:00
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-22 15:53:04
 * @Description: update
-->
<template>
    <div class="circle" :class="computedColor">
      <span>{{level}}</span>
    </div>
</template>
<script lang='ts' setup>
import { ref, computed } from 'vue'
const props = defineProps({
  level:{
    type:Number || String,
    default:4
  }
})
const colorObj = {
  1:'red',
  2:'yellow',
  3:'blue',
  4:'gray'
}
// 颜色
const computedColor = computed(() => {
  return colorObj[props.level] || 'visible'
})
</script>
<script lang='ts'>
export default {
    name:'LevelCircle'
}
</script>
<style lang='scss' scoped>
@mixin circleColor($color,$colorAlpha){
  border-color:$color;
  color:$color;
  background-color: $colorAlpha;
}
.circle{
  @extend .flexCenter;
  border-radius:50%;
  width:18px;
  height:18px;
  border:1px solid;
  &.red{
    @include circleColor(#FB3939,rgba(248,63,63,0.30))
  }
  &.yellow{
    @include circleColor(#fb9128,rgba(251,145,40,0.27))
  }
  &.blue{
    @include circleColor(#289ffb,rgba(40,159,251,0.23))
  }
  &.gray{
    @include circleColor(#9fa3a6,rgba(168,168,168,0.23))
  }
  &.visible{
    @include circleColor(transparent,transparent)
  }
}
</style>