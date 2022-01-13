<template>
  <div class="login">
    <div class="login_form">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <h3 class="title">后台管理系统</h3>
        <el-form-item prop="name" size="small">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="iconfont icon-user"
            v-model="loginForm.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pass" size="small">
          <el-input
            placeholder="请输入密码"
            prefix-icon="iconfont icon-suo"
            v-model="loginForm.pass"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item size="small" prop="identify">
          <el-input
            placeholder="验证码"
            prefix-icon="iconfont icon-validCode"
            v-model="loginForm.identify"
            style="width: 63%"
          >
          </el-input>
          <div class="login-code" @click="changeAuthCode">
            <img :src="authCode.img" alt="验证码" />
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
    <!-- <img :src="imgurl" alt="" @click="changeAuthCode" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { encrypt } from '@/utils/rsaEncrypt'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        name: 'admin',
        pass: '',
        identify: '',
        checked: false
      },
      loginFormRules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        pass: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        identify: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 更换验证码
    changeAuthCode () {
      this.$store.dispatch('getAuthCode')
    },
    // 登录
    /* 登录的传递的参数
        {
        "code": "string",
        "password": "string",
        "username": "string",
        "uuid": "string"
      } */
    async authLogin () {
      try {
        const result = await this.$store.dispatch('getAuthLogin', {
          code: this.loginForm.identify,
          password: encrypt(this.loginForm.pass),
          username: this.loginForm.name,
          uuid: this.authCode.uuid
        })
        console.log(result)
        if (result === 'ok') {
          this.$message.success('登录成功')
          this.$router.push('/home')
        }
      } catch (error) {
        this.$message.warning(error)
      }
    }
  },
  mounted () {
    this.$store.dispatch('getAuthCode')
  },
  computed: {
    ...mapState({
      authCode: (state) => state.authCode
    })
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
