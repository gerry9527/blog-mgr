/**
 * 拼接驼峰命名
 * @param firstName
 * @param lastName
 * @returns {string}
 */
export function camelName(firstName, lastName) {
    if (!firstName || !lastName) {
        console.warn('参数不能为空');
        return;
    }
    if (typeof firstName !== 'string' && typeof lastName !== 'string') {
        console.warn('参数必须为字符串');
        return;
    }
    return firstName + lastName[0].toUpperCase() + lastName.slice(1);
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    var date;
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function(result, key){
        var value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    });
    return time_str
}
