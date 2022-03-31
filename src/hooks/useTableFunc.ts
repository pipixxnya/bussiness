import { ref, reactive } from 'vue';
import { get,post } from '../request/http';
export default function (state?) {
  // 搜索方法
  function search(url, params) {
    getData(url, params);
  }
  // 清除搜索框
  function clearForm() {
    state && state.searchFormRef.value.resetFields();
  }
  //   表格数据
  let tableData = ref([]);
  //   表格页数
  let pageNum = ref(1);
  //   表格每页数据量
  let pageSize = ref(10);
  //   总数据量
  let tableTotalPage = ref(0);

  //   获取表格数据
  function getData(url, params) {
    post(url, params).then((res: any) => {
      tableData.value = res.data;
      tableTotalPage.value = res.total;
    });
  }

  function handleSizeChange(pageSize) {
    pageSize.value = pageSize;
  }

  function handleCurrentChange(pageNum) {
    pageNum.value = pageNum;
  }

  function handleView() {}
  function handleDelete(rowData) {}
  return {
    handleSizeChange,
    handleCurrentChange,
    getData,
    search,
    clearForm,
    pageSize,
    tableTotalPage,
    pageNum,
    tableData,
    handleView,
    handleDelete,
  };
}
