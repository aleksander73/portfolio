<template>
    <div>
        <h1>{{name}}</h1>
        <p>{{description}}</p>
        <img v-for="(image, index) in images" :key="index" :src="relativePath(image)" alt="image">
    </div>
</template>

<style scoped></style>

<script>
export default {
    name: 'Project',
    props: {
        name: String,
        description: String,
        images: Array
    },
    methods: {
        relativePath(image) {
            return require('../../assets/projects/' + image);
        }
    }
}
</script>
