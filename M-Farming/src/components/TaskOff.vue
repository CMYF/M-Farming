<template>
    <div class="end-task-box">
        <mt-spinner class="loading-icon" type="fading-circle" color="#02bdad" v-show="isShowLoadingIcon"></mt-spinner>
        <div v-show="isHasData">
            <div class="main-box" v-for="(item,index) in swiperDatas" :key="index" :style="{ backgroundColor: item.color }">
                <span class="min-box">{{ item.endTime }}</span>
                <div class="border-box">
                    <ul class="task-info-box">
                        <li class="info-item">
                            <span class="info-tip">批次编号：</span>
                            <span class="info-txt">{{ item.batch }}</span>
                        </li>
                        <li class="info-item">
                            <span class="info-tip">资源编号：</span>
                            <span class="info-txt">{{ item.sourceNo }}</span>
                        </li>
                        <li class="info-item">
                            <span class="info-tip">产品名称：</span>
                            <span class="info-txt">{{ item.productName }}</span>
                        </li>
                        <li class="info-item">
                            <span class="info-tip">生产环节：</span>
                            <span class="info-txt">{{ item.linkName }}</span>
                        </li>

                        <ul class="task-info-box task-info-box2 hide">
                            <li class="info-item">
                                <span class="info-tip">派发时间：</span>
                                <span class="info-txt">{{ item.distributeTime }}</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">任务内容：</span>
                                <span class="info-txt"></span>
                            </li>
                            <li class="info-item task-con-item" v-for="(task, idx) in item.taskContents" :key="idx">
                                <span class="info-tip">{{ task.text }} :</span>
                                <span class="info-txt">{{ task.val }}</span>
                            </li>
                        </ul>
                    </ul>
                    <div class="icon-box">
                        <span class="iconfont arrowr-icon" @click="showMoreLinkInfo($event)">&#xe7cc;</span>
                    </div>
                </div>
            </div>
        </div>
        <span class="emptry-box" v-if="!isHasData">{{ emptryText }}</span>
    </div>
</template>
<script>
import bus from './../eventBus'
function fetchGetDistributeTask(store, opts) {
    return store.dispatch('GET_DISTRIBUTE_TASK', opts);
}
export default {
    data() {
        return {
            opts: {
                currentPage: 1,
                pageSize: 99,
                state: 40
            },
            emptryText: '暂没有数据',
            isHasData: true,
            swiperDatas: [],
            isShowLoadingIcon: true
        }
    },
    mounted() {

    },
    created() {
        bus.$on('get-end-task', this.emitGetEndTask)
    },
    methods: {
        descDatas() {
            let tempData = this.$store.getters.getTaskInfos;
            if (tempData.resultCode === '1') {
                let tempObj = tempData.basePageObj;
                let tempTasks = tempObj.dataList;
                if (tempTasks.length <= 0) {
                    this.isHasData = false;
                    this.emptryText = '暂没有数据'
                    return false;
                }
                let tempItem = {};
                let tempTask = {}, tempBatch = '', tempDate = '', tasks = [];
                this.swiperDatas.length = 0;
                for (let i = 0, len = tempTasks.length; i < len; i++) {
                    tempItem = tempTasks[i];
                    if (tempItem.picibianh.length > 12) {
                        tempBatch = tempItem.picibianh.substr(0, 12) + '...';
                    } else {
                        tempBatch = tempItem.picibianh;
                    }
                    tempDate = tempItem.distributetime.substring(0, tempItem.distributetime.lastIndexOf(' '));
                    tempTask = {
                        batch: tempBatch,
                        sourceNo: '',
                        productName: tempItem.productName,
                        linkName: tempItem.linkIdName,
                        taskDesc: '',
                        distributeTime: tempDate,
                        endTime: tempItem.timeShow
                    }
                    tasks = tempItem.keyValueLists;
                    if (tasks.length > 0) {
                        tempTask.taskContents = [];
                        tempTask.isHasTasks = true;
                        let item = {}, tempObj = {};
                        let tempTaskValue = '';
                        for (let j = 0, len = tasks.length; j < len; j++) {
                            item = tasks[j];
                            if (item.name.indexOf('time') != -1 || item.name.indexOf('Time') != -1) {
                                tempTaskValue = item.value.substring(0, item.value.lastIndexOf(' '));
                            } else {
                                tempTaskValue = item.value;
                            }
                            tempTask.taskContents.push({
                                text: item.text,
                                val: tempTaskValue
                            });
                        }
                    }
                    this.swiperDatas.push(tempTask);
                }
                this.isShowLoadingIcon = false;
                this.isHasData = true;
            } else {
                this.emptryText = tempData.resultMsg;
            }
        },
        showMoreLinkInfo(e) {
            let dom = _j(e.target);
            let taskListBox = dom.parent('.icon-box').siblings('.task-info-box').find('.task-info-box2');
            if (dom.hasClass('show')) {
                dom.removeClass('show');
                taskListBox.slideUp(500);
                return;
            }
            dom.addClass('show');
            taskListBox.slideDown(500);
        },
        emitGetEndTask() {
            fetchGetDistributeTask(this.$store, this.opts).then(() => {
                this.descDatas();
            });
        }
    },
    beforeDestroy() {
        bus.$off('get-end-task', this.emitGetEndTask);
    }
}
</script>
<style lang="scss" scoped>
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';
.end-task-box {
    padding-bottom: 2.3rem;
}

