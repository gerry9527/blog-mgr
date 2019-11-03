<template>
    <section class="common-module">
        <div class="search-form">
            <el-form v-model="searchParams" :inline="true" size="small">
                <el-form-item label="类别名称" prop="name">
                    <el-input v-model="searchParams.name" placeholder="请输入类别名称" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="searchParams.status">
                        <el-option value="" label="全部"></el-option>
                        <el-option value="1" label="启用"></el-option>
                        <el-option value="0" label="禁用"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="btn-group">
                <el-button size="small" plain @click="query">查询</el-button>
                <el-button type="primary" size="small" @click="add">新建</el-button>
            </div>
        </div>
        <div class="content">
            <el-table border
                    :data="tableData"
                    size="mini"
                    height="calc(100% - 50px)"
                    v-loading="loading"
                    stripe
            >
                <el-table-column label="序号" align="center" width="80px">
                    <template slot-scope='{ row, column, $index }'>
                        <div>{{ $index + 1 }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="类别名称" prop="name" align="center"></el-table-column>
                <el-table-column label="描述信息" prop="description" align="center"></el-table-column>
                <el-table-column label="创建时间" width="150px" prop="createTime" align="center">
                    <template slot-scope='{row}'>
                        <span>{{row.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label='状态' width="80px" align="center">
                    <template slot-scope='{ row }'>
                        <div>{{ row.status | formatStatus }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px" align="center">
                    <template slot-scope="scope">
                        <el-button type="warning" plain size="mini" v-if="scope.row.status==1" @click="handleFobide(scope.row, 0)">禁用</el-button>
                        <el-button type="success" plain size="mini" v-if="scope.row.status==0" @click="handleFobide(scope.row, 1)">启用</el-button>
                        <el-button type="danger" plain size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pull-right" style="margin-top: 10px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
            </el-pagination>
        </div>
        <el-dialog title="新建类别" :visible.sync="dialogFormVisible" width="600px">
            <el-form :model="categoryParams" label-width="80px" :rules="categoryRules">
                <el-form-item label="类别名称" prop="categoryName">
                    <el-input size="small" v-model="categoryParams.categoryName" maxlength="20" placeholder="请输入类别名称"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input size="small" type="textarea" v-model="categoryParams.description" maxlength="200" placeholder="请输入类别描述"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select size="small" v-model="categoryParams.status">
                        <el-option value="1" label="启用"></el-option>
                        <el-option value="0" label="禁用"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import { save, query, update, remove } from '../../../api/category'
    import moment from 'moment'
    export default {
      name: 'categoryManage',
      data () {
        return {
           searchParams: {
            name: '',
            status: ''
          },
          loading: false,
          tableData: [],
          pagination: {
            currentPage: 1,
            pageSize: 10,
            total: 0
          },
          dialogFormVisible: false,
          categoryParams: {
            categoryName: '',
            description: '',
            status: '1'
          },
          categoryRules: {
            categoryName: [
              {required: true, message: '类别名称不能为空', trigger: 'blur'}
            ]
          }
        }
      },
      created() {
          this.query()
      },
      filters: {
          dateFormat (value, format) {
              return moment(new Date(value)).format(format)
          },
          formatStatus (value) {
              return value === 1 ? '启用' : '禁用'
          }
      },
      methods: {
        async query () {
            let bean = {}
            this.loading = true
            Object.assign(bean, this.searchParams, this.pagination)
            let result = await query(bean)
            this.loading = false
            if (result && result.content) {
                this.tableData = result.content.rows
                this.pagination.total = result.content.total
            }
        },
        handleSizeChange (pageSize) {
            this.pagination.pageSize = pageSize
            this.query()
        },
        handleCurrentChange (page) {
            this.pagination.currentPage = page
            this.query()
        },
        add () { // 新建类别
          this.dialogFormVisible = true
        },
        async handleFobide (row, status) { // 禁用/启用
            let bean = {}
            Object.assign(bean, row)
            bean.status = status
            let result = await update(bean)
            if (result) {
                this.$message.success(result.msg)
                this.query()
            }
        },
        handleDelete (row) { // 移除当前记录
            this.$confirm(`确定要删除【${row.name}】`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await remove({id: row.id})
                if (result) {
                    this.$message.success(result.msg)
                    this.query()
                }
            })
        },
        async handleSubmit () {
            let result = await save(this.categoryParams)
            if (result && result.code === 0) {
                this.$message.success(result.msg)
                this.query()
            } else {
                this.$message.error(res.msg)
            }
            this.dialogFormVisible = false
        }
      }
    }
</script>

<style lang="scss" scoped>
    .common-module{
        height: 100%;
        .search-form{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .content{
            height: calc(100% - 50px);
        }
    }
</style>
