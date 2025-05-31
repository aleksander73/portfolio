<template>
    <div class="tech-container">
        <img :src="icon" :title=name />
    </div>
</template>

<style scoped>
.tech-container {
    margin: 10px;
}

img {
    height: 50px;
}
</style>

<script>
export default {
    name: 'Technology',
    props: {
        name: String,
        icon: String
    }
}
</script>
