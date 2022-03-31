<!--
 * @Author: zfz
 * @Date: 2022-03-25 09:31:55
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-29 14:50:23
 * @Description: update
-->
<template>
    <div id='myBoard'>
      <!-- 左上角 -->
      <div class="notice-work">
        <div class="notice">
          <div class="notice-info">
            <svg-icon name="notice"></svg-icon>
            <span>{{notice}}</span>
          </div>
          <svg-icon name="close-circle"></svg-icon>
        </div>
        <div class="work">
          <div class="h3-title">本周工作</div>
          <!-- 标题 -->
          <div class="work-div-title">
            <div 
              class="work-this-week-title" 
              :class="[thisWeek.length === 8 ? 'eight-days' : '',showLastSunday ? 'lastSunday' : '']"
            >
              <div class="title-item" v-for="item in thisWeek" :key="item.week">
                <div class="date">{{item.week}}</div>
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="work-div" @mouseover="enterWeeksIn" @mouseleave="leaveWeeksOut">
            <div 
              class="work-this-week" 
              :class="[thisWeek.length === 8 ? 'eight-days' : '',showLastSunday ? 'lastSunday' : '']"
            >
              <div class="work-item" v-for="item in thisWeek" :key="item.week" :class="activedWeek === item.sequence ? 'actived' : ''">
                <div class="work-info" @click="clickWeek(item)">
                  <div v-for="project in item.projects" :key="item.id" class="project-item" :style="computedProjectItemColorAlpha(project)">
                    <div class="small-circle" :style="computedProjectItemColor(project)"></div>
                    <span>{{project.name}}</span>
                  </div>
                </div>
              </div>
              <div class="active-day" :style="computedTransform">
                <svg-icon name="workThisWeek"></svg-icon>
              </div>
            </div>
            <div class="arrow left" v-show="computedArrowShow('left')" @click="showLastSunday = true">
              <ArrowLeft></ArrowLeft>
            </div>
            <div class="arrow right" v-show="computedArrowShow('right')" @click="showLastSunday = false">
              <ArrowRight></ArrowRight>
            </div>
          </div>
        </div>
      </div>
      <!-- 右上角 -->
      <div class="user">
        <div class="user-info">
          <UserInfo></UserInfo>
        </div>
        <div class="user-plan">
          <div class="h3-title">本周工作</div>
            <el-table
              :data="tableDataForThisWeek"
              stripe
              style="width: 100%;"
              :header-cell-style="{background: '#e6f1ff'}"
              height="calc(100% - 85px)"
              :scrollbar-always-on="true"
            >
              <el-table-column
                v-for="item in thisWeekTableArr"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width"
                :show-overflow-tooltip="item.needTooltip"
                >
                <template #default="scope">
                  <div v-if="item.prop === 'level'" class="flexCenter">
                    <LevelCircle :level="scope.row.level"></LevelCircle>
                  </div>
                  <span :class="item.prop === 'time' ? 'flexCenter' : ''" v-else>{{scope.row[item.prop]}}</span>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
      <!-- 下方 -->
      <div class="report">
        <DayReport></DayReport>
      </div>
    </div>
