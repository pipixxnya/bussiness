<!--
 * @Author: zfz
 * @Date: 2022-03-28 14:16:44
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 16:33:51
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
      trigger: 'axis',
      axisPointer:{
        lineStyle:{
          width:100,
          color:'rgba(246,249,254)',
          type:'solid',
          shadowColor:'#409eff',
          shadowBlur:2,
        },
        z:0,
      },
      formatter:(params: any) => {
        const html = `
          <div class="summary-tooltip">
            <div class="tooltip-title">${params[0].name}</div>
            <div class="tooltip-content">
              <span class="tooltip-circle" style="background:${params[0].borderColor}"></span>
              <span>${params[0].seriesName}</span>
              <span class="tooltip-value">${params[0].value[1]}万元</span>
            </div>
            <div class="tooltip-content">
              <span class="tooltip-circle" style="background:${params[1].borderColor}"></span>
              <span>${params[1].seriesName}</span>
              <span class="tooltip-value">${params[1].value[1]}人天</span>
            </div>
          </div> 
        `
        return html
      }
    },
    xAxis:{
      type: 'category',
      data:props.data.x
    },
    yAxis:[
      {
        type: 'value',
        name: '单位：万元',
        position: 'left',
        axisTick:{
          show:true
        },
        axisLine:{
          show:true
        },
        axisLabel:{
          show:true
        }
      },
      {
        type: 'value',
        name: '单位：人天',
        position: 'right',
        axisTick:{
          show:true
        },
        axisLine:{
          show:true
        },
        axisLabel:{
          show:true
        }
      },
    ],
    series: [
      {
        name:'投入成本',
        type:'bar',
        data: props.data.cost,
        yAxisIndex:0,
        itemStyle:{
          color:'#A2CCFC',
          borderColor:'#076BED',
          borderWidth:1,
          borderRadius:[5,5,0,0],
        },
        barWidth:32,
        z:10
      },
      {
        name:'投入人天',
        type:'bar',
        data: props.data.dayTime,
        yAxisIndex:1,
        itemStyle:{
          color:'#FCD2C5',
          borderColor:'#FC733D',
          borderWidth:1,
          borderRadius:[4,4,0,0],
        },
        barWidth:32,
        z:10
      },
    ]
  }
  myChart.value?.setOption(option)
}
watch(() => props.data,(newVal) => {
  console.log(newVal)
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