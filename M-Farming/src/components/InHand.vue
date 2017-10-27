<template>
    <div class="end-task-box">
        <div v-if="isHasData">
            <div class="main-box" v-for="(item,index) in swiperDatas" :key="index" :style="{ backgroundColor: item.color }">
                <span class="min-box">2分钟前</span>
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
                        <li class="info-item">
                            <span class="info-tip">派发时间：</span>
                            <span class="info-txt">{{ item.distributeTime }}</span>
                        </li>
                        <li class="info-item">
                            <span class="info-tip">任务内容：</span>
                            <span class="info-txt"></span>
                        </li>
                        <ul class="task-info-box task-info-box2 hide">

                            <li class="info-item task-con-item" v-for="(task, idx) in item.taskContents" :key="idx">
                                <span class="info-tip">{{ task.text }} :</span>
                                <span class="info-txt" v-if="!task.isInput">{{ task.val }}</span>
                                <span class="info-txt" v-if="task.isInput">
                                    <input type="text" class="task-inp" :data-name="task.name" :name="'handleTaskInp'">
                                </span>
                            </li>
                        </ul>
                    </ul>
                    <div class="icon-box">
                        <span class="iconfont arrowr-icon" @click="showMoreLinkInfo($event)">&#xe7cc;</span>
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <mt-button type="default" class="submit-btn" v-show="isShowSuccessBtn" @click.native="finishTask">完成</mt-button>
            </div>
        </div>
        <span class="emptry-box" v-if="!isHasData">{{ emptryText }}</span>
    </div>
</template>
<script>
import _j from 'jquery'
import bus from './../eventBus'
import tempData from './../assets/temp'
import store from './../store/index'
function fetchGetHandleInfos(store, opts) {
    return store.dispatch('GET_HANDLE_TASKS', opts)
}
function fetchFinishTask(store, opts) {
    return store.dispatch('SAVE_FINISH_TASK', opts);
}
function fetchGetBatchNo(store, opts) {
    return store.dispatch('GET_BATCH_INFO', opts);
}
export default {
    store,
    data() {
        return {
            opts: {
                batchNo: 'HY20171024100408',
                sort: '1',
                params: {}
            },
            emptryText: '暂没有数据',
            isHasData: false,
            isShowSuccessBtn: false,
            swiperDatas: [

            ],
        }
    },
    mounted() {
        bus.$on('get-handle-task', (no) => {
            if (!no) {
                this.emptryText = '暂没有数据'
                return false;
            }
            if (typeof no !== 'number') {
                this.emptryText = '暂没有数据'
                return;
            }
            fetchGetBatchNo(this.$store, { id: no, token: localStorage.token }).then(() => {
                let tempData = this.$store.getters.getBatchInfoById;
                if (tempData.resultCode === '1') {
                    let batchNo = tempData.resultObj.picibianh;
                    let sort = tempData.resultObj.sort;
                    // 获取处理中的数据
                    if (batchNo && sort) {
                        this.opts.batchNo = batchNo;
                        this.opts.sort = sort;
                        fetchGetHandleInfos(this.$store, this.opts).then(() => {
                            this.descDatas();
                        });
                    }
                } else {
                    this.emptryText = tempData.resultMsg;
                }

            });

        })
    },
    methods: {
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
        descDatas() {
            let tempData = this.$store.getters.getHandleInfo;
            if (tempData.resultCode === '1') {
                let tempObj = tempData.resultObj;
                if (!tempObj) {
                    this.isHasData = false;
                    this.emptryText = '暂没数据'
                    return false;
                }
                this.isHasData = true;
                let tempItem = {};
                let tempTask = {}, tempBatch = '', tempDate = '', tasks = [];
                this.swiperDatas.length = 0;
                this.isShowSuccessBtn = true;
                if (tempObj.picibianh.length > 16) {
                    tempBatch = tempObj.picibianh.substr(0, 16) + '...';
                } else {
                    tempBatch = tempObj.picibianh;
                }
                tempDate = tempObj.distributetime.substring(0, tempObj.distributetime.lastIndexOf(' '));
                tempTask = {
                    batch: tempBatch,
                    sourceNo: '',
                    productName: tempObj.productName,
                    linkName: tempObj.linkIdName,
                    taskDesc: '',
                    distributeTime: tempDate
                }
                tasks = tempObj.keyValueLists;
                if (tasks.length > 0) {
                    tempTask.taskContents = [];
                    tempTask.isHasTasks = true;
                    let item = {}, tempObj = {}, isInp = false;
                    let tempTaskValue = '';
                    for (let j = 0, len = tasks.length; j < len; j++) {
                        item = tasks[j];
                        if (item.name.indexOf('time') != -1 || item.name.indexOf('Time') != -1) {
                            tempTaskValue = item.value.substring(0, item.value.lastIndexOf(' '));
                        } else {
                            tempTaskValue = item.value;
                        }
                        isInp = item.input == 1 ? false : true;
                        tempTask.taskContents.push({
                            text: item.text,
                            val: tempTaskValue,
                            isInput: isInp,
                            name: item.name
                        });
                    }
                }
                this.swiperDatas.push(tempTask);
                //}
            } else {
                this.emptryText = tempData.resultMsg;
            }
        },
        finishTask() {
            let inps = _j('input[name="handleTaskInp"]');
            let inpDom = '';
            let tempParams = {}
            for (let i = 0, len = inps.length; i < len; i++) {
                inpDom = _j(inps[i]);
                tempParams['' + inpDom.attr('data-name') + ''] = inpDom.val();
            }
            let params = JSON.stringify(tempParams);
            this.opts.params = params;
            fetchFinishTask(this.$store, this.opts).then(() => {
                let tempData = this.$store.getters.saveFinishTaskInfo;
                if (tempData.resultCode === '1') {
                    this.swiperDatas.length = 0;
                    this.isShowSuccessBtn = false;
                    this.isHasData = false;
                    this.emptryText = '该数据已到已完成栏下';
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';
.end-task-box {
    padding-bottom: 2.3rem;
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
            color: $m-black-9;
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
            .task-inp {
                width: 92%;
                height: 1rem;
                line-height: 1rem;
                border: 0px;
                background-color: $m-black--f3f;
                padding-left: 4%;
                padding-right: 4%;
                @include font-dpr(13px, 1rem);
                color: $m-black-9;
            }
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

.btn-box {
    margin-top: .43rem;
}

.submit-btn {
    width: 4.66rem;
    height: 1.2rem;
    background-color: $m-main--b;
    color: $white;
    border: none;
    box-shadow: none;
}
</style>
