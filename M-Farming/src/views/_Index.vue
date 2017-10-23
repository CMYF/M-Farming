<template>
    <div class="container">
        <router-view name="VMMain"></router-view>
        <c-footer ></c-footer>
    </div>
</template>
<script>
import CFooter from './../components/Footer'
export default {
    components: {
        CFooter
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="scss">

</style>