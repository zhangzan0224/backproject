<template>
  <div class="login">
    <div class="login_form">
      <el-form ref="form" :model="loginForm" :rules="loginFormRules">
        <h3 class="title">后台管理系统</h3>
        <el-form-item prop="name" size="small">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-s-custom"
            v-model="loginForm.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pass" size="small">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.pass"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item size="small">
          <el-input
            placeholder="验证码"
            prefix-icon="el-icon-success"
            v-model="loginForm.identify"
            style="width: 63%"
          >
          </el-input>
          <div class="login-code" @click="changeAuthCode">
            <img :src="imgurl" alt="验证码" />
          </div>
        </el-form-item>
        <el-form-item size="small">
          <el-checkbox v-model="loginForm.checked">记住我</el-checkbox>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <img :src="imgurl" alt="" @click="changeAuthCode" /> -->
  </div>
</template>

<script>
import { reqAuthCode } from '@/apis/code.js'
export default {
  name: 'Login',
  data () {
    return {
      imgurl: '',
      loginForm: {
        name: 'admin',
        pass: '',
        identify: '',
        checked: false
      },
      loginFormRules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        pass: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    changeAuthCode () {
      this.getAuthCode()
    },
    async getAuthCode () {
      const res = await reqAuthCode()
      console.log(res)
      if (res.status === 200) {
        this.imgurl = res.data.img
      }
    }
  },
  mounted () {
    this.getAuthCode()
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../../public/images/background.jpg');
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.login_form {
  border-radius: 6px;
  background: #fff;
  width: 385px;
  padding: 25px 25px 5px 25px;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
  font-size: 18px;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
}
.login-code img {
  cursor: pointer;
  vertical-align: middle;
  width: 100%;
}
.el-button {
  width: 100%;
}
</style>
