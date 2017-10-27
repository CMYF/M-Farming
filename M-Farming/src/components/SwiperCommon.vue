<template>
    <div class="swiper-box">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in swiperDatas" :key="index" :style="{ backgroundColor: item.color }">
                <div class="main-box">
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
                            <li class="info-item" v-if="item.isHasTasks">
                                <span class="info-tip">任务内容：</span>
                                <span class="info-txt">
                                    <span class="iconfont arrowr-icon" @click="showMoreLinkInfo($event)">&#xe7cc;</span>
                                </span>
                                <ul class="task-info-box task-info-box2 hide">
                                    <li class="info-item" v-for="(task, idx) in item.taskContents" :key="idx">
                                        <span class="info-tip">{{ task.text }} :</span>
                                        <span class="info-txt">{{ task.val }}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <!-- <div class="icon-box">
                                        <span class="iconfont arrowr-icon" @click="showMoreLinkInfo($event)">&#xe7cc;</span>
                                    </div>-->
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import _j from 'jquery'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import store from './../store/index'
function fetchGetDistributeTask(store, opts) {
    return store.dispatch('GET_DISTRIBUTE_TASK', opts);
}
export default {
    components: {
        swiper,
        swiperSlide
    },
    store,
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 0
            },
            opts: {
                currentPage: 1,
                pageSize: 99,
                state: 20
            },
            swipers: [],
            items: [1, 2, 3, 4, 5],
            swiperDatas: [
                {
                    batch: '',
                    sourceNo: '',
                    productName: '',
                    linkName: '',
                    taskDesc: '',
                    distributeTime: '',
                    taskContents: []
                }
            ],
            teskItems: []
        }
    },
    beforeMount() {
        fetchGetDistributeTask(this.$store, this.opts).then(() => {
            this.descDatas();
        })

    },
    methods: {
        showMoreLinkInfo(e) {
            let dom = _j(e.target);
            let taskListBox = dom.parent('.info-txt').siblings('.task-info-box2');
            if (dom.hasClass('show')) {
                dom.removeClass('show');
                taskListBox.slideUp(500);
                return;
            }
            dom.addClass('show');
            taskListBox.slideDown(500);
        },
        descDatas() {
            let tempData = this.$store.getters.getTaskInfos;
            if (tempData.resultCode === '1') {
                let tempObj = tempData.basePageObj;
                let tempTasks = tempObj.dataList;
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
                        distributeTime: tempDate
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
            }
        },
        getTaskInfo() {
            fetchGetDistributeTask(this.$store, this.opts).then(() => {
                console.log('能有数据出来吗？');
                this.swipers = this.$store.getters.getTaskInfos.basePageObj.dataList;
                console.log(this.swipers);
            })
        }
    }
}
</script>
<style lang="scss">
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';
.swiper-box {
    margin-bottom: 2.5rem;
    .swiper-wrapper {
        .swiper-slide {
            min-height: 300px;
            margin: 0;
        }
    }
    .swiper-pagination {}
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal>.swiper-pagination-bullets {
        position: static;
        margin-top: .45rem;
    }
    .swiper-pagination-bullet {
        @include rem(( width: 20px,
        height: 20px));
        border-radius: 50%;
    }
    .swiper-pagination-bullet-active {
        background: #ff7976;
    }
}

.main-box {
    margin: 0px auto;
    @include rem(( width: 600px,
    ));
    height: auto;
    overflow: hidden;
    background-color: $white;
    margin-top: .53rem;
    padding-top: .53rem;
    padding-bottom: .53rem;
    padding-left: .53rem;
    padding-right: .53rem;
    border-radius: .10rem; // background-color: #ccc;
    .border-box {
        position: relative;
        border: .02rem solid $m-main--b;
        border-radius: .10rem; // padding-bottom: 1rem;
        width: 7.8rem;
        margin: 0px auto;
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
        border-top: .02rem solid $m-black--eee;
        //background-color: $m-black--ddd;
        margin-bottom: .4rem;
        .info-item{
            color: #999;
        }
    }
    .info-item {
        width: 100%;
        min-height: 1.33rem;
        @include font-dpr(13px, 1.33rem);
        text-align: left;
        border-bottom: .02rem solid $m-black--eee;
        .info-tip {
            width: 42%;
            display: inline-block;
        }
        .info-txt {}
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
