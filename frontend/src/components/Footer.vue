<template>
    <div class="footer center-xy">
        <p>{{ $t('footer-text') }}</p>
        <p>{{ yearLabel }}</p>
    </div>
</template>

<style scoped>
.footer {
    height: 20vh;
    flex-direction: column;
    background-color: #0f0f0fad;
    border-top: 2px solid #e2e2e2
}

p {
    margin: 0.5em 0;
    font-size: 1.25em;
}
</style>

<script>
export default {
    name: 'Footer',
    computed: {
        yearLabel() {
            const origin = 2021;
            const currYear = new Date().getFullYear();
            return `@ ${origin < currYear ? `${origin} - ${currYear}` : origin}`;
        }
    }
}
</script>
