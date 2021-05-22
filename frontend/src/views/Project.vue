<template>
    <div class="center-x">
        <div class="project-container">
            <div class="project-header">
                <div class="title-container">
                    <div class="center-x">
                        <h1 class="title">{{ project.name }}</h1>
                        <img v-if="project.technology" class="logo" :src=logoSrc :title="project.technology.name + ' logo'">
                    </div>
                    <div class="title-container-row2 center-y">
                        <img class="project-status" :src=statusUrl>
                        <img class="github-version" :src=versionUrl>
                    </div>
                    <div class="title-container-row3 center-y">
						<a v-if="project.githubRepo" :href="githubUrl" target="_blank"><button :style="githubButtonStyle">Visit on GitHub</button></a>
                    </div>
                </div>
                <div class="tech-stack">
                    <div v-for="(technology, index) in project.technologies" :key=index>
                        <Technology :name=technology.name :icon=technology.icon />
                    </div>
                </div>
            </div>
            <div class="description">
                <p>{{ project.description }}</p>
            </div>
            <div v-if="project.features.length > 0 || project.highlights.length > 0" class="description-extended">
                <div v-if="project.features.length > 0" class="fh-container">
                    <div class="hf-title center-xy">
						<img src="../../assets/icons/leaf.svg">
						<h3>Features</h3>
					</div>
                    <ul>
                        <li v-for="(feature, index) in project.features" :key="index">{{ feature }}</li>
                    </ul>
                </div>
                <div v-if="project.highlights.length > 0" class="fh-container">
                    <div class="hf-title center-xy">
						<img src="../../assets/icons/exclamation_mark.svg" class="svg-red">
						<h3>Highlights</h3>
					</div>
                    <ul>
                        <li v-for="(highlight, index) in project.highlights" :key="index">{{ highlight }}</li>
                    </ul>
                </div>
            </div>
            <div v-if="project.pictures.length > 0" class="gallery-container">
				<Gallery :imagePaths="project.pictures" :color="project.color" />
			</div>
            <div v-if="project.ytVideoId" class="center-x">
                <iframe class="yt-video-item" width="950px" height="536px" :src=ytVideoSrc frameborder='0' allowfullscreen />
            </div>
        </div>
    </div>
</template>

<style scoped>
.project-container {
    background-color: #0f0f0f;
    min-height: calc(100vh - 4em);
    padding: 2em 5em;
    width: 70%;
}

.project-header {
    display: flex;
    justify-content: space-between;
	margin-top: 10px;
}

.title-container {
    width: 60%;
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

.title-container > div:nth-child(2) {
    margin-top: 5px;
}

.title-container > div:nth-child(2) > * {
    margin-right: 15px;
}

.title-container > div:nth-child(3) {
    margin: 20px 0 0 0;
}

.title-container > div:nth-child(3) > a > button {
	border-width: 1px;
	border-style: solid;
	border-color: white;
	background-color: rgb(13, 17, 23);
}

.title-container > div:nth-child(3) > a > button:hover {
	background-color: rgb(21, 28, 37);
}

.tech-stack {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.description {
    margin-top: 20px;
    padding: 2em 15%;
    font-size: 1.25em;
    text-align: center;
    line-height: 1.5em;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
}

.description-extended {
    display: flex;
    justify-content: space-evenly;
	margin-top: 50px;
}

.fh-container {
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 25px 50px;
    width: 35%;
	position: relative;
}

.hf-title {
	position: absolute;
	top: -18px;
	left: 25px;
	background-color: #0f0f0f;
	padding: 5px 15px;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 18px;
}

.hf-title > img {
	height: 20px;
	width: 20px;
	margin-right: 10px;
}

.hf-title > h3 {
	font-size: 1.1em;
}

.description-extended li {
    font-size: 1.1em;
}

.project-container > .gallery-container {
	margin-top: 50px;
}

.yt-video-item {
    margin: 3em 0;
}
</style>

<script>
import { Gallery, Technology } from '../components';
import { apiClient } from '../api';
import { dataAssembler } from '../assembler';

export default {
    name: 'Project',
    title() {
        return this.project.name;
    },
    components: {
        Technology,
        Gallery
    },
    data() {
        return {
            project: null
        }
    },
    async beforeRouteEnter(to, from, next) {
        const project = dataAssembler.assebleProject(
            (await apiClient.getProjects()).find(x => x._id === to.params.id),
            await apiClient.getTechnologies()
        );
        project.technologies.sort((x, y) => x.name.localeCompare(y.name));
        next(vm => vm.project = project);
    },
    computed: {
        logoSrc() {
            return this.project.technology ? require(`../../../server/uploads/${this.project.technology.icon}`) : '';
        },
        versionUrl() {
            const github = this.project.githubRepo;
            const color = this.project.color.substring(1);
            return `https://img.shields.io/github/tag/aleksander73/${github}.svg?label=version&style=for-the-badge&color=${color}`;
        },
        statusUrl() {
            const status = this.project.status;
            const color = this.project.color.substring(1);
            return `https://img.shields.io/static/v1?label=status&message=${status}&style=for-the-badge&color=${color}`;
        },
		githubUrl() {
            return `https://github.com/aleksander73/${this.project.githubRepo}`;
        },
        githubButtonStyle() {
            return {
                'border-color': this.project.color
            };
        },
        ytVideoSrc() {
            return `https://www.youtube.com/embed/${this.project.ytVideoId}`;
        }
    }
}
</script>
