import Vue from 'vue'
import qs from 'qs'

export function fetchLogin(opt) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/login/login.do', qs.stringify({
        'id': opt.name,
        'pwd': opt.pass
    }));
}