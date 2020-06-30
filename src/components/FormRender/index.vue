<template>
  <el-form ref="form" :inline="inline" :model="values" :rules="rules" :label-width="`${labelWidth}px`" class="form-render" :disabled="loading" @submit.native.prevent>
    <slot name="extra" />
    <el-form-item v-for="(column, key) in Columns" :key="key" :label="column.label || $t(column.lang)" :prop="key" :rules="column.rules">
      <slot :name="`form-item__${key}`">
        <!-- 按钮类型 -->
        <el-button v-if="column.type === ItemType.BUTTON" :type="column.btnType" @click="column.onClick">{{ column.btnText }}</el-button>
        <!-- 输入框类型 -->
        <el-input v-else-if="column.type === ItemType.INPUT" v-model="values[key]" :placeholder="column.placeholder" :clearable="column.clearable" />
        <!-- 选择框 -->
        <el-select v-else-if="column.type === ItemType.SELECT" :key="options[key].key" v-model="values[key]" :placeholder="column.placeholder" :loading="options[key].loading">
          <el-option v-for="(opt, index) in options[key].list" :key="index" :value="opt.value" :disabled="opt.disabled" :label="opt.label" />
        </el-select>
        <!-- 单选框 -->
        <el-radio-group v-else-if="column.type === ItemType.RADIO" v-model="values[key]">
          <el-radio v-for="(opt, index) in column.options.concat(options[key] ? options[key].list : [])" :key="index" :label="opt.value">{{ opt.label }}</el-radio>
        </el-radio-group>
        <!-- 时间选择 -->
        <el-date-picker
          v-else-if="column.type === ItemType.DATETIME"
          v-model="values[key]"
          type="datetime"
          :placeholder="column.placeholder"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <upload
          v-else-if="column.type === ItemType.UPLOAD"
          v-model="values[key]"
          :width="column.width || 200"
          :height="column.height || 200"
          :type="column.path"
        />
      </slot>
    </el-form-item>
    <slot />
  </el-form>
</template>

<script>
import { ItemType } from './types'
export default {
    name: 'FormRender',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: true
        },
        columns: {
            type: Object,
            default: () => ({})
        },
        rules: {
            type: Object,
            default: () => ({})
        },
        labelWidth: {
            type: Number,
            default: 120
        }
    },
    data() {
        return {
            readonlyList: {},
            ItemType,
            options: {},
            values: {}
        }
    },
    computed: {
        Columns() {
            const obj = {}
            Object.keys(this.columns).forEach(key => {
                let item = this.columns[key]
                if (typeof item === 'string') {
                    item = {
                        type: ItemType.INPUT,
                        label: item
                    }
                }
                let placeholder = ''
                if (!item.placeholder) {
                    if (item.type === ItemType.INPUT) {
                        placeholder = '请输入'
                    } else if (item.type === ItemType.SELECT) {
                        placeholder = '请选择'
                    }
                    placeholder += item.label || ''
                } else {
                    if (item.placeholder.includes('.')) {
                        placeholder = this.$t(item.placeholder)
                        item.placeholder = this.$t(item.placeholder)
                    }
                }
                // console.log()

                obj[key] = {
                    type: ItemType.INPUT,
                    placeholder,
                    clearable: true,
                    ...item
                }
            })
            return obj
        }
    },
    created() {
        this.setValues({})
    },
    methods: {
        setValue(key, value) {
            this.$set(this.values, key, value)
        },
        setValues(obj) {
            if (typeof obj === 'undefined') obj = {}
            Object.keys(this.columns).forEach(key => {
                let item = this.columns[key]
                if (typeof item === 'string') {
                    item = {
                        type: ItemType.INPUT,
                        label: item
                    }
                }
                if (item.type !== ItemType.BUTTON) {
                    let val = ''
                    if (!val && typeof this.values[key] !== 'undefined') {
                        val = this.values[key]
                    }
                    if (!val && typeof obj[key] !== 'undefined') {
                        val = obj[key]
                    }
                    if (!val && typeof item.value !== 'undefined') {
                        val = item.value
                    }
                    this.$set(this.values, key, val)
                    if (item.type === ItemType.SELECT || item.type === ItemType.RADIO && item.remote) {
                        this.options[key] = { list: item.options || [], loading: false, key: Date.now() }
                        if (item.remote) {
                            this.remoteOpts(item.remote, key, Object.assign({
                                value: 'value',
                                label: 'label'
                            }, item.props || {}), item.cond || {})
                        }
                    }
                }
            })
        },
        async validRules() {
            try {
                const valid = await this.$refs.form.validate()
                if (!valid) return Promise.reject()
                this.$emit('validRules')
            } catch (err) {
                return Promise.reject(err)
            }
        },
        remoteOpts(url, key, props, cond) {
            this.options[key].loading = true
            this.$ax.post(url, {
                size: 50,
                current: 1,
                ...cond
            }).then(({ list }) => {
                this.options[key].list = list.map(item => ({
                    value: item[props.value],
                    label: item[props.label]
                }))
                this.options[key].loading = false
                this.options[key].key = Date.now()
                this.$forceUpdate()
            }).catch(() => {
                this.options[key].loading = false
                this.options[key].key = Date.now()
            })
        },
        getValues() {
            return this.values
        },
        clean() {
            Object.keys(this.values).forEach(key => {
                this.$set(this.values, key, '')
            })
        }
    }
}
</script>
