<template>
  <section class="main-container">
    <el-header class="header">
      <span style="font-size: 24px;">我的博客</span>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-user text-lg cursor-pointer" style="color: #fff;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="content">
      <el-aside class="left-menu"  width="200px">
        <el-menu class="el-menu-vertical-demo" router :default-active="$route.name">
          <el-menu-item v-for="(item, index) in menuList" :key="index" :index="item.path">
            <span v-text="item.meta.title"></span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <el-breadcrumb separator="/" class="breadcrumb-container">
          <el-breadcrumb-item class="text-md" @click="handleBreadcrumbClick(index)" v-for="(item, index) in titleArr" :key="index">
            {{item}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="router-container">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </section>
</template>

<script>
import { constantRoutes } from '../router/index'
import { mapState } from 'vuex'

export default {
  name: "mainView",
  data () {
    return {
      constantRoutes,
      breadcrumbTitleArr: ''
    }
  },
  computed: {
    ...mapState({
      titleArr: state => state.user.title
    }),
    menuList () {
      let routeArr = this.constantRoutes.filter(vv => vv.name === 'home')[0].children
      routeArr = routeArr.filter(vv => vv.name)
      return routeArr
    }
  },
  methods: {
    handleBreadcrumbClick (index) {
      if (index === 0) this.$router.back()
    },
    loginOut () {
      debugger
      this.$router.push({path: '/login'})
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  /deep/ .el-menu-item.is-active{
    background: #ecf5ff;
  }
  .content{
    height: calc(100% - 60px);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #5a5d69;
    color: #fff;
    font-size: 20px;
    height: 100%;
  }
  .left-menu {
    background: rgb(247, 248, 249);
    /deep/ .el-menu{
      height: 100%;
    }
  }
  .main {
    background-color: #fff;
    height: 100%;
    padding: 0;
    .breadcrumb-container{
      height: 56px;
      line-height: 56px;
      padding: 0 20px;
      background: #f4f5f6;
    }
    .router-container{
      height: calc(100% - 96px);
      padding: 20px;
    }
  }
}
</style>
