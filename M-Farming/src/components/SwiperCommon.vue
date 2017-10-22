<template>
    <div class="swiper-box">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in swiperDatas" :key="index" :style="{ backgroundColor: item.color }"> {{ item.text }}
                <div class="main-box">
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                    <span>AAAAAAAAAAAAAAAAAA</span>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
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
.main-box{
    width: 80%;
    border: 1px solid red;
    margin: 0px auto;
    span{
        display: block;
        height: 30px;
        line-height: 30px;
    }
}
</style>
