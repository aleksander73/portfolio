<template>
    <div class="navigation-container">
        <div class="item-container" @click="itemClicked('home')">
            <img :src="require('../../assets/icons/home.svg')" title="home">
        </div>
        <div class="divide"></div>
        <div v-for="item in items" :key="item.id" class="item-container" @click="itemClicked(item.id)">
            <img :src="require(`../../assets/icons/${item.src}`)" :title=item.id>
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

.item-container {
    border-color: rgb(255, 255, 255, 0);
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    margin-top: 10px;
    padding: 7px 7px 3px 7px;
    transition: border-color 0.25s linear;
}

.item-container:hover {
    border-color: rgb(255, 255, 255, 1);
}

.item-container:last-child {
    bottom: 0;
    margin-bottom: 10px;
    position: absolute;
}

.item-container > img {
    filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
    height: 30px;
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
            items: [
                {
                    id: 'projects',
                    src: 'project.svg'
                },
                {
                    id: 'logout',
                    src: 'logout.svg'
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
