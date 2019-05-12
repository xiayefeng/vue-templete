/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function getToday () {
  let today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  return year + '-' + twoBit(month) + '-' + twoBit(day)
}
export function dateFormat ({
  date = new Date(),
  format = 'yyyy-MM-dd'
} = {}) {
  if (date instanceof Date) {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return format
  } else {
    console.log('params error!')
  }
}
export function twoBit (num) {
  return num < 10 ? '0' + num : num
}
export function RemoveArrItem () {
  let arr = new Array()
  arr.push.apply(arr, arguments)
  arr.remove = function (item) {
    if (arr.indexOf(item) === -1) {
      return Array.from(arr)
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item && !isNaN(item)) {
        arr.splice(i, 1)
        break
      } else if (arr[i] != arr[i] && item != item) {
        arr.splice(i, 1)
        break
      }
    }
    return Array.from(arr)
  }
  return arr
}
export function excel (el, name) {
  var winname = window.open('', '_blank', 'top=1000')
  var strHTML = document.all[el].innerHTML
  winname.document.open('text/html', 'replace')
  winname.document.writeln(strHTML)
  winname.document.execCommand('saveas', '', name + '.xls')
  winname.close()
}
