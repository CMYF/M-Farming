<template>
    <div class="swiper-box">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in swiperDatas" :key="index" :style="{ backgroundColor: item.color }">
                <div class="main-box">
                    <div class="border-box">
                        <ul class="task-info-box">
                            <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">完成播种时间：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                        </ul>
                        <ul class="task-info-box task-info-box2 hide">
                             <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                            <li class="info-item">
                                <span class="info-tip">生产环节：</span>
                                <span class="info-txt">啊里马马</span>
                            </li>
                        </ul>
                        <div class="icon-box">
                            <span class="iconfont arrowr-icon" @click="showMoreLinkInfo($event)">&#xe7cc;</span>
                        </div>
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
export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 0
            },
            items: [1, 2, 3, 4, 5],
            swiperDatas: [
                {
                    text: 'AA',
                    color: ''
                },
                {
                    text: 'GG',
                    color: ''
                },
                {
                    text: 'CC',
                    color: ''
                }
            ]
        }
    },
    methods: {
        showMoreLinkInfo(e) {
            let dom = _j(e.target);
            let taskListBox = dom.parent('.icon-box').siblings('.task-info-box2');
            if (dom.hasClass('show')) {
                dom.removeClass('show');
                taskListBox.slideUp(500);
                return;
            }
            dom.addClass('show');
            taskListBox.slideDown(500);
        }
    }
}
</script>
<style lang="scss">
@import './../assets/sass/_rem.scss';
@import './../assets/sass/cmy_variable.scss';
@import './../assets/sass/common.scss';
.swiper-box {
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
    border-radius: .10rem;
    background-color: #ccc;
    .border-box {
        position: relative;
        border: .02rem solid $m-main--b;
        border-radius: .10rem;
        padding-bottom: 1rem;
        width: 7.8rem;
        margin: 0px auto;
    }
    .task-info-box {
        width: 94%;
        margin: 0px auto;
        padding-top: .3rem;
        height: 8.1rem;
        overflow: hidden;
    }
    .task-info-box2{
        height: auto;
        overflow: hidden;
        padding-top: 0rem;
    }
    .info-item {
        width: 100%;
        height: 1.33rem;
        @include font-dpr(15px, 1.33rem);
        text-align: left;
        border-bottom: .02rem solid $m-black--eee;
        .info-tip {
            width: 50%;
            display: inline-block;
        }
        .info-txt{
        }
    }
    .icon-box {
        position: absolute;
        bottom: 0px;
        left: 0px;
        height: 1rem;
        width: 100%;
        @include font-dpr(16px, 1rem);
        .arrowr-icon {
            display: block;
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
        }
        .arrowr-icon.show {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg);
            -moz-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -o-transform: rotate(90deg);
        }
    }
}

</style>
