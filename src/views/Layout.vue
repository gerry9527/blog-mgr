<template>
  <el-container>
    <el-header class="header">
      <span style="font-size: 24px;">MOCK_SERVER</span>
    </el-header>
    <el-container>
      <el-aside class="left-menu" width="200px">
        <ul class="list-unstyled menu">
          <li>
            <router-link
              :class="{isActive: $route.name==='projectsManage'}"
              to="/projectsManage"
            >新建项目</router-link>
          </li>
          <li>
            <router-link
                    :class="{isActive: $route.name==='APIManage'}"
                    to="/APIManage"
            >接口管理</router-link>
          </li>
        </ul>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "mainView"
};
</script>

<style lang="scss" scoped>
section {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0d193e;
    color: #fff;
    font-size: 20px;
    .comeback {
      cursor: pointer;
    }
  }
  .left-menu {
    background: rgb(247, 248, 249);
    .menu {
      padding: 10px 0;
      li {
        display: flex;
        justify-content: center;
        a {
          width: 100%;
          height: 36px;
          line-height: 36px;
          text-decoration: none;
          color: #888;
          padding-left: 20px;
        }
        a:hover {
          background: #ecf5ff;
        }
        .isActive {
          background: #ecf5ff;
          color: #409eff;
        }
      }
    }
  }
  .main {
    background-color: #fff;
    height: 100%;
    padding: 20px;
  }
}
</style>
