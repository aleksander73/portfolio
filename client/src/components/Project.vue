<template>
    <div>
        <h1>{{name}}</h1>
        <Technology v-for="(technology, index) in technologies" :key=index :name=technology.name :icon=technology.icon />
        <p>{{description}}</p>
        <img v-for="(image, index) in images" :key="index" :src="relativePath(image)" alt="image">
        <iframe width='560' height='315' :src=ytVideoSrc frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen />
    </div>
</template>

<style scoped></style>

<script>
import Storage from '../Storage';
import Technology from './Technology.vue';

export default {
    name: 'Project',
    components: {
        Technology
    },
    data() {
        return {
            technologies: []
        }
    },
    props: {
        name: String,
        technologyTags: Array,
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
    },
    created() {
        this.technologies = this.technologyTags.map((tag) => {
            return Storage.getTechnologies().find(technology => technology.tag === tag);
        });
    }
}
</script>
