<template>
    <div :id="githubRepo" class="project-container">
        <div class="project-header">
            <div class="title-container">
                <div class="title-container-row1">
                    <h1 class="title">{{name}}</h1>
                    <img v-if="technology" class="logo" :src=logoSrc :title="technology.name + ' logo'">
                </div>
                <div class="title-container-row2">
                    <a :href=githubUrl target="_blank" class="github-repo-link" :title=githubUrlTitle><img src="../../assets/external/github.png"></a>
                    <img class="github-version" :src=versionUrl>
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
        <Gallery :images="images" />
        <div v-if="ytVideoId" class="yt-video-container">
            <iframe class="yt-video-item" width='70%' :height="888 / 1.77" :src=ytVideoSrc frameborder='0' allowfullscreen />
        </div>
    </div>
</template>

<style scoped>
.project-container {
    padding: 2em 5em;
    background-color: #0f0f0fdb;
}

.project-header {
    display: flex;
    justify-content: space-between;
}

.title-container {
    width: 60%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.title-container-row1 {
    display: flex;
    justify-content: center;
}

.logo {
    height: 60px;
    margin-left: 20px;
}

.title {
    text-transform: uppercase;
    font-size: 3.5em;
    font-weight: 100;
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
    border-top: 2px solid #e2e2e2;
    border-bottom: 2px solid #e2e2e2;
}

.yt-video-container {
    display: flex;
    justify-content: center;
}

.yt-video-item {
    margin: 3em 0;
}
</style>

<script>
import { storage } from '../storage';
import Technology from './Technology.vue';
import Gallery from './Gallery.vue';

export default {
    name: 'Project',
    components: {
        Technology,
        Gallery
    },
    data() {
        return {
            technology: undefined,
            technologies: []
        }
    },
    props: {
        name: String,
        technologyTag: String,
        githubRepo: String,
        technologyTags: Array,
        description: String,
        images: Array,
        ytVideoId: String
    },
    computed: {
        logoSrc() {
            return require(`../../assets/technologies/${this.technology.icon}`);
        },
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
        if(this.technologyTag) {
            this.technology = storage.technologies.find(technology => technology.tag === this.technologyTag);
        }
        this.technologies = this.technologyTags.map((tag) => {
            return storage.technologies.find(technology => technology.tag === tag);
        });
    }
}
</script>
