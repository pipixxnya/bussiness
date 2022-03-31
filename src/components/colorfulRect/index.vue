<!--
 * @Author: zfz
 * @Date: 2022-03-21 11:01:14
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-25 16:09:19
 * @Description: update
-->
<template>
    <div class="status" :class="computedColor" :style="computedStyle">
      {{computedStatus}}
    </div>
</template>
<script lang='ts' setup>
import { ref, computed } from 'vue'
const props = defineProps({
  value:{
    type:Number || String,
    default:0
  },
  /**
   * value:{label:'显示的文字',color:'颜色class,gray,orange,blue,cyan',style:'自定义样式,例如color:#fff'}
   */
  dictionary:{
    type:Object,
    default:()=>{}
  }
})
const colorfulAndLabel = props.dictionary ? props.dictionary : {
  0:{label:'已关闭',color:'gray'},
  1:{label:'未开始',color:'orange'},
  2:{label:'运行中',color:'blue'},
  3:{label:'已完成',color:'cyan'},
}
const computedColor = computed(() => {
  return colorfulAndLabel[props.value].color ? colorfulAndLabel[props.value].color : ''
})
const computedStatus = computed(() => {
  return colorfulAndLabel[props.value].label
})
const computedStyle = computed(() => {
  return colorfulAndLabel[props.value].style ? colorfulAndLabel[props.value].style : ''
})
</script>
<script lang='ts'>
export default {
    name:'ColorfulRect'
}
</script>
<style lang='scss' scoped>
@mixin statusColor($color,$colorAlpha){
  background-color: $colorAlpha;
  color:$color;
}
.status{
  width: 73px;
  height: 30px;
  border-radius: 4px;
  font-weight: 400;
  @extend .flexCenter;
  &.cyan{
    @include statusColor(#33CDD8, #e5f9f9)
  }
  &.blue{
    @include statusColor(#1283ED, #DBECFC)
  }
  &.orange{
    @include statusColor(#FF9826, #fdebd1)
  }
  &.gray{
    @include statusColor(#7D848E, #A0A0A0)
  }
}
</style>