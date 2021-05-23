<template>
    <button class="center-xy" @click="onAction">
        <span v-if="state === states.IDLE">{{ label }}</span>
        <img v-else src="../../../assets/icons/loading.svg" class="svg-white">
    </button>
</template>

<style scoped>
button > img {
    height: 60%;
    animation: loading 2s linear infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

<script>
export default {
    name: 'LoadingButton',
    data() {
        return {
            states: {
                IDLE: 0,
                LOADING: 1
            },
            state: 0
        }
    },
    props: {
        label: {
            type: String,
            required: true
        },
        action: {
            type: Function,
            required: true
        }
    },
    methods: {
        async onAction() {
            this.state = this.states.LOADING;
            const result = await this.action();
            this.state = this.states.IDLE;
            this.$emit('completed', result);
        }
    }
}
</script>
