<template>
    <div class="main">
        <div class="container">
            <mt-header title="我的">
                <mt-button slot="right">
                </mt-button>
            </mt-header>
            <div class="center-box">
                <div class="user-name-box">
                    <span class="user-ex">账号名称</span>
                    <span class="user-text">
                        {{ userInfo.accName }}
                        <span class="iconfont to-icon">&#xe78b;</span>
                    </span>
                </div>
                <div class="user-name-box">
                    <span class="user-ex">用户类型</span>
                    <span class="user-text">
                        {{ userInfo.userType }}
                        <span class="iconfont"></span>
                    </span>
                </div>
                <div class="user-name-box">
                    <span class="user-ex">登录时间</span>
                    <span class="user-text">
                        {{ userInfo.loginTime }}
                        <span class="iconfont"></span>
                    </span>
                </div>
            </div>
            <div class="btn-box">
                <mt-button type="default" @click.native="loginOut" size="large">退出登录</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import _C  from './../utils/_C'
export default {
    components: {
    },
    data() {
        return {
            active: '1',
            selected: '我的',
            userInfo: {
                accName: '',
                userType: '',
                loginTime: ''
            }
        }
    },
    mounted() {
      /*   let localUserInfo = localStorage.uinfo;
        if (!localUserInfo) {
            this.$router.push('/login');
            return; 
        }
        localUserInfo = JSON.parse(localUserInfo);
        this.userInfo.accName = localUserInfo.opername;
        this.userInfo.userType = localUserInfo.operrole;
        this.userInfo.loginTime = localUserInfo.logintime; */
    },
    methods: {
        loginOut() {
           localStorage.uinfo = '';
           _C._C.setCookie('token', '', 0);
           this.$router.push('/login');
        },


    }
}
</script>
<style lang="scss">
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';

.container {
    .mint-header {
        @include rem(( height: 100px));
        background-color: $m-main--b;
        .qr-icon {
            font-size: 22px
        }
    }

    .mint-header-title {
        @include rem(( height: 100px,
        ));
        @include font-dpr(18px,
        1.333rem);
    }
    .mint-navbar {
        height: 1.333rem;
        border-bottom: .02rem solid $m-black--ccc;
        .mint-tab-item {
            padding: 0;
            .mint-tab-item-label {
                width: 65%;
                margin: 0px auto;
            }
        }
        .mint-tab-item.is-selected {
            border-bottom: none;
            margin-bottom: 0px;
            .mint-tab-item-label {
                border-bottom: .08rem solid $m-main--b;
                color: $m-main--b;
                margin-bottom: 0px;
            }
        }
    }
    .mint-tab-item-label {
        @include font-dpr(16px,
        1.33rem);
    }
    .center-box {
        width: 100%;
        margin-top: .25rem;
    }
    .user-name-box {
        width: 95%;
        margin: 0px auto;
        @include rem(( height: 100px,
        line-height: 100px));
        border-bottom: .01rem solid #ccc;
        .user-ex {
            @include font-dpr(16px, 1.33rem);
            width: 25%;
        }
        .user-text {
            display: inline-block;
            width: 74%;
            text-align: right;
            @include font-dpr(16px, 1.33rem);
            color: $m-black-9;
        }
        .to-icon {
            font-size: 22px;
            vertical-align: middle;
        }
    }
    .btn-box {
        width: 95%;
        margin: 0px auto;
        margin-top: 1.33rem;
        .mint-button--default {
            background-color: $m-main--b;
            color: $white;
        }
    }
}
</style>

