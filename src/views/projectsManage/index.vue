<template>
  <section>
    <header>{{$route.meta.title}}</header>
    <el-row :gutter="20" class="seatchBox">
      <el-col :span="12">
        <el-form :inline="true" :model="searchBean" ref="bannerForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="searchBean.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="searchBean.state">
              <el-option label="全部" value></el-option>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" :offset="6" class="text-right">
        <el-button type="primary" @click="addProject">新增</el-button>
        <el-button type="primary" @click="advancedSearch">查询</el-button>
        <el-button type="primary" @click="resetSearchBean('bannerForm')">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <pagination-table
        :tableConfig="tableConfig"
        :tableLoading="tableLoading"
        @handlePageChange="handlePageChange"
        @handleOperation="handleOperation"
      ></pagination-table>
      <form-dialog
        :dialog-config="dialogConfig"
        :originData="formData"
        :loading="loading"
        @getFormData="getFormData"
        @closeDialog="closeDialog"
      ></form-dialog>
    </el-row>
  </section>
</template>

<script>
import PaginationTable from "../../components/PaginationTable";
import FormDialog from "../../components/FormDialog";
import { camelName, parseTime } from "../../utils";

export default {
  name: "createProject",
  data() {
    return {
      searchBean: {
        title: "",
        state: ""
      },
      form: {
        projectName: '',
        status: ''
      },
      tableConfig: {
        data: [],
        columns: [
          { id: "id", text: "序号", width: "50" },
          { id: "projectName", text: "项目名称", width: "200", sort: "custom" },
          { id: "statusText", text: "状态", width: "100", sort: "custom" },
          { id: "createUser", text: "创建人", width: "100", sort: "custom" },
          { id: "createTime", text: "创建时间", width: "200", sort: "custom" }
        ],
        operations: [
          { id: "edit", text: "编辑" },
          {id: "addApi", text: "添加接口"},
          { id: "delete", text: "删除" }
        ],
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0,
          sortField: "createTime", //排序字段
          sortType: "descending" //排序规则
        }
      },
      dialogConfig: {
        visible: false,
        title: "新增项目",
        formConfig: [
          {
            id: "projectName",
            text: "项目名称",
            type: "input",
            value: "",
            rules: [
              { required: true, message: "项目名称不能为空", trigger: "blur" },
              {
                min: 2,
                max: 30,
                message: "项目名称长度在2~30个字符之间",
                trigger: "blur"
              }
            ]
          },
          {
            id: "status",
            text: "状态",
            type: "select",
            options: [{ id: "1", text: "启用" }, { id: "0", text: "禁用" }],
            value: '1'
          }
        ],
        btn: [{ id: "save", text: "保存" }, { id: "cancel", text: "关闭" }],
        action: ""
      },
      formData: {
        projectName: "",
        status: "1",
      },
      tableLoading: false,
      loading: false
    };
  },
  components: { PaginationTable, FormDialog },
  methods: {
    addProject() {
      this.dialogConfig.title = "添加项目";
      this.dialogConfig.visible = true;
      this.dialogConfig.action = "add";
      this.formData = {
        projectName: "",
        status: '1'
      };
    },
    advancedSearch() {},
    handlePageChange() {},
    handleOperation() {},
    getFormData(config) {
      const methodName = camelName('handle', config.action);
      this[methodName](config.data)
    },
    closeDialog() {
      this.dialogConfig.visible = false;
    },
    handleAdd(data) {
      this.$axios.post('/projects/addProject',data).then(res => {
        let type = Object.is(res.code, 0) ? 'success' : 'danger';
        this.$message({
          message: res.msg,
          type
        });
        if (Object.is(res.code, 0)) {
          this.queryProjectList();
          this.dialogConfig.visible = false;
        }
      })
    },
    queryProjectList() {
      this.$axios.get('/projects/queryProjectList').then(res => {
            if (Object.is(res.code, 0)) {
              this.tableConfig.data = res.content;
              this.tableConfig.data.forEach(vv => {
                vv.statusText = Object.is(vv.status, 1) ? '启用' : '禁用';
                vv.createTime = parseTime(vv.createTime);
              });
            }else {
              this.$message({
                message: res.msg,
                type: 'danger'
              })
            }
          })
    }
  },
  mounted() {
   this.queryProjectList();
  },
};
</script>
