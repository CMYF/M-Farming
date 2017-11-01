<template>
    <div class="main">
        <div class="container">
            <mt-header fixed title="任务">
                <mt-button slot="right">
                    <mt-button>
                        <span class="iconfont qr-icon" @click="qr">&#xe7b5;</span>
                    </mt-button>
                </mt-button>
            </mt-header>
            <mt-navbar v-model="active">
                <mt-tab-item id="1" @click.native="distributeTask">待处理</mt-tab-item>
                <mt-tab-item id="2" class="handle-task" @click.native="taskHandle">处理中</mt-tab-item>
                <mt-tab-item id="3" @click.native="taskEnd">已完成</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="active">
                <mt-tab-container-item id="1">
                    <distributed></distributed>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <in-hand></in-hand>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <task-off :task-list="swipers"></task-off>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
import Distributed from './../components/Distributed'
import InHand from './../components/InHand'
import TaskOff from './../components/TaskOff'
import bus from './../eventBus'
import store from './../store/index'
import _cookie from './../utils/_C'
function fetchGetDistributeTask(store, opts) {
    return store.dispatch('GET_DISTRIBUTE_TASK', opts);
}
export default {
    components: {
        Distributed,
        InHand,
        TaskOff
    },
    store,
    data() {
        return {
            active: '1',
            opts: {
                currentPage: 1,
                pageSize: 99,
                state: 20
            },
            id: '',
            swipers: []
        }
    },
    beforeMount() {
        bus.$on('get-temp-task', (batchNo, sort) => {
            this.active = '2';
            this.tempTaskHandle(batchNo, sort);
        })
    },
    mounted() {
        let self = this;
        let token = _cookie._C.getCookie('token');
        if (!token) {
            this.$router.push('/login');
        } else {
            self.distributeTask();
        }

    },
    methods: {
        qr() {
            let self = this;
            if (window.mobile && window.mobile !== undefined) {
                window.mobile['getQr'] = function(data) {
                    let tempData = JSON.parse(data);
                    let val = tempData.value;
                    let tempArr = val.split(':');
                    let tempId = Number(tempArr[1]);
                    if (tempId) {
                        self.id = tempId
                        self.active = '2'; // 跳到处理中tab
                        self.taskHandle(); // 触发请求数据
                    }
                }
                window.mobile.qrScan("window.mobile['getQr']");
            }
        },
        taskEnd() {
            bus.$emit('get-end-task');
        },
        taskHandle() {
            bus.$emit('get-handle-task', this.id);
            this.id = '';
        },
        tempTaskHandle(batchNo, sort) {
            bus.$emit('get-temp-handle-task', batchNo, sort);
        },
        distributeTask() {
            bus.$emit('get-distribute-task');
        }

    },
    beforeDestoryed(){
        
    },
}
</script>
<style lang="scss">
@import url('./../../node_modules/swiper/dist/css/swiper.css');
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';
.winItem {
    display: block;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    @include font-dpr(15px,
    .5rem);
}

.container {
    .mint-header {
        @include rem(( height: 100px));
        background-color: $m-main--b;
        .qr-icon {
            font-size: 22px
        }
    }
    .mint-header.is-fixed {
        z-index: 9;
    }
    .mint-header-title {
        @include rem(( height: 100px,
        ));
        @include font-dpr(18px,
        1.333rem);
    }
    .mint-navbar {
        height: 1.333rem;
        border-bottom: .04rem solid $m-black--ccc;
        margin-top: 1.33rem;
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