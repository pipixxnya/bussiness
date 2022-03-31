<template>
  <div>
    <div>
      <el-row>
        <el-col :span="24">
        <div style="text-align: right; margin-bottom: 10px; margin-right: 20px">
          <el-button type="primary" @click="showAdd" >新增</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" strip style="width: 100%">
        <el-table-column prop="name" label="任务类型名称"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <svg-icon name="edit" @click="showEdit(scope.row)"></svg-icon>
            <svg-icon name="delete" @click="deleteList(scope.row)"></svg-icon>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogShow" :title="flag == 1 ? '新增' : '编辑'" width="30%" center @close="cancel">
      <el-form :model="stateForm" :rules="rules" ref="stateFormDialog" class="stateForm" label-width="180px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务类型管理" prop="name">
              <el-input placeholder="请输入" v-model="stateForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button v-if="flag == 1" size="small" type="primary" @click="confirmAdd">确定</el-button>
          <el-button v-else size="small" type="primary" @click="confirmEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
// import { ElMessageBox } from 'element-plus';
let dialogShow = ref(false);
let stateFormDialog = ref();
let tableData = reactive([{name:"qwe"}]);
let stateForm = reactive({name:""})
let flag = ref(1);
const rules = reactive({
    name: [{ required: true, message: '请输入任务类型', trigger: 'blur' },],
})
//新增
function showAdd(){
    flag.value = 1;
dialogShow.value = true;
}
//新增提交
function confirmAdd(){
  dialogShow.value = false;
}
//编辑
function showEdit(row) {
    flag.value = 2;
  dialogShow.value = true;
}
//编辑提交
function confirmEdit(){
dialogShow.value = false;
}
//取消
function cancel(){
    dialogShow.value = false;
    stateFormDialog.value.resetFields();
}
//删除
function deleteList(row) {}
</script>

<style lang="scss" scoped></style>