</template>
<script lang='ts' setup>
import { reactive, ref, computed, onMounted} from 'vue'
import UserInfo from '@/components/layout/header/components/userInfo.vue'
import LevelCircle from '@/components/levelCircle/index.vue'
import DayReport from '@/views/myBoard/components/dayReport.vue'
import { tableArrItem } from '@/interface/common'
import myBoardHook from '@/views/myBoard/hook/myBoardHook'
import { toRGBA } from '@/util/CommonUtils'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const { getWriteReportList } = myBoardHook();
const notice = ref<string>('欢迎使用公司内部日报信息管理平台。如果你在使用的过程中还有任何的疑问,欢迎提出宝贵的意见')
const enterWeeks = ref<boolean>(false)
const showLastSunday = ref<boolean>(false)
// 计算是否显示箭头
const computedArrowShow = computed(() => {
  return (type: string) => {
    const showSunday = (type === 'left' && showLastSunday.value === false) || 
                        (type === 'right' && showLastSunday.value === true) ? true : false
    return thisWeek.value.length === 8 && enterWeeks.value && showSunday ? true : false
  }
})
const weekDays = {
  1:'周一',
  2:'周二',
  3:'周三',
  4:'周四',
  5:'周五',
  6:'周六',
  7:'周日',
}
// 选中的日期
const activedWeek = ref<number>(-1)
const thisWeek = ref<Array<{week: string,projects?: any,sequence: number}> | []>([])
// 表格显示字段
const thisWeekTableArr = ref<Array<tableArrItem>>([
  {prop:'projectName',label:'项目',width:100,needTooltip:true},
  {prop:'level',label:'优先级',width:70},
  {prop:'assignment',label:'任务',width:90,needTooltip:true},
  {prop:'time',label:'预计人天',width:80},
])
// 计算箭头的位置
const computedTransform = computed(() => {
  return `transform:translateX(${100 * activedWeek.value}%);`
})
// 计算每日任务颜色
const computedProjectItemColor = computed(() => {
  return (item: any) => {
    return `background:${item.color ? item.color : '#409eff'}`
  }
})
const computedProjectItemColorAlpha = computed(() => {
  return (item: any) => {
    return `background:${toRGBA(item.color ? item.color : '#409eff')}`
  }
})
// 表格数据
const tableDataForThisWeek = ref<Array<any>>([
  {projectName:'AOS史密斯',level:1,assignment:'运维优化',time:1},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
  {projectName:'日报信息处理系统',level:3,assignment:'开发',time:10},
])
// 格式化日期月份
function transferDate(date: Date){
  const month = String(date.getMonth()).length == 1 ? '0' + (date.getMonth()+1) : String((date.getMonth()+1))
  const day = String(date.getDate()).length == 1 ? '0' + date.getDate() : String(date.getDate())
  return {month, day}
}
// 获取本周日期与每日任务
function getWeeks() {
  const today = new Date();
  const todayForWeek = today.getDay() === 0 ? 7 : today.getDay();
  let array = new Array(7).fill({}).map((val: any,index: any) => {
    let interval = todayForWeek - (index + 1);
    const week = new Date(today.getTime() - (interval * 24 * 60 * 60 * 1000))
    let date = transferDate(week);
    return {
      week:`${date.month}/${date.day} ${weekDays[index + 1]}`,
      sequence:index,
      projects:[
        {id:1,name:'AOS史密斯运维',color:'#9246DB'},
        {id:2,name:'日报信息处理系统'},
      ]
    }
  });
  // 礼拜一的时候前面加上上个礼拜天
  if(todayForWeek === 1){
    const week = new Date(today.getTime() - (24 * 60 * 60 * 1000))
    let date = transferDate(week);
    array.unshift({
      week:`${date.month}/${date.day} 周日`,
      sequence:-1,
      projects:[
        {id:1,name:'AOS史密斯运维',color:'#9246DB'},
        {id:2,name:'日报信息处理系统'},
      ]
    })
    array = array.map((val: any,index: number) => {
      const newVal = val
      newVal.sequence = index
      return newVal
    })
  }
  thisWeek.value = array
  activedWeek.value = todayForWeek === 1 ? todayForWeek : todayForWeek - 1
}
// 点击一周任务
function clickWeek(item: any){
  activedWeek.value = item.sequence
  getWriteReportList()
}
// 鼠标进入移出当周工作
function enterWeeksIn(){
  enterWeeks.value = true
}
function leaveWeeksOut(){
  enterWeeks.value = false
}
onMounted(() => {
  getWeeks()
})
</script>
<script lang='ts'>
export default {
    name:'MyBoard'
}
</script>
<style lang='scss' scoped>
$workBorder:1px solid #d3d5d8;
:deep(.svg-icon){
  font-size:16px;
}
.h3-title{
  font-size: 18px;
  font-weight:bold;
  color:#393939;
  height:65px;
  @extend .flexVerCenter;
}
@mixin work-item($width:14.3%){
  width:$width
}
@mixin eightDays{
  width: 114.2%;
  transform: translateX(-12.5%);
  &.lastSunday{
    transform: translateX(0);
  }
}
.notice-work{
  grid-area: a;
  @include flex;
  flex-direction: column;
  justify-content: space-between;
  .notice{
    height:9%;
    width:100%;
    background: #f4f9ff;
    border: 1px solid rgba(39,133,255,0.35);
    border-radius: 10px;
    @extend .flexVerCenter;
    justify-content: space-between;
    padding: 0 20px;
    .notice-info{
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #7d848e;
    }
    :deep(.svg-icon){
      margin-right: 8px;
      margin-bottom: 2px
    }
  }
  .work{
    height:87%;
    width:100%;
    background: #ffffff;
    border-radius: 10px;
    padding: 0 20px 20px;
    .work-div{
      height:calc(100% - 85px);
      width:100%;
      overflow: hidden;
      position: relative;
    }
    .work-div-title{
      height:9%;
      width:100%;
      overflow: hidden;
      background: #f6f9fb;
      border: 1px solid #d3d5d8;
      border-bottom:none;
      border-radius: 10px 10px 0px 0px;
    }
    .work-this-week-title{
      @include flex;
      width:100%;
      height:100%;
      transition: transform 0.2s linear;
      .title-item{
        @include work-item;
        height:100%;
        .date{
          height:100%;
          @extend .flexCenter;
        }
      }
      &.eight-days{
        @include eightDays;
        .title-item{
          @include work-item(12.5%)
        }
      }
    }
    .work-this-week{
      @include flex;
      height:calc(100% - 20px);
      position:relative;
      transition: transform 0.2s linear;
      .work-item{
        @include work-item;
        .work-info{
          height:100%;
          background:#fff;
          border:$workBorder;
          border-right:none;
          @extend .flexVerCenter;
          flex-direction: column;
          padding:20px 0;
          .project-item{
            width:90%;
            border-radius: 100px;
            margin-bottom:20px;
            padding:10px 0 10px 10px;
            @extend .flexVerCenter;
            font-size:12px;
            .small-circle{
              @include overSpread(10px);
              margin-right:5px;
              border-radius:50%;
            }
          }
        }
        &:first-child{
          .date{
            border-top-left-radius:10px;
            border-left:$workBorder
          }
          .work-info{
            border-bottom-left-radius:10px
          }
        }
        &:nth-last-child(2){
          .work-info{
            border-right:$workBorder;
            border-bottom-right-radius:10px
          }
        }
        &.actived{
          .work-info{
            border:1px solid #2785FF;
          }
        }
      }
      .active-day{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        @include work-item;
        height: 104.2%;
        :deep(.svg-icon){
          @include overSpread;
          @extend .flexHorCenter;
          align-items: flex-end;
          transform: translateY(-1px);
          svg{
            width:16%;
          }
        }
      }
      &.eight-days{
        @include eightDays;
        .work-item{
          @include work-item(12.5%)
        }
        .active-day{
          @include work-item(12.5%)
        }
      }
    }
    .arrow{
        width: 100px;
        position: absolute;
        top: 50%;
        color: #ccc;
        transform: translateY(-50%);
        z-index:150;
        cursor: pointer;
        &.left{
          left: 0;
        }
        &.right{
          right:0
        }
      }
  }
}
.user{
  grid-area: b;
  .user-info{
    width:100%;
    height:15.7%;
    background-image:url('/home/userBack.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
    @extend .flexCenter;
  }
  .user-plan{
    height:84.3%;
    background: #ffffff;
    border-radius: 10px;
    padding: 0 20px;
  }
}
.report{
  grid-area: c;
  background: #ffffff;
  border-radius: 10px;
  padding:20px;
}
#myBoard{
  @include overSpread;
  display:grid;
  grid-template-columns: 24% 24.2% 25% 23%;
  grid-template-rows: repeat(5,18%);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-areas:
  "a a a b"
  "a a a b"
  "a a a b"
  "c c c c"
  "c c c c";
  padding: 20px 0;
}
</style>
<style lang="scss">
  #myBoard{
    .el-table{
      --el-table-border-color:transparent;
      border-radius: 10px;
      .el-table__header{
        height:44px;
      }
      .el-table__row{
        height:44px;
      }
    }
  }
</style>