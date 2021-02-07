<template>
    <div id="intro">
        <div class="top">
            <img src="../../assets/social/profile.png">
            <p>{{ $t('intro') }}</p>
        </div>
        <a href="#projects-container">
            <button class="button">My projects</button>
        </a>
    </div>
</template>

<style scoped>
#intro {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0f0f0f;
}

.top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 30vh;
    margin-bottom: 10vh;
}

.top > img {
    width: 35vh;
    height: 35vh;
    border-radius: 50%;
    margin-right: 10vh;
}

.top p {
    width: 65vh;
    font-size: 1.5em;
    text-align: center;
    line-height: 1.5em;
}

.button {
    font-family: 'Courier New', Courier, monospace;
    color: #dadada;
    border: 0;
    background-color: rgb(26, 137, 228);
    width: 35vh;
    height: 10vh;
    font-size: 1.5em;
    text-decoration: none;
    cursor: pointer;
    text-transform: uppercase;
}
</style>

<script>
export default {
    name: 'Intro'
}
</script>
