<template>
    <mt-header class="bbbbb" title="标题过长会隐藏后面的内容啊哈哈哈哈">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style >
.bbbbb{
    background-color: red;
}
</style>
