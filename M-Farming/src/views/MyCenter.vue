<template>
    <div class="main">
        <div class="container">
            <mt-header title="我的">
                <mt-button slot="right">
                </mt-button>
            </mt-header>
            <div class="center-box">
                <div class="bg-box">
                    <div class="user-pic-box">
                        <div class="pic-box">
                            <span class="iconfont user-pic">&#xe783;</span>
                        </div>
                        <span class="user-name"> {{ userInfo.accName }}</span>
                    </div>
                </div>
                <div class="acc-box">
                    <div class="user-name-box">
                        <span class="user-ex">
                            <span class="iconfont user-txt-icon user-name-icon">&#xe793;</span>
                            用户类型
                        </span>
                        <span class="user-text">
                            {{ userInfo.userType }}
                            <span class="iconfont"></span>
                        </span>
                    </div>
                    <div class="user-name-box">
                        <span class="user-ex">
                            <span class="iconfont user-txt-icon login-time-icon"> &#xe7bc;</span>
                            登录时间
                        </span>
                        <span class="user-text">
                            {{ userInfo.loginTime }}
                            <span class="iconfont"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <mt-button type="default" @click.native="loginOut" size="large">退出登录</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import _C from './../utils/_C'
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
        let localUserInfo = localStorage.uinfo;
        if (!localUserInfo) {
            this.$router.push('/login');
            return;
        }
        localUserInfo = JSON.parse(localUserInfo);
        this.userInfo.accName = localUserInfo.opername;
        this.userInfo.userType = localUserInfo.operrole;
        this.userInfo.loginTime = localUserInfo.logintime;
    },
    methods: {
        loginOut() {
            localStorage.uinfo = '';
            localStorage.token = '';
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
    }
    .bg-box {
        background-color: $m-main--b;
        height: 3.5rem;
        position: relative;
    }
    .user-pic-box {
        position: absolute;
        bottom: -1.2rem;
        left: 0px;
        width: 100vw;
        .user-name {
            display: inline-block;
            width: 100vw;
            text-align: center;
            color: $m-black-3;
            @include rem(( height: 40px,
            line-height: 40px,
            font-size: .5rem,
            ));
        }
    }
    .pic-box {
        width: 2rem;
        border-radius: 50%;
        height: 2rem;
        background-color: #f0f0f0;
        line-height: 2rem;
        text-align: center;
        border: .04rem solid $m-main--b;
        margin: 0px auto;
        .user-pic {
            font-size: 1.2rem;
            color: $white;
            display: block;
        }
    }
    .acc-box {
        margin-top: 2rem;
        border-bottom: .04rem solid #ccc;
        border-top: .04rem solid #ccc;
    }
    .user-name-box {
        width: calc(100% - 4%);
        width: -webkit-calc(100% - 4%);
        margin: 0px auto;
        @include rem(( height: 100px,
        line-height: 100px));
        .user-ex {
            @include font-dpr(16px, 1.33rem);
            width: 30%;
        }
        .user-text {
            display: inline-block;
            width: 68%;
            text-align: right;
            @include font-dpr(16px, 1.33rem);
            color: $m-black-9;
        }
        .user-txt-icon{
            font-size: 20px;
        }
        .user-name-icon{
           color: #ffda68;
        }
        .login-time-icon{
           color: #71bfff;
        }
        .to-icon {
            font-size: 22px;
            vertical-align: middle;
            display: none;
        }
    }
    .user-name-box:first-child {
        border-bottom: .04rem solid #ccc;
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

