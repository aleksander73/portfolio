<template>
    <div class="index-container">
        <div class="index">
            <div class="items-container center-y">
                <div class="index-item" v-for="project in projects" :key="project._id" @click=onIndexItemClick(project)>{{project.name}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.index-container {
    background-color: #0f0f0fdb;
    width: 20%;
    margin: 0 auto;
    text-align: center;
}

.index {
    position: sticky;
    top: 0;
    padding: 3em 0;
    width: 75%;
    margin: 0 auto;
}

.items-container {
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - 6em);
}

.index-item {
    margin-bottom: 0.75em;
    padding: 0.3em;
    font-size: 1.25em;
    width: 80%;
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
            const projectElement = document.getElementById('project-' + project._id);
            projectElement.scrollIntoView();
        }
    }
}
</script>
