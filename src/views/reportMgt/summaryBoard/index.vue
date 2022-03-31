<!--
 * @Author: zfz
 * @Date: 2022-03-28 14:16:29
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 16:06:10
 * @Description: update
-->
<template>
    <div id='summaryBoard'>
      <div class="search-form-board">
        <div class="search-form-item">
          <el-select v-model="timeType" placeholder="时间类型">
            <el-option
              v-for="item in timeTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
          <el-button type="primary" class="search-btn">
            <template #icon>
              <svg-icon name="search"></svg-icon>  
            </template>
            查询
          </el-button>
        </div>
        <TransferBtn v-model="nowPage" :list="pageList"></TransferBtn>
      </div>
      <!-- 饼图 -->
      <div class="charts">
        <transition-group  name="slide-fade" mode="out-in">
          <div class="pie-charts" v-if="nowPage === 1" key="pie">
            <div class="pie-charts-item" v-for="item in pieChartsList" :key="item.title">
              <div class="pie-charts-item-title">
                {{item.title}}
              </div>
              <div class="pie-charts-item-content">
                <PieChart :data="item"></PieChart>
              </div>
            </div>
          </div>
          <!-- 柱图 -->
          <div class="bar-charts" v-if="nowPage === 2" key="bar">
            <BarChart :data="barChartList"></BarChart>
          </div>
        </transition-group>
      </div>
    </div>
</template>
<script lang='ts' setup>
import { reactive,ref,toRefs} from 'vue'
import PieChart from '@/views/reportMgt/summaryBoard/components/pieChart.vue'
import BarChart from '@/views/reportMgt/summaryBoard/components/barChart.vue'
import TransferBtn from '@/components/transferBtn/index.vue'
import { valueLabel } from '@/interface/common'
import dayjs from 'dayjs'

const pageList = ref<Array<valueLabel>>([
  {value:1,label:'饼图'},
  {value:2,label:'柱状图'},
])
const nowPage = ref<number>(1)
const timeType = ref<number | string>('')
const timeRange = ref<Array<string> | []>([])
const timeTypeList = ref<Array<valueLabel>>([
  {value:'',label:'本年'},
  {value:'',label:'去年'},
  {value:'',label:'本季度'},
  {value:'',label:'上季度'},
  {value:'',label:'本月'},
  {value:'',label:'上月'},
  {value:'',label:'具体时间'},
])
const pieChartsList = ref<Array<{title:string,data: Array<{value: number, name: string}>,unit: string,sum:number}>>([
  {title:'各类项目成本投入占比',data:[
    {value:10,name:'客户交付项目'},
    {value:5,name:'产品研发项目'},
    {value:5,name:'管理工具项目'},
  ],unit:'万元',sum:20},
  {title:'任务类型成本投入占比',data:[
    {value:10,name:'后端开发'},
    {value:5,name:'前端开发'},
    {value:5,name:'UI设计'},
    {value:5,name:'测试'},
    {value:5,name:'实施'},
  ],unit:'万元',sum:30},
  {title:'各类项目投入人天',data:[
    {value:100,name:'客户交付项目'},
    {value:50,name:'产品研发项目'},
    {value:50,name:'管理工具项目'},
  ],unit:'人天',sum:200},
  {title:'任务类型投入人天',data:[
    {value:9,name:'后端开发'},
    {value:5,name:'前端开发'},
    {value:2,name:'UI设计'},
    {value:6,name:'测试'},
    {value:3,name:'实施'},
  ],unit:'人天',sum:25},
])
const barChartList = ref<any>({dayTime:[],cost:[],x:[]})
barChartList.value= new Array(7).fill({}).reduce((pre: any, val: any,index: number) => {
  pre.cost = [...pre.cost,['项目' + index,Math.ceil(Math.random() * 1000)]]
  pre.dayTime = [...pre.dayTime,['项目' + index,Math.ceil(Math.random() * 100)]]
  pre.x = [...pre.x,'项目' + index]
  return pre
},barChartList.value)
</script>
<script lang='ts'>
export default {
    name:'SummaryBoard'
}
</script>
<style lang='scss' scoped>
#summaryBoard{
  @include overSpread;
  @include flex;
  flex-direction: column;
  justify-content: space-between;
}
.search-form-board{
  height:8%;
  background:#fff;
  @extend .flexVerCenter;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 10px;
  :deep(.el-date-editor),.el-button{
    margin-left:20px
  }
  .search-form-item{
    @extend .flexVerCenter;
  }
}
.charts{
  height:91%;
  position:relative
}
.pie-charts{
  height:100%;
  @include flex;
  flex-wrap:wrap;
  justify-content: space-between;
  .pie-charts-item{
    width:49.4%;
    height:47%;
    background:#fff;
    border-radius: 10px;
    .pie-charts-item-title{
      height:15%;
      padding-left: 20px;
      font-size: 18px;
      font-weight: 600;
      text-align: left;
      color: rgba(0,0,0,0.85);
      @extend .flexVerCenter
    }
    .pie-charts-item-content{
      height:85%;
    }
  }
}
.bar-charts{
  height:100%;
  background:#fff;
}
.slide-fade-leave-active{
  position:absolute;
}
</style>