import store from '@/store'

const checkPermission = (el, binding) => {
    const { value } = binding
    const roles = store.getters && store.getters.roles

    if (value) {
        const hasPermission = roles.includes(value)

        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    } else {
        el.parentNode && el.parentNode.removeChild(el)
        // throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
}

export default {
    inserted(el, binding) {
        checkPermission(el, binding)
    },
    update(el, binding) {
        checkPermission(el, binding)
    }
}
