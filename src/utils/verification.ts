/**
 * 手机号验证
 * @param {*} value  手机号
 */

export function checkPhone(value: string): boolean {
    let regPhong = /^1[3456789]\d{9}$/;
    return regPhong.test(value)
}

/*
密码校验6 - 20数字加英文
*/


export function checkPassword(value: string): boolean {
    let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return regPassword.test(value)
}
/*
验证码6 位数字加英文
*/

export function checkCode(value: string): boolean {
    let regCode = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6}$/;
    return regCode.test(value)
}