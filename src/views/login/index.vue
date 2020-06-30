<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="账号"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="passwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="passwd"
          v-model="loginForm.passwd"
          :type="passwordType"
          placeholder="密码"
          name="passwd"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="captcha">
        <el-row type="flex">
          <el-col>
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input v-model="loginForm.captcha" placeholder="请输入验证码" name="captcha" type="text" tabindex="3" auto-complete="off" />
          </el-col>
          <img class="captcha" :src="captchaImage" @click="getCaptcha">
        </el-row>
      </el-form-item>

      <el-form-item prop="google">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.google" placeholder="请输入google码" name="google" type="text" tabindex="4" auto-complete="off" />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { GetCaptcha, SystemTitle } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: 'test1',
        passwd: '123456',
        captcha: '',
        captchaToken: '',
        google: '1234'
      },
      title: '',
      code: '',
      captchaImage: '',
      loginRules: {
        account: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        passwd: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        google: [{ required: true, trigger: 'blur', message: 'google码不能为空' }],
        captcha: [{ required: true, trigger: 'blur', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('验证码不能为空'))
          }else {
            callback()
          }
        } }]
      },
      loading: false,
      passwordType: 'password',
      redirect: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect || ''
      },
      immediate: true
    }
  },
  async created() {
    this.getTitle()
    this.getCaptcha()
  },
  methods: {
    async getTitle() {
      try {
        const res = await SystemTitle()
        this.title = res.systemTitle
      } catch (err) {
        console.error(err)
      }
    },
    async getCaptcha() {
      try {
        const res = await GetCaptcha()
        this.captchaImage = 'data:img/jpg;base64,' + res.img
        this.loginForm.captchaToken = res.captchaToken
        this.code = res.code
      } catch (err) {
        console.error(err)
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.passwd.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // console.log('this.redirect',this.redirect)
            this.$router.push({ path: (this.redirect !== '/404' && this.redirect) || '/member' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .captcha {
    width: 100px;
    height: 48px;
    background-color: #fff;
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
