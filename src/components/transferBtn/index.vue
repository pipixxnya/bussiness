<!--
 * @Author: zfz
 * @Date: 2022-03-29 14:53:39
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 15:18:15
 * @Description: update
-->
<template>
     <div class="bread flexVerCenter" :style="`width:${cumputedWidth}`">
        <div class="bread-item flexCenter" v-for="(item,index) in cubeList" :key="item.value">
            <div 
                class="flexCenter cursorP"
                @click="clickBtn(item)" 
                :class="[nowPage == item.value ? 'active' : '',index != cubeList.length - 1 ? 'rigth-cube' : '',index != 0 ? 'left-cube' : '']"
            >
                {{item.label}}
            </div>
            <div class="delta" v-if="index != cubeList.length - 1"></div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { reactive,ref,toRefs,computed ,watch} from 'vue'

const props = defineProps({
  list:{
      type:Array,
      default:()=>[]
  },
  modelValue:{
      type:String || Number,
      default:1
  }
})
const emits = defineEmits(['update:modelValue','change'])
const nowPage = ref<string>('')
const cubeList = ref<Array<any> | []>([])
watch(() => props.list,(newVal) => {
    cubeList.value = newVal
},{deep:true,immediate:true})
function clickBtn(item:any){
    let page = item.value
    if(page == nowPage.value){
        return
    }
    nowPage.value = page
    emits('update:modelValue',page)
    emits('change',item)
}

const cumputedWidth = computed(() => {
  if(cubeList.value.length == 0){
      return '0vw'
  }
  let delta = (cubeList.value.length - 1) * .8
  return cubeList.value.length * 5 + delta + 'vw'
})
watch(() => props.modelValue,(newVal) => {
    nowPage.value = newVal
},{immediate:true})
</script>
<script lang="ts">
export default {
  name:'TransferBtn'
}
</script>
<style lang='scss' scoped>
$btnBlue:#409eff;
.router-btn{
  width:5vw;
  position:relative;
  height: 100%;
}
.router-btn-child{
  position:absolute;
  content:'';
  // border:none
  z-index:2;
  width: .8vw;
  height: 130%;
  background: $btnBlue;
  opacity: 0;
  transform: rotate(-25deg)
}
.active-router{
  background:$btnBlue;
  color:#fff
  // z-index:0
}
.bread{
  height: 3vh;
  font-size: .8vw;
  color: $btnBlue;
  border: 1px solid $btnBlue;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 1.6vw;
  background:#fff;
  cursor: pointer;
  .bread-item{
      @include overSpread
  }
  .rigth-cube{
      @extend .router-btn;
      &::after{
          @extend .router-btn-child;
          right:-.4vw;
          top:-.1vh;
      }
      &.active{
          @extend .active-router;
          &::after{
              opacity: 1
          }
      }
  }
  .delta{
      width:.8vw;
      height:100%;
  }
  .left-cube{
      @extend .router-btn;
      &::before{
          @extend .router-btn-child;
          left:-.4vw;
          top:-.5vh;
      }
      &.active{
           @extend .active-router;
           &::before{
               opacity: 1
           }
      }
  }
}
</style>