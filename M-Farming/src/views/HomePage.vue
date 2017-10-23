<template>
    <div class="main">
        <div class="container">
            <mt-header title="任务">
                <mt-button slot="right">
                    <mt-button>
                        <span class="iconfont qr-icon">&#xe7b5;</span>
                    </mt-button>
                </mt-button>
            </mt-header>
            <mt-navbar v-model="active">
                <mt-tab-item id="1">已派发</mt-tab-item>
                <mt-tab-item id="2">处理中</mt-tab-item>
                <mt-tab-item id="3">已完成</mt-tab-item>
            </mt-navbar>

            <mt-tab-container v-model="active">
                <mt-tab-container-item id="1">
                    <distributed></distributed>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <in-hand></in-hand>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <task-off></task-off>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
import Distributed from './../components/Distributed'
import InHand from './../components/InHand'
import TaskOff from './../components/TaskOff'
export default {
    components: {
        Distributed,
        InHand,
        TaskOff
    },
    data() {
        return {
            active: '1',
            selected: '我的'
        }
    }
}
</script>
<style lang="scss">
@import url('./../../node_modules/swiper/dist/css/swiper.css');
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
}
</style>