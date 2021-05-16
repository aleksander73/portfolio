<template>
    <div :id="githubRepo" class="project-container">
        <div class="project-header">
            <div class="title-container">
                <div class="center-x">
                    <h1 class="title">{{name}}</h1>
                    <img v-if="technology" class="logo" :src=logoSrc :title="technology.name + ' logo'">
                </div>
                <div class="center-y">
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
        <p v-for="feature in features" :key="feature">{{ feature }}</p>
        <Gallery :images="pictures" />
        <div v-if="ytVideoId" class="center-x">
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

.logo {
    height: 50px;
    margin: auto 20px;
}

.title {
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
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
    margin: 1.25em auto;
    padding: 2em 15%;
    font-size: 1.25em;
    text-align: center;
    line-height: 1.5em;
    border-top: 2px solid #e2e2e2;
    border-bottom: 2px solid #e2e2e2;
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
        description: String,
        features: Array,
        githubRepo: String,
        technologyIds: Array,
        technologyId: String,
        pictures: Array,
        ytVideoId: String
    },
    computed: {
        logoSrc() {
            return require(`../../../server/uploads/${this.technology.icon}`);
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
        if(this.technologyId) {
            this.technology = storage.technologies.find(technology => technology._id === this.technologyId);
        }
        this.technologies = this.technologyIds.map(_id => storage.technologies.find(technology => technology._id === _id));
        this.technologies.sort((x, y) => x.name.localeCompare(y.name));
    }
}
</script>
