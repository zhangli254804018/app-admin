/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
    // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
        )
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}
/**
 * @param {Object} name value
 * @returns {Object}
 */
export function setLocalStorage(name, value) {
    const data = {}
    if (typeof value === 'object') {
        data.type = 'object'
    } else if (typeof value === 'string') {
        data.type = 'string'
    } else if (typeof value === 'number') {
        data.type = 'number'
    }
    data.data = value
    try {
        localStorage.setItem(name, JSON.stringify(data))
    } catch (err) {
    // 不支持localStorage
        setCookie(name, JSON.stringify(data))
    }
}
/**
 * @param {Object} name value
 * @returns {Object}
 */
export function getLocalStorage(name) {
    let res = ''
    try {
        res = localStorage.getItem(name)
        if (!res) {
            res = getCookie(name)
        }
    } catch (err) {
    // 不支持localStorage
        res = getCookie(name)
    }
    if (res) {
        res = JSON.parse(res)
        return res.data
    }
    return null
}
/**
 * @param {Object} name value Day
 * @returns {Object}
 */
export function setCookie(name, value, Day) {
    var Days = Day || 30
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie =
        name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}
/**
 * @param {Object} name value Day
 * @returns {Object}
 */
export function getCookie(name) {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2])
    } else {
        return null
    }
}
/**
 * @param {Object} name value Day
 * @returns {Object}
 */
export function delCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1) // 将date设置为过去的时间
    var cval = getCookie(name)
    if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}

export const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
    // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/*
	@param num 为数字
	ex. return 100,00,00等
*/
export function formatCurrency(num) {
    if (num) {
        // 将num中的$,去掉，将num变成一个纯粹的数据格式字符串
        num = num.toString().replace(/\$|\,/g, '')
        // 如果num不是数字，则将num置0，并返回
        if (num == '' || isNaN(num)) {
            return 'Not a Number ! '
        }
        // 如果num是负数，则获取她的符号
        var sign = num.indexOf('-') > 0 ? '-' : ''
        // 如果存在小数点，则获取数字的小数部分
        var cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : ''
        cents = cents.length > 1 ? cents : '' // 注意：这里如果是使用change方法不断的调用，小数是输入不了的
        // 获取数字的整数数部分
        num = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')) : num
        // 如果没有小数点，整数部分不能以0开头
        if (cents == '') {
            if (num.length > 1 && num.substr(0, 1) == '0') {
                return 'Not a Number ! '
            }
        }
        // 如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
        else {
            if (num.length > 1 && num.substr(0, 1) == '0') {
                return 'Not a Number ! '
            }
        }
        // 针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
        /*
		  也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
		  字符串长度为0/1/2/3时都不用添加
		  字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
		 */
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num =
                num.substring(0, num.length - (4 * i + 3)) +
                ',' +
                num.substring(num.length - (4 * i + 3))
        }
        // 将数据（符号、整数部分、小数部分）整体组合返回
        return sign + num + cents
    } else {
        return num
    }
}
