<template>
    <div>
        <h1>{{name}}</h1>
        <p>{{description}}</p>
    </div>
</template>

<style scoped></style>

<script>
export default {
    name: 'Project',
    props: {
        name: String,
        description: String
    }
}
</script>
