<template>
    <div class="project-container">
        <div class="project-header">
            <div class="title-container">
                <h1 class="title">{{name}}</h1>
                <div class="title-container-row2">
                    <a :href=githubUrl target="_blank" class="github-repo-link" :title=githubUrlTitle><img src="../../assets/social/github.svg" class="filter-white"></a>
                    <img v-if=githubRepo class="github-version" :src=versionUrl>
                </div>
            </div>
            <div class="tech-stack">
                <div v-for="(technology, index) in technologies" :key=index>
                    <Technology :name=technology.name :icon=technology.icon />
                </div>
            </div>
        </div>
        <div class="description">
            <p>{{description}}</p>
        </div>
        <div class="gallery-container">
            <img class="gallery-item" v-for="(image, index) in images" :key="index" :src="relativePath(image)" alt="image">
        </div>
        <div v-if="ytVideoId" class="yt-video-container">
            <iframe class="yt-video-item" width='560' height='315' :src=ytVideoSrc frameborder='0' allowfullscreen />
        </div>
    </div>
</template>

<style scoped>
.project-container {
    padding: 2em 5em;
    background-color:#0f0f0f;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: top;
}

.title-container {
    width: 60%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.title {
    text-transform: uppercase;
    font-size: 3.5em;
    font-weight: 100;
    color: #dadada;
}

.title-container-row2 {
    display: flex;
    align-items: center;
}

.github-version {
    height: min-content;
}

.github-repo-link {
    margin-right: 1.5em;
}

.github-repo-link > img {
    height: 50px;
}

.filter-white{
    filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
}

.tech-stack {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.description {
    margin: 1.5em auto;
    padding: 2em 15%;
    font-size: 1.5em;
    text-align: center;
    line-height: 1.5em;
    color: #dadada;
    border-top: 2px solid #c5c5c5;
    border-bottom: 2px solid #c5c5c5;
}

.gallery-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;    
}

.gallery-item {
    border-radius: 10px;
    width: 45%;
    margin: 0.75em;
}

.yt-video-container {
    display: flex;
    justify-content: center;
}

.yt-video-item {
    margin: 1em 0;
}
</style>

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
        githubRepo: String,
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
        githubUrl() {
            return `https://github.com/aleksander73/${this.githubRepo}`;
        },
        githubUrlTitle() {
            return `Visit ${this.name} repository on GitHub`;
        },
        versionUrl() {
            return `https://img.shields.io/github/tag/aleksander73/${this.githubRepo}.svg?label=version&style=for-the-badge`;
        },
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
