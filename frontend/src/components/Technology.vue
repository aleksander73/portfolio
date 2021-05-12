<template>
    <div class="tech-container">
        <img :src=iconPath() :title=name />
    </div>
</template>

<style scoped>
.tech-container {
    margin: 10px;
}

img {
    height: 60px;
}
</style>

<script>
export default {
    name: 'Technology',
    props: {
        name: String,
        icon: String
    },
    methods: {
        iconPath() {
            return require('../../../server/uploads/' + this.icon);
        }
    }
}
</script>
