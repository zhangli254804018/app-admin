import { Axios } from '@/utils/request'

/**
 * 获取验证码
 */
export function GetCaptcha() {
    return Axios.get('/api/huoju/admin/exclude/captcha')
}

/**
 * 用户登陆
 * @param data
 * @param { string } data.account 账号
 * @param { string } data.passwd 密码(小写md5)
 * @param { string } data.captchaToken 图片的token
 * @param { string } data.captcha 验证码
 * @param { string } data.google 谷歌验证码
 */
export const Login = data => {
    return Axios.post('/api/huoju/admin/exclude/login', data)
}

/**
 * 系统名称
 */
export const SystemTitle = () => {
    return Axios.post('/api/huoju/admin/exclude/systemTitle')
}

/**
 * 获取登陆权限
 */
export const H5Roles = () => {
    return Axios.post('/api/huoju/admin/roleinfo/h5RoleLogin')
}
