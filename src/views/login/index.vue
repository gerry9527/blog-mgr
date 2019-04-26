<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" class="login-Form" autocomplete="on" :rules="rules">
            <h3 class="title">登&nbsp;录</h3>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input class="username input" v-model="loginForm.username" placeholder="用户名" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="lock" />
                </span>
                <el-input class="password input" v-model="loginForm.password" placeholder="密码" :type="pwdType"></el-input>
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="pwdType == 'password'?'eye':'eye-open'"/>
                </span>
            </el-form-item>
            <el-button class="loginButton" type="primary" @click="onSubmit">登录</el-button>
            <span class="registerButton"  @click="linkRegister">注册</span>
        </el-form>       
    </div>
</template>

<script>
  export default {
    data() {
       const validateUsername = (rule, value, callback) => {
          if (!value) {
            callback(new Error('用户名不能为空！'))
          } else {
            callback()
          }
        }
        const validatePassword = (rule, value, callback) => {
          if (value == ""){
            callback(new Error('密码不能为空！'))
          }else if(value && value.length < 6){
            callback(new Error('密码不能小于6位字符！'))
          } else {
            callback()
          }
        }
      return{
        loginForm: {
          username:'admin',
          password:'123456'
        },
        rules: {
          username: [{ required: true,trigger: 'blur',validator: validateUsername }],
          password: [{ required: true,trigger: 'blur',validator: validatePassword }]
        },
        pwdType:'password'
      }
      
    },
    methods: {
      //切换密码显示的图标
      showPwd(){
        if(this.pwdType == "password"){
          this.pwdType = "";
        }else{
          this.pwdType = "password";
        }
      },
      onSubmit() {
        debugger
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // this.$axios.defaults.baseURL = 'http://192.168.3.3:3000';
            // this.$axios.post('/users/login',{username:111,password: 222})
            // .then(function (params) {
            //   debugger;
            // })
             this.$store.dispatch("Login",this.loginForm).then(()=>{
                this.$router.push({path:'/'});
            }).catch(()=>{
                debugger
                console.log("error");
            }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      linkRegister(){
         debugger
         this.$router.push({ path: 'register'});
      }
    }
  }
</script>
<style lang="scss" scope>
    .login-container{
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 100%;
      background: url(../../assets/loginBk.jpg) no-repeat;
      background-size: cover;
      .login-Form {
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;;
          width: 390px;
          .title{
            font-size: 26px;
            color: #fff;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
          }
          .el-form-item{
            width: 100%;
            -webkit-appearance: none;
            background-color: #FFF;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 42px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
            .svg-container{
              display: inline-block;
              width: 7%;
            }
            .username{
              width: 90%;
              input.el-input__inner{
                border: none !important;
              }
            }
            .password{
              width: 86%;
              input.el-input__inner{
                border: none !important;
              }
            }
          }
          .loginButton {
            width: 100%;
            margin-bottom: 20px;
          }
          .registerButton{
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            &:hover,&:active{
              color: #409EFF;
              text-decoration: underline;
            }
          }
      }
    }
    
    
</style>