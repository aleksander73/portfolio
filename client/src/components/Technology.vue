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
    width: 70px;
    height: 70px;
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
            return require('../../assets/technologies/' + this.icon);
        }
    },
}
</script>
