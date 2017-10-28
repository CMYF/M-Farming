<template>
    <div class="contaner">
        <div class="logo-box">
            <img src="./../assets/images/login-logo.png" alt="">
        </div>
        <div class="form-box">
            <div class="form-item-box">
                <span class="iconfont user-name-icon user-icon">&#xe782;</span>
                <mt-field class="form-item user-name" placeholder="请输入用户名" v-model="loginForm.name"></mt-field>
            </div>
            <div class="form-item-box">
                <span class="iconfont user-pass-box user-icon">&#xe7d8;</span>
                <mt-field class="form-item user-pass" type="password" placeholder="请输入密码" v-model="loginForm.pass"></mt-field>
            </div>
        </div>
        <span class="err-info" :style="{ visibility: this.isShowError }">{{ this.errInfo }}</span>

        <div class="btn-box">
            <mt-button type="default" @click.native="login" size="large">登录</mt-button>
        </div>
        <div class="version-box">
            <span>标准化生产管理平台 v1.0.0</span>
        </div>
    </div>
</template>
<script>
import store from './../store/index'
import _C from './../utils/_C'
function fetchLogin(store, opts) {
    return store.dispatch('LOGIN', opts);
}
export default {
    store,
    data() {
        return {
            isShowNav: false,
            loginForm: {
                name: '',
                pass: ''
            },
            isShowError: 'hidden',
            errInfo: ''
        }
    },
    methods: {
        login() {
            console.log(_C);
            let name = this.loginForm.name;
            let pass = this.loginForm.pass;
            if (!name || !pass) {
                this.isShowError = 'visible';
                this.errInfo = '*必须输入用户名和密码！';
                return;
            }
            this.isShowError = 'hidden';
            this.errInfo = '';
            fetchLogin(this.$store, this.loginForm).then(() => {
                console.log('登录能成功吗？');
                let tempData = this.$store.getters.getLoginInfo;
                if (tempData.resultCode === '1') {
                    let tempObj = tempData.resultObj;
                    localStorage.token = tempObj.token;
                    _C._C.setCookie('token', tempObj.token, 1);
                    localStorage.uinfo = JSON.stringify(tempObj);
                    this.$router.push('/home');
                } else {
                    this.isShowError = 'visible';
                    this.errInfo = tempData.resultMsg;
                }
            });
        },
    }
}
</script>
<style lang="scss">
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';
body {
    background: #f5f5f5 !important;
}

.footer-box {
    display: none !important;
}

.contaner {
    @include rem(( width: 667px));
    height: 100vh;
    margin: 0px auto;
    overflow: hidden;
    .logo-box {
        width: 5rem;
        margin: 0px auto;
        margin-top: 2.33rem;
        img {
            width: 100%;
            height: auto;
            max-width: 100%;
        }
    }
    .form-box {
        background-color: $white; //border-radius: 0.20rem;
        padding-top: .4rem;
        padding-bottom: .4rem;
        padding-left: .26rem;
        padding-right: .26rem;
        margin-top: 1rem;
        .form-item-box {
            width: 100%;
            @include rem(( height: 80px));
            .user-icon {
                display: inline-block;
                float: left;
                margin-top: .04rem;
                @include rem(( width: 80px,
                height: 80px));
                @include font-dpr(24px, 1.06rem);
                color: $m-black--ccc;
                color: $m-main--b;
            }
            .mint-cell {
                min-height: 40px;
            }
            .form-item {
                float: left;
                @include rem(( width: 540px,
                line-height: 80px,
                height: 80px));
                height: 1.06667rem !important;
                .mintui {
                    font-size: 24px;
                }
            }

            input {
                @include font-dpr(16px, 1.06rem);
                float: left;
            }
        }
        .form-item-box:first-child {
            border-bottom: .04rem solid #ccc;
            padding-bottom: .2rem;
        }
        .form-item-box:last-child {
            margin-top: .2rem;
        }
    }
    .err-info {
        color: #ff7976;
        display: block;
        width: 100%;
        @include rem(( height: 60px));
        @include font-dpr(14px, .8rem);
        text-align: left;
    }
    .btn-box {
        margin-top: .25rem;
        .mint-button--default {
            background-color: $m-main--b;
            color: $white;
        }
    }
    .version-box {
        position: absolute;
        left: 0px;
        bottom: .3rem;
        width: 100vw;
        color: $m-black-6;
    }
}
</style>
