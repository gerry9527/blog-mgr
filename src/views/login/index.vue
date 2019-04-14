<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" class="loginForm">
            <el-form-item>
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <span class="svg-container">
                    <svg-icon icon-class="key" />
                </span>
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>       
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss" scope>
    .loginForm {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>