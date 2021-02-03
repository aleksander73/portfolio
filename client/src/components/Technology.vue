<template>
    <div>
        <img :src=iconPath() :title=name />
    </div>
</template>

<style scoped></style>

<script>
export default {
    name: 'Technology',
    props: {
        name: String,
        icon: String
    },
    methods: {
        iconPath() {
            return require('../../assets/technologies/' + this.icon);
        }
    },
}
</script>
