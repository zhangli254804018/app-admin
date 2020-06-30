// import { logout, getInfo } from '@/api/user'
import { Login, H5Roles } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import MD5 from 'md5'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        roleId: 0,
        roles: []
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLE_INFO: (state, info) => {
        state.roleId = info.roleId
        state.roles = info.roles
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            Login({
                ...userInfo,
                passwd: MD5(userInfo.passwd)
            }).then(res => {
                commit('SET_TOKEN', res.token)
                setToken(res.token)
                resolve()
            }).catch(error => reject(error))
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            // getInfo(state.token).then(response => {
            const data = {
                name: 'admin',
                avatar: 'admin'
            }

            if (!data) {
                reject('Verification failed, please Login again.')
            }

            const { name, avatar } = data

            commit('SET_NAME', name)
            commit('SET_AVATAR', avatar)
            resolve(data)
            // }).catch(error => {
            //   reject(error)
            // })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            // logout(state.token).then(() => {
            removeToken() // must remove  token  first
            resetRouter()
            commit('RESET_STATE')
            resolve()
            // }).catch(error => {
            //   reject(error)
            // })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    async getRoles({ commit }) {
        try {
            const { roleId, list } = await H5Roles()
            commit('SET_ROLE_INFO', {
                roleId,
                roles: list.filter(item => item)
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

