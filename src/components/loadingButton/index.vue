<!--
 * @Author: zfz
 * @Date: 2022-02-10 10:45:39
 * @LastEditors: zfz
 * @LastEditTime: 2022-02-10 11:01:44
 * @Description: update
-->
<template>
    <el-button :type="type" @click="clickButton" :size="size">
        <slot></slot>
    </el-button>
</template>
<script lang='ts' setup>
const props = defineProps({
    type:{
        type:String,
        default:'primary'
    },
    size:{
        type:String,
        default:'small'
    }
})
const emit = defineEmits(['click'])
function clickButton(){
    emit('click','')
}
</script>
<script lang='ts'>
export default {
    name:''
}
</script>
<style lang='scss' scoped>
</style>