.loading-icon {
    display: block;
    width: 28px;
    height: 28px;
    margin: 0px auto;
    margin-top: .5rem;
}

.emptry-box {
    width: 100vw;
    display: block;
    height: .5rem;
    @include font-dpr(16px, .5rem);
    text-align: center;
    margin-top: 1rem;
}

.main-box {
    margin: 0px auto;
    box-shadow: 0px 0px 4px 1px #ddd;
    -webkit-box-shadow: 0px 0px 4px 1px #ddd;
    -moz-box-shadow: 0px 0px 4px 1px #ddd;
    -o-box-shadow: 0px 0px 4px 1px #ddd;
    margin-top: .53rem;
    @include rem(( width: 600px,
    ));
    height: auto;
    overflow: hidden;
    background-color: $white;
    padding-bottom: .53rem;
    padding-left: .53rem;
    padding-right: .53rem;
    border-radius: .10rem; // background-color: #ccc;
    .border-box {
        position: relative;
        border: .04rem solid $m-main--b;
        border-radius: .10rem; // padding-bottom: 1rem;
        width: 7.8rem;
        margin: 0px auto;
    }
    .min-box {
        width: 99%;
        height: 1rem;
        display: block;
        @include font-dpr(15px, 1rem);
        text-align: right;
        color: #d6d6d6;
    }
    .task-info-box {
        width: 94%;
        margin: 0px auto;
        padding-top: .3rem;
        height: 100%;
        overflow: hidden;
    }
    .task-info-box2 {
        height: auto;
        overflow: hidden;
        padding-top: 0rem;
        width: 96%;
        padding-left: 2%;
        padding-right: 2%;
        margin-bottom: .4rem;
        .info-item.task-con-item {
            color: #999;
        }
    }
    .info-item {
        width: 100%;
        min-height: 1.33rem;
        @include font-dpr(13px, 1.33rem);
        text-align: left;
        border-bottom: .04rem solid $m-black--eee;
        .info-tip {
            width: 43%;
            float: left;
            display: inline-block;
        }
        .info-txt {
            width: 57%;
            float: left;
            display: inline-block;
        }
    }
    /*.icon-box {
        position: absolute;
        bottom: 0px;
        left: 0px;
        height: 1rem;
        width: 100%;
        @include font-dpr(16px, 1rem);*/
    .arrowr-icon {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transition: all .3s;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -o-transition: all .3s;
        -ms-transition: all .3s;
        margin: 0px auto;
        @include font-dpr(16px, 1rem);
        width: 1rem;
        height: 1rem;
        text-align: center;
    }
    .arrowr-icon.show {
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
    } //}
}
</style>
