<!--
 * @Author: zfz
 * @Date: 2022-03-22 11:19:22
 * @LastEditors: zfz
 * @LastEditTime: 2022-03-28 13:54:08
 * @Description: 变更审批
-->
<template>
    <el-drawer
      v-model="showApproveDialog"
      direction="rtl"
      :before-close="handleClose"
      :modal="false"
      custom-class="handler-drawer"
      size="40%"
    >
    <template #title>
     <span class="drawer-title">变更审核</span>
    </template>
    <el-form ref="modifyApproveSetForm" :model="modifyApproveForm" label-width="150px" :rules="rules">
      <el-form-item label="变更名称" prop="modifyName">
        <el-input v-model="modifyApproveForm.modifyName" placeholder="请输入变更名称" class="width100"></el-input>
      </el-form-item>
      <el-form-item label="项目预估人天" prop="projectDayTime">
       <el-input v-model="modifyApproveForm.projectDayTime" placeholder="请输入项目预估人天" class="width100"></el-input>
      </el-form-item>
      <el-form-item label="技术预估人天" prop="technDayTime">
        <el-input v-model="modifyApproveForm.technDayTime" placeholder="请输入技术预估人天" class="width100"></el-input>
      </el-form-item>
       <el-form-item label="变更类型" prop="modifyType">
        <el-select v-model="modifyApproveForm.modifyType" placeholder="请选择变更类型" class="width100">
          <el-option
            v-for="item in modifyTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批人" prop="initiator">
        <el-select v-model="modifyApproveForm.initiator" placeholder="请选择审批人" class="width100">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="变更任务与参与人员" prop="members">
        <div class="members">
          <div class="add-member">
            <CirclePlus color="#ADAFB8" @click="addMember"></CirclePlus>
          </div>
          <div class="member-list">
            <div class="member-list-item" v-for="item in modifyApproveForm.members" :key="item.sequence">
              <el-select v-model="item.department" placeholder="部门" class="member-department" :class="membersIsError && item.department === '' ? 'error' : ''">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
                <span>预计消耗时长</span>
                <el-input v-model="item.days" placeholder="时长" :class="membersIsError && item.days === '' ? 'error' : ''"></el-input>
              </div>
              <svg-icon name="delete" v-show="modifyApproveForm.members.length > 1" @click="removeMember(item.sequence)"></svg-icon>
            </div>
          </div>
        </div>
        <el-collapse-transition>
          <div class="el-form-item__error" v-show="membersIsError">不能为空</div>
        </el-collapse-transition>
      </el-form-item>
      <el-form-item label="变更状态" prop="modifyStatus">
        <el-select v-model="modifyApproveForm.modifyStatus" placeholder="请选择变更类型" class="width100">
          <el-option
            v-for="item in modifyStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="变更原因及内容" prop="modifyContent">
        <el-input v-model="modifyApproveForm.modifyContent" type="textarea" placeholder="" :rows="5"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" plain class="search-btn" @click="handleClose">取消</el-button>
      <el-button type="primary" class="search-btn" @click="saveApproveModify">确认</el-button>
    </div>
  </el-drawer>
</template>
<script lang='ts' setup>
import { reactive, ref, computed, watch} from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import common from '@/mixins/common';
import LevelCircle from '@/components/levelCircle/index.vue'
import SpecialSelect from '@/components/specialSelect/index.vue'
import modifyMgtHook from '@/views/projectManagement/modifyMgt/hook/modifyMgtHook'

const {
  showApproveDialog,
} = modifyMgtHook()
const { modifyTypeList, modifyStatusList } = common();

const modifyApproveSetForm = ref<any>('')
let modifyApproveForm = reactive({
  modifyName:'',
  modifyType:'',
  initiator:'',
  projectDayTime:'',
  technDayTime:'',
  modifyContent:'',
  modifyStatus:'',
  members:[{department:'', name:'', job:'', days:'', sequence:0}]
})
const rules = reactive({
  modifyName:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  modifyType:[
    {required:true,message:'不能为空',trigger:'change'}
  ],
  initiator:[
    {required:true,message:'不能为空',trigger:'change'}
  ],
  projectDayTime:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  modifyContent:[
    {required:true,message:'不能为空',trigger:'blur'}
  ],
  modifyStatus:[
    {required:true,message:'不能为空',trigger:'change'}
  ]
})
// 成员判断结果
const membersIsError = ref<boolean>(false)
// 关闭
function handleClose(){
  showApproveDialog.value = false
}
// 添加一条成员
function addMember(){
  const sequence = modifyApproveForm.members[modifyApproveForm.members.length - 1].sequence + 1
  modifyApproveForm.members.push({department:'',name:'',job:'',days:'',sequence})
}
// 去除一条成员
function removeMember(sequence: number){
  modifyApproveForm.members = modifyApproveForm.members.filter((val: any) => {
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
function saveApproveModify(){
  // 验证成员配置是否为空
  membersIsError.value = checkMembres(modifyApproveForm.members)
  if(membersIsError.value){
    return
  }
  modifyApproveSetForm.value.validate((valid: boolean)=>{
    if(valid){
      
    }
  }).catch(() => {})
}
</script>
<script lang='ts'>
export default {
    name:'ApproveModifyDialog'
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
    .member-department{
      width:23%;
    }
    .member-name{
      width: 15%;
    }
    .member-job{
      width: 23%;
    }
    .menber-days{
      width:28%;
      @extend .flexBet;
      .el-input{
        width: 45%;
      }
    }
    .svg-icon{
      width: 3%;
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