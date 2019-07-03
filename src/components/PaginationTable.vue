<template>
    <section>
        <el-table v-loading="tableLoading" :data="tableConfig.data" @sort-change="sortChange"
        stripe style="width: 100%;" :height="tableHeight" fit highlight-current-row size="mini">
            <el-table-column v-for="(item, index) in tableConfig.columns"
            :width="item.width" :sortable="item.sort"
            :prop="item.id" :label="item.text" :key="index" align="center"></el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" v-for="(item, index) in tableConfig.operations" :key="index"
                    @click="handleOperation(scope.row, item)">{{item.text}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableConfig.pageInfo.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="tableConfig.pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableConfig.pageInfo.total">
        </el-pagination>
    </section>
</template>

<script>
export default {
    name: 'paginationTable',
    props: {
        tableConfig: {
            type: Object,
            default() {
                return{}
            }
        },
        tableLoading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{
            tableHeight: 470 //表格的高度信息
        }
    },
    methods: {
        handleSizeChange(pageSize) {//每页显示数量发生变化
            let bean = this.tableConfig.pageInfo;
            bean.pageSize = pageSize;
            this.$emit('handlePageChange', bean);
        },
        handleCurrentChange(page) {//页号发生改变
            let bean = this.tableConfig.pageInfo;
            bean.page = page;
            this.$emit('handlePageChange', bean);
        },
        handleOperation(row, item) {//表格内部点击操作按钮
            let action = item.id;
            let params = {
                data: row,
                action
            };
            this.$emit('handleOperation', params);
        },
        sortChange(bean) {//图片排序字段
            this.$emit('sortChange', bean);
        },
        getTableHeight() {
            let height = document.body.offsetHeight;
            this.tableHeight = height - 250 > 200 ? (height - 250) : 200;
        }
    },
    mounted() {
        let _this = this;
        window.onresize = function() {
            _this.getTableHeight();
        }
    }
}
</script>
