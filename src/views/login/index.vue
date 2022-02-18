<template>
  <div class="login">
    <div class="login_form">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <h3 class="title">后台管理系统</h3>
        <el-form-item prop="username" size="small">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" size="small">
          <el-input
            placeholder="请输入密码"
            prefix-icon="iconfont icon-suo"
            v-model="loginForm.password"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item size="small" prop="code">
          <el-input
            placeholder="验证码"
            prefix-icon="iconfont icon-validCode"
            v-model="loginForm.code"
            style="width: 63%"
          >
          </el-input>
          <div class="login-code" @click="changeAuthCode">
            <img :src="authImg" alt="验证码" />
          </div>
        </el-form-item>
        <el-form-item size="small">
          <el-checkbox v-model="loginForm.checked">记住我</el-checkbox>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" @click="authLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { encrypt } from '@/utils/rsaEncrypt'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin', // 用户名
        password: '',
        code: '', // 验证码
        checked: false,
        uuid: null
      },
      loginFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      authImg: null
    }
  },
  methods: {
    // 更换验证码
    async changeAuthCode () {
      // 获取验证码图片信息
      const { img, uuid } = await this.$api.users.reqAuthCode()
      this.authImg = img
      this.loginForm.uuid = uuid
    },
    // 登录
    authLogin () {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return false
        /**
         * 1 本地存储 localStore seesion cookie
         * 2 json格式化和json转字符串
         */
        const loginFormCopy = JSON.parse(JSON.stringify(this.loginForm))
        // 深拷贝用户数据,要不用户的密码会边长
        loginFormCopy.password = encrypt(this.loginForm.password)
        this.$api.users
          .reqAuthLogin(loginFormCopy)
          .then((res) => {
            // console.log(res)
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))
            this.$router.push('/')
          })
          .catch()
      })
    }
  },
  mounted () {
    this.changeAuthCode()
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('~@/assets/background.jpg');
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
