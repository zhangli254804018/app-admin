import { Axios } from '@/utils/request'

export function login(data) {
  console.log(Axios)
  return Axios.post('/vue-admin-template/user/login', data)
}

export function getInfo(token) {
  return Axios.get('/vue-admin-template/user/info', { token })
}

export function logout() {
  return Axios.post('/vue-admin-template/user/logout', {})
}

// /api/huoju/admin/exclude/captcha
// 图形验证码接口
export function excludeCaptca(payload) {
  return Axios.post('/api/huoju/admin/exclude/captcha', payload)
}

// /api/huoju/admin/exclude/login
// 登录接口
// { "account":"账号", "passwd":"密码(小写md5)", "captchaToken":"图片的token", "captcha":"验证码", "google":"谷歌验证码"}
export function excludeLogin(payload) {
  return Axios.post('/api/huoju/admin/exclude/login', payload)
}
