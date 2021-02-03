<template>
    <div>
        <h1>{{name}}</h1>
        <p>{{description}}</p>
        <img v-for="(image, index) in images" :key="index" :src="relativePath(image)" alt="image">
        <iframe width='560' height='315' :src=ytVideoSrc frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen />
    </div>
</template>

<style scoped></style>

<script>
export default {
    name: 'Project',
    props: {
        name: String,
        description: String,
        images: Array,
        ytVideoId: String
    },
    methods: {
        relativePath(image) {
            return require('../../assets/projects/' + image);
        }
    },
    computed: {
        ytVideoSrc() {
            return 'https://www.youtube.com/embed/' + this.ytVideoId;
        }
    }
}
</script>
