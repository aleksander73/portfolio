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
    background-image: linear-gradient(#0f0f0fdb 10%, #0f0f0f73);
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
