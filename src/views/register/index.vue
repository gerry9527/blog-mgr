<template>
    <div class="register-container">
        <el-form ref="registerForm" :model="registerForm" class="register-Form" autocomplete="on" :rules="rules">
            <h3 class="title">注&nbsp;册</h3>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input class="username input" v-model="registerForm.username" placeholder="用户名" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="lock" />
                </span>
                <el-input class="password input" v-model="registerForm.password" placeholder="密码" :type="pwdType"></el-input>
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="pwdType == 'password'?'eye':'eye-open'"/>
                </span>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <span class="svg-container">
                    <svg-icon icon-class="lock-check" />
                </span>
                <el-input class="confirmPassword input" v-model="registerForm.confirmPassword" placeholder="确认密码" :type="confirmPwdType"></el-input>
                <span class="show-confirmPwd" @click="showConfirmPwd">
                  <svg-icon :icon-class="confirmPwdType == 'password'?'eye':'eye-open'"/>
                </span>
            </el-form-item>
             <el-form-item prop="email">
                <span class="svg-container">
                    <svg-icon icon-class="email" />
                </span>
                <el-input class="email input" v-model="registerForm.email" placeholder="邮箱" type="email"></el-input>
            </el-form-item>
            <el-button class="registerButton"  @click="onRegister">注册</el-button>
        </el-form>
    </div>
</template>

<script>
  /* import { Message, MessageBox } from 'element-ui' */
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
        const validateConfirmPassword = (rule, value, callback) => {
          if (value == ""){
            callback(new Error('密码不能为空！'))
          }else if(value && value.length < 6){
            callback(new Error('密码不能小于6位字符！'))
          } else if (value !== this.registerForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback()
          }
        }
        const validateEmail = (rule, value, callback) => {
          const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          if (value == ""){
            callback(new Error('邮箱不能为空！'))
          } else if(!mailReg.test(value)){
            callback(new Error('邮箱格式不正确！'))
          } else {
            callback()
          }
        }

      return{
        registerForm: {
          username:'',
          password:'',
          confirmPassword:'',
          email:''
        },
        rules: {
          username: [{ required: true,trigger:'blur',validator: validateUsername }],
          password: [{ required: true,trigger:'blur',validator: validatePassword }],
          confirmPassword: [{ required: true,trigger:'blur',validator: validateConfirmPassword }],
          email: [{ required: true,trigger:['blur', 'change'],type:'email',validator: validateEmail }]
        },
        pwdType:'password',
        confirmPwdType:'password'
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
      showConfirmPwd(){
        if(this.confirmPwdType == "password"){
          this.confirmPwdType = "";
        }else{
          this.confirmPwdType = "password";
        }
      },
      onRegister() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
             this.$store.dispatch("Register",this.registerForm).then(()=>{
               this.$router.push({path:'/login'});
            }).catch(()=>{
                console.log("error");
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="scss" scope>
    .register-container{
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 100%;
      background: url(../../assets/registerBk.jpg) no-repeat;
      background-size: cover;
      .register-Form {
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
            .username,.email{
              width: 90%;
              input.el-input__inner{
                border: none !important;
              }
            }
            .password,.confirmPassword{
              width: 86%;
              input.el-input__inner{
                border: none !important;
              }
            }
          }
          .registerButton {
            width: 100%;
            color: #fef4e9;
            border: solid 1px #da7c0c;
            background: #f78d1d;
            /*! autoprefixer: off */
            background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
            /* autoprefixer: on */
            background: -moz-linear-gradient(top,  #faa51a,  #f47a20);
            filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#faa51a', endColorstr='#f47a20');
            &:hover{
               background: #f47c20;
               /*! autoprefixer: off */
               background: -webkit-gradient(linear, left top, left bottom, from(#f88e11), to(#f06015));
              /* autoprefixer: on */
               background: -moz-linear-gradient(top,  #f88e11,  #f06015);
               filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#f88e11', endColorstr='#f06015');
            }
            &:active{
              color: #fcd3a5;
              /*! autoprefixer: off */
              background: -webkit-gradient(linear, left top, left bottom, from(#f47a20), to(#faa51a));
              /* autoprefixer: on */
              background: -moz-linear-gradient(top,  #f47a20,  #faa51a);
              filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#f47a20', endColorstr='#faa51a');
            }
          }
      }
    }


</style>
