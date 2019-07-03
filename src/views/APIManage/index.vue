<template>
    <section>
        <header>{{$route.meta.title}}</header>
        <el-row :gutter="20" class="seatchBox">
            <el-col :span="12">
                <el-form :inline="true" :model="searchBean" ref="bannerForm">
                    <el-form-item label="项目" prop="title">
                        <el-input v-model="searchBean.title" placeholder="请输入项目"></el-input>
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
    name: "APIManage",
    data() {
      let _this = this;
      return {
        searchBean: {
          title: "",
          state: ""
        },
        projectList: [],
        form: {
          projectId: '',
          status: '1',
          APIName: '',
          type: '',
          responseData: ''
        },
        tableConfig: {
          data: [],
          columns: [
            { id: "id", text: "序号", width: "50" },
            { id: "projectName", text: "项目名称", width: "200"},
            { id: "path", text: "路径", width: "100" },
            { id: "statusText", text: "状态", width: "100" },
            { id: "type", text: "请求类型", width: "100" },
          ],
          operations: [
            { id: "edit", text: "编辑" },
            {id: "test", text: "测试连接"},
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
          title: "新增接口",
          formConfig: [
            {
              id: "projectId",
              text: "所属项目",
              type: "select",
              value: "",
              options: _this.projectList
            },
            {
              id: 'path',
              text: '接口路径',
              type: 'input',
              value: '',
              rules: [
                { required: true, message: "接口名称不能为空", trigger: "blur" }
              ]
            },
            {
              id: "type",
              text: "请求类型",
              type: "select",
              value: "",
              options: [{ id: "GET", text: "get" }, { id: "POST", text: "post" }]
            },
            {
              id: "status",
              text: "状态",
              type: "select",
              options: [{ id: "1", text: "启用" }, { id: "0", text: "禁用" }],
              value: '1'
            },
            {
              id: 'responseData',
              text: '响应数据',
              type: 'input',
              inputType: 'textarea',
              placeholder: '响应数据请设置数组/对象形式',
              rules: [
                { required: true, message: '响应数据不能为空', trigger: 'blur'}
              ]
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
      }
    },
    components: { PaginationTable, FormDialog },
    methods: {
      addProject() {
        this.dialogConfig.title = "添加接口";
        this.dialogConfig.visible = true;
        this.dialogConfig.action = "add";
        this.formData = {
          projectId: '',
          status: '1',
          APIName: '',
          type: '',
          responseData: ''
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
        data.responseData = JSON.stringify(data.responseData);
        this.$axios.post('/api/addAPI',data).then(res => {
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
            this.projectList = res.content.map(vv => {
              return {
                id: vv.id,
                text: vv.projectName
              }
            });
            this.dialogConfig.formConfig[0].options = this.projectList;
          }else {
            this.$message({
              message: res.msg,
              type: 'danger'
            })
          }
        })
      },
      queryAPIList() {
        this.$axios.get('/api/queryAPIList').then(res => {
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
      },
    },
    created() {
      this.queryProjectList();
      this.queryAPIList();
    },
  }
</script>

<style scoped>

</style>
