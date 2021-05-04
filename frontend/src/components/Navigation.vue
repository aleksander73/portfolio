<template>
    <div class="navigation-container">
        <div class="section-container" @click="itemClicked('home')">
            <img :src="require('../../assets/icons/home.svg')" title="home">
        </div>
        <div class="divide"></div>
        <div v-for="section in sections" :key="section.id">
            <div class="section-container" @click="itemClicked(section.id)">
                <img :src="require(`../../assets/icons/${section.src}`)" :title=section.id>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navigation-container {
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 70px;
}

.section-container {
    align-items: center;
    border-color: rgb(255, 255, 255, 0);
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding: 7px;
    transition: border-color 0.25s linear;
}

.section-container:hover {
    border-color: rgb(255, 255, 255, 1);
}

.section-container > img {
    filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
    width: 30px;
}

.divide {
    border-top: 1px  solid white;
    margin-top: 10px;
    width: 75%;
}
</style>

<script>
export default {
    name: 'Navigation',
    data() {
        return {
            sections: [
                {
                    id: 'projects',
                    src: 'project.svg'
                }
            ]
        }
    },
    methods: {
        itemClicked(id) {
            this.$emit('itemClicked', { navItemId: id });
        }
    }
}
</script>
