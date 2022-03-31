<!--
 * @Author: zfz
 * @Date: 2022-03-28 14:16:44
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-28 16:31:21
 * @Description: update
-->
<template>
  <div :id='echartsId' class="overSpread" v-if="data.data?.length != 0">
  </div>
  <div v-else class="overSpread noData">暂无数据</div>
</template>
<script lang='ts' setup>
import { reactive,ref,computed,markRaw,watch,nextTick} from 'vue'
import * as echarts from 'echarts';

type EChartsType = echarts.EChartsType;
const props = defineProps({
  data:{
    type:Object,
    default:()=>{}
  }
})
const echartsId = computed(() => {
  return 'echarts' + Math.random() * 10000;
})
const myChart = ref<EChartsType | null>()
function drawChart(){
  const dom = document.getElementById(echartsId.value)
  if(!dom) return
  myChart.value = markRaw(echarts.init(dom));
  const option = {
    tooltip: {
      trigger: 'item',
      formatter:(params: any) => {
        const html = `
          <div class="summary-tooltip">
            <div class="tooltip-title">${params.data.name}</div>
            <div class="tooltip-content">
              <span class="tooltip-circle" style="background:${params.color}"></span>
              <span>投入占比</span>
              <span class="tooltip-value">${params.percent}%</span>
            </div>
          </div> 
        `
        return html
      }
    },
    legend: {
      top: 'center',
      left: '60%',
      orient:'vertical'
    },
    series: [
      {
        name:props.data.title,
        type: 'pie',
        radius: ['50%', '80%'],
        center:['30%','50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          rich:{
            a:{
              color:'#7d848e',
              fontSize:14,
              lineHeight:25
            },
            b:{
              color:'#000',
              fontSize:32
            },
            c:{
              color:'#000',
              fontSize:14
            }
          },
          formatter:() => {
            return '{a|总投入}\n{b|' + props.data.sum + '}{c|' + props.data.unit + '}'
          }
        },
        emphasis: {
          label: {
            show: true,
          }
        },
        labelLine: {
          show: false
        },
        data: props.data.data
      }
    ]
  }
  myChart.value?.setOption(option)
}
watch(() => props.data.data,(newVal) => {
  if(newVal?.length !== 0){
    nextTick(() => {
      drawChart()
    })
  }
},{
  deep:true,
  immediate:true
})
</script>
<script lang='ts'>
export default {
    name:''
}
</script>
<style lang='scss' scoped>
.chart-label-title{
  font-size: 14px;
  color:#7d848e;
  text-align: center;
}
.chart-label-sum{
  font-size: 32px;
}
.chart-label-unit{
  font-size: 14px;
}
.noData{
  @extend .flexCenter;
  color:#7d848e;
  font-size:20px
}

</style>
<style lang="scss">
  .summary-tooltip{
    .tooltip-title{
      color:rgba(0,0,0,.45)
    }
    .tooltip-content{
      .tooltip-circle{
        display:inline-block;
        border-radius:50%;
        width:8px;
        height:8px
      }
      .tooltip-value{
        margin-left:10px;
        font-weight: 600;
      }
    }
  }
</style>