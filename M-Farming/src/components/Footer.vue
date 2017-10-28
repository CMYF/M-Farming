<template>
    <div class="footer-box" :style="{display: isShowNavs}">
        <div class="nav-item"  v-for="(item, index) in navs" :class="item.isSelect ? 'is-selected' : ''" v-bind:data-idx="index" :key="index" v-bind:data-rou="item.router">
            <span class="iconfont nav-item-icon" v-html="item.icon"></span>
            <div class="nav-item-label">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>
<script>
import _j from 'jquery'
export default {
    data() {
        return {
            isShowNavs: 'flex !important',
            navs: [
                {
                    label: '任务',
                    router: '/home',
                    icon: '&#xe781;',
                    isSelect: true
                },
                {
                    label: '我的',
                    router: '/mycenter',
                    icon: '&#xe782;',
                    isSelect: false
                }
            ]
        }
    },
    mounted() {
        let self = this;
        _j('.nav-item').unbind('click').on('click', function() {
            let _t = _j(this);
            let router = _t.attr('data-rou');
            let idx = Number(_t.attr('data-idx'));
            _t.siblings('.nav-item').removeClass('is-selected');
            _t.addClass('is-selected');
            self.$router.push(router);
        });
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';
.footer-box {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    position: relative;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    text-align: center;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    .nav-item {
        display: block;
        padding: 7px 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-decoration: none;
    }
    .nav-item-icon {
        @include rem(( width: 24px,
        height: 24px,

        ));
        @include font-dpr(16px, .7rem);
        margin: 0 auto 5px;
        display: block;
    }
    .nav-item-label {
        color: inherit;
        @include font-dpr(16px, .7rem);
    }
    .nav-item.is-selected {
        background-color: #eaeaea;
        color: $m-main--b;
    }
}
</style>
