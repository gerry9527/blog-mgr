<template>
    <section class="common-module">
        <div class="search-form">
            <el-form v-model="searchParams" :inline="true" size="small">
                <el-form-item label="类别名称" prop="categoryName">
                    <el-input v-model="searchParams.categoryName" placeholder="请输入类别名称" maxlength="20"></el-input>
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
                <el-button size="small" plain>查询</el-button>
                <el-button type="primary" size="small" @click="add">新建</el-button>
            </div>
        </div>
        <div class="content">
            <el-table border
                    :data="tableData"
                    size="small"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    height="calc(100% - 50px)"
            >
                <el-table-column label="类别名称" prop="categoryName" align="center"></el-table-column>
                <el-table-column label="描述信息" prop="description" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="warning" plain size="mini">禁用</el-button>
                        <el-button type="danger" plain size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pull-right" style="margin-top: 10px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.page"
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
    import { save } from '../../../api/category'
    export default {
      name: 'categoryManage',
      data () {
        return {
          searchParams: {
            categoryName: '',
            status: ''
          },
          tableData: [],
          pagination: {
            page: 1,
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
      methods: {
        handleSizeChange () {

        },
        handleCurrentChange () {

        },
        add () { // 新建类别
          this.dialogFormVisible = true
        },
        async handleSubmit () {
            let result = await save(this.categoryParams)
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
