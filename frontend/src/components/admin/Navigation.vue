<template>
    <div class="navigation-container">
        <div class="navigation-slot" v-for="(item, i) in items" :key="item.id">
            <div :class="itemClass(item.id)" @click="itemClicked(item.id)">
                <img :src="require(`../../../assets/icons/${item.src}`)" :title=item.id>
            </div>
            <div v-if="i === 0" class="divide"></div>
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
    position: sticky;
    top: 0;
}

.navigation-slot {
    margin-top: 10px;
}

.navigation-slot:last-child {
    bottom: 0;
    margin-bottom: 10px;
    position: absolute;
}

.item-container {
    cursor: pointer;
    padding: 7px 7px 3px 7px;
    transition: filter 0.25s linear;
}

.selected {
    filter: invert(49%) sepia(94%) saturate(579%) hue-rotate(62deg) brightness(96%) contrast(107%);
}

.item-container > img {
    filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
    height: 30px;
    width: 30px;
}

.divide {
    border-top: 1px  solid white;
    margin-top: 10px;
}
</style>

<script>
export default {
    name: 'Navigation',
    data() {
        return {
            items: [
                {
                    id: 'home',
                    src: 'home.svg'
                },
                {
                    id: 'projects',
                    src: 'project.svg'
                },
                {
                    id: 'logout',
                    src: 'logout.svg'
                }
            ],
            selectedItemId: 'home'
        }
    },
    methods: {
        itemClicked(id) {
            this.selectedItemId = id;
            this.$emit('itemSelected', id);
        },
        itemClass(id) {
            return [
                {
                    class: 'item-container',
                    condition: () => true
                },
                {
                    class: 'selected',
                    condition: () => id === this.selectedItemId && id !== 'logout'
                }
            ].map(x => x.condition() ? x.class : '').join(' ');
        }
    }
}
</script>
