<template>
    <div class="index-container">
        <div class="index">
            <div class="items-container">
                <div class="index-item" v-for="project in projects" :key="project.githubRepo" @click=onIndexItemClick(project)>{{project.name}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.index-container {
    background-color: #0f0f0fad;
    width: 10%;
    margin: 0 auto;
    padding: 0 5em;
    text-align: center;
}

.index {
    position: sticky;
    top: 0;
    padding-top: 3em;
}

.items-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.index-item {
    margin-bottom: 1em;
    padding: 0.5em;
    font-size: 1.25em;
    width: 100%;
    border: 1px solid #e2e2e2;
    text-align: center;
    cursor: pointer;
}

a {
    color: inherit;
    text-decoration: none;
}
</style>

<script>
export default {
    name: 'Index',
    props: {
        projects: Array
    },
    methods: {
        onIndexItemClick(project) {
            const projectElement = document.getElementById(project.githubRepo);
            projectElement.scrollIntoView();
        }
    }
}
</script>
