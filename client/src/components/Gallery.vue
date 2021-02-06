<template>
    <div class="gallery-container">
        <img class="gallery-item" v-for="(image, index) in images" :key="index" :src="src(image)" alt="image">
    </div>
</template>

<style scoped>
.gallery-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;    
}

.gallery-item {
    border-radius: 10px;
    width: 60%;
    margin: 0.75em;
    transition: transform 0.25s ease;
}

.gallery-item:hover {
    transform: scale(1.25);
}
</style>

<script>
export default {
    name: 'Gallery',
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    methods: {
        src(image) {
            return require('../../assets/projects/' + image);
        }
    }
}
</script>
