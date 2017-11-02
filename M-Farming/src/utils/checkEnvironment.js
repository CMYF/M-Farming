// 安卓
export function isAndroid() {
    var u = navigator.userAgent;
    var isAndr = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    return isAndr;
}
// IOS
export function isIos() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
}