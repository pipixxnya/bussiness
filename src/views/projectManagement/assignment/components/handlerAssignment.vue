<!--
 * @Author: zfz
 * @Date: 2022-03-22 11:19:22
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-24 15:36:37
 * @Description: update
-->
<template>
    <el-drawer
      v-model="showHandlerDialog"
      direction="rtl"
      :before-close="handleClose"
      :modal="false"
      custom-class="handler-drawer"
    >
    <template #title>
     <span class="drawer-title">{{computedTitle}}</span>
    </template>
    <el-form ref="setForm" :model="assignmentForm" label-width="110px" :rules="rules">
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="assignmentForm.name" placeholder="请输入任务名称" class="width100"></el-input>
      </el-form-item>
      <el-form-item label="任务类型" prop="type">
        <el-select v-model="assignmentForm.type" placeholder="请选择任务类型" class="width100">
          <el-option
            v-for="item in typeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务所需时间" prop="time">
        <el-input v-model="assignmentForm.time" placeholder="请输入任务所需时间" class="width100"></el-input>
      </el-form-item>
      <el-form-item label="任务计划时间" prop="planTime">
        <el-date-picker
            v-model="assignmentForm.planTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            unlink-panels
            class="width100"
          />
      </el-form-item>
      <el-form-item label="任务参与人员" prop="members">
        <div class="members">
          <div class="add-member">
            <CirclePlus color="#ADAFB8" @click="addMember"></CirclePlus>
          </div>
          <div class="member-list">
            <div class="member-list-item" v-for="item in assignmentForm.members" :key="item.sequence">
              <el-select v-model="item.name" placeholder="人员" class="member-name" :class="membersIsError && item.name === '' ? 'error' : ''">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="item.job" placeholder="职位" class="member-job" :class="membersIsError && item.job === '' ? 'error' : ''">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="menber-days">
                <span>预计消耗人天</span>
                <el-input v-model="item.days" placeholder="人天" :class="membersIsError && item.days === '' ? 'error' : ''"></el-input>
              </div>
              <svg-icon name="delete" v-show="assignmentForm.members.length > 1" @click="removeMember(item.sequence)"></svg-icon>
            </div>
          </div>
        </div>
        <el-collapse-transition>
          <div class="el-form-item__error" v-show="membersIsError">不能为空</div>
        </el-collapse-transition>
      </el-form-item>
      <el-form-item label="任务阶段" prop="process">
        <el-select v-model="assignmentForm.process" placeholder="请选择任务阶段" class="width100">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务优先级" prop="level">
        <SpecialSelect :options="levelOptions" v-model="assignmentForm.level">
          <template v-slot:model="modelScope">
            <LevelCircle :level="modelScope.item"></LevelCircle>
          </template>
          <template v-slot:option="optionScope">
            <LevelCircle :level="optionScope.item.value"></LevelCircle>
          </template>
        </SpecialSelect>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" plain class="search-btn" @click="handleClose">取消</el-button>
      <el-button type="primary" class="search-btn" @click="saveAssignment">确认</el-button>
    </div>
  </el-drawer>
</template>
<script lang='ts' setup>
import { reactive, ref, computed, watch} from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import common from '@/mixins/common';
import LevelCircle from '@/components/levelCircle/index.vue'
import SpecialSelect from '@/components/specialSelect/index.vue'
import assignmentHook from '@/views/projectManagement/assignment/hook/assignmentHook'

const {
  isEdit,
  showHandlerDialog,
} = assignmentHook()
const { levelOptions } = common();

const setForm = ref<any>('')
const assignmentForm = reactive({
  name:'',
  type:'',
  time:'',
  planTime:'',
  members:[
    {name:'',job:'',days:'',sequence:1}
  ],
  process:'',
  level:''
})
const rules = reactive({
  name:[
    {required:true,message:'不能为空',trigger:'blur'},
  ],
  type:[
    {required:true,message:'不能为空',trigger:'change'},
  ],
  time:[
    {required:true,message:'不能为空',trigger:'blur'},
  ],
  members:[
    {required:true,message:'不能为空',trigger:'blur'},
  ],
  planTime:[
    {required:true,message:'不能为空',trigger:'change'},
  ],
  process:[
    {required:true,message:'不能为空',trigger:'change'},
  ],
  level:[
    {required:true,message:'不能为空',trigger:'change'},
  ]
})
const computedTitle = computed(() => {
  return isEdit.value ? '任务编辑' : '任务新增'
})
// 成员判断结果
const membersIsError = ref<boolean>(false)
// 关闭
function handleClose(){
  showHandlerDialog.value = false
}
// 添加一条成员
function addMember(){
  const sequence = assignmentForm.members[assignmentForm.members.length - 1].sequence + 1
  assignmentForm.members.push({name:'',job:'',days:'',sequence})
}
// 去除一条成员
function removeMember(sequence: number){
  assignmentForm.members = assignmentForm.members.filter((val: any) => {
    return val.sequence != sequence
  })
}
// 验证成员填写是否有未填项
function checkMembres(data: any): boolean{
  if(!data || data.length === 0){
    return true
  }
  const hasEmpty = data.find((val: any) => {
    return val.name === '' || val.job === '' || val.days === ''
  })
  return hasEmpty ? true : false
}
// 保存
function saveAssignment(){
  // 验证成员配置是否为空
  membersIsError.value = checkMembres(assignmentForm.members)
  if(membersIsError.value){
    return
  }
  setForm.value.validate((valid: boolean)=>{
    if(valid){
      
    }
  }).catch(() => {})
}
</script>
<script lang='ts'>
export default {
    name:'HandlerAssignment'
}
</script>
<style lang='scss' scoped>
.drawer-title{
  color: #23272a;
  font-size:21px;
  font-weight: 600;
}
.add-member{
  height: 30px;
  width: 100%;
  svg{
    width: 30px;
    height: 100%;
    cursor: pointer;
  }
}
.members{
  @extend .width100;
}
.member-list{
  .member-list-item{
    margin-top: 13px;
    @extend .flexBet;
    height:33px;
    .error{
      :deep(.el-input__inner){
        box-shadow: 0 0 0 1px var(--el-color-danger) inset;
      }
    }
    .member-name{
      width: 20%;
    }
    .member-job{
      width: 31%;
    }
    .menber-days{
      width:34%;
      @extend .flexBet;
      .el-input{
        width: 37%;
      }
    }
    .svg-icon{
      width: 5%;
      height: 100%;
      cursor:pointer;
      @extend .flexVerCenter;
    }
  }
}
.btn-group{
  @include btnGroup
}
</style>