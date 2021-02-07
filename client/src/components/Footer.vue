<template>
    <div class="footer">
        <p>{{ $t('footer-text') }}</p>
        <p>{{ $t('footer-year') }}</p>
    </div>
</template>

<style scoped>
.footer {
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0f0f0f;
    border-top: 5px solid #e2e2e2
}

p {
    margin: 0.5em 0;
    font-size: 1.25em;
}
</style>

<script>
export default {
    name: 'Footer'
}
</script>
