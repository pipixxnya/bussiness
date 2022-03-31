<template>
  <div>
    <div class="title"><h3>项目信息</h3></div>
    <div>
      <el-row>
        <el-col :span="4">
          <div>
            <el-input v-model.trim="searchForm.name" clearable placeholder="项目名称"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-input v-model.trim="searchForm.type" clearable placeholder="项目类型"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-button @click="search" type="primary" class="search-btn">查询</el-button>
            <el-button @click="clear" class="search-btn">清除</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="text-align: right; margin-bottom: 10px; margin-right: 20px">
            <el-button @click="showAdd">新增</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" style="width=100%">
        <el-table-column prop="name" label="合同名称"></el-table-column>
        <el-table-column prop="proName" label="项目名称"></el-table-column>
        <el-table-column prop="member" label="负责人"></el-table-column>
        <el-table-column prop="type" label="项目类型"></el-table-column>
        <el-table-column prop="time" label="项目时间"></el-table-column>
        <el-table-column prop="status" label="项目状态"></el-table-column>
        <el-table-column prop="timeTotal" label="项目总工时(h)"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <svg-icon name="edit" @click="showEditDialog(scope.row)"></svg-icon>
            <svg-icon name="delete" @click="deleteData(scope.row)"></svg-icon>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogShow" :title="flag == 1 ? '新增' : '编辑'" width="30%" center @close="cancel">
      <el-form class="stateForm" :model="stateForm" :rules="rules" ref="stateFormDialog" label-width="150px">
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="stateForm.proName"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="">
          <el-select style="width: 423px" clearable v-model="stateForm.roleId">
            <el-option v-for="item in characterArray" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目类型" prop="">
          <el-select style="width: 423px" clearable v-model="stateForm.roleId">
            <el-option v-for="item in characterArray" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目金额" prop="momeny">
          <el-input v-model="stateForm.momeny"></el-input>
        </el-form-item>
        <el-form-item label="项目技术负责人" prop="">
          <el-select style="width: 423px" clearable v-model="stateForm.roleId">
            <el-option v-for="item in characterArray" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目团队成员" prop="">
            <el-button @click="addMember" circle >+</el-button>
        </el-form-item>
        <el-form-item label="项目所属合同" prop="">
          <el-select style="width: 423px" clearable v-model="stateForm.roleId">
            <el-option v-for="item in characterArray" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目起止日期" prop="">
          <el-date-picker v-model="dayValue" type="daterange" range-separator="至" start-placeholder="Start date" end-placeholder="End date" />
        </el-form-item>
        <el-form-item label="项目颜色" prop="">
            <el-color-picker v-model="color" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
let dialogShow = ref(false);
let stateFormDialog = ref<any>();
const color = ref("");
const dayValue = ref("");
const rules = reactive({
  name: [{ required: true, message: '请输入', trigger: 'blur' }],
  price: [{ required: true, message: '请输入', trigger: 'blur' }],
});
const characterArray = reactive([{ id: '1', roleName: 'qwe' }]);
const searchForm = reactive<any>({ name: '', type: '' });
const tableData = ref<Array<any>>([{ name: 'asd', proName: 'qwe', member: '22', type: '开发', time: '2022-01-01', status: '已验收', timeTotal: '788' }]);
const stateForm = reactive({});
//查询
function search() {}
//重置
function clear() {
  searchForm.name = '';
  searchForm.type = '';
}
//新增
function showAdd() {
  dialogShow.value = true;
}
//编辑
function showEditDialog(row) {
  dialogShow.value = true;
}
//删除
function deleteData(row) {}
//取消按钮
function cancel() {
  dialogShow.value = false;
  stateFormDialog.value.resetFields();
}
</script>

<style lang="scss" scoped></style>
