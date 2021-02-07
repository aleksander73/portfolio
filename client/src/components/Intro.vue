<template>
    <div id="intro">
        <div class="top">
            <img src="../../assets/social/profile.png">
            <p>{{intro}}</p>
        </div>
        <a href="#projects-start">
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
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    height: 30vh;
    margin-bottom: 15vh;
}

.top > img {
    width: 35vh;
    height: 35vh;
    border-radius: 50%;
}

.top p {
    width: 65vh;
    font-size: 1.5em;
    text-align: center;
    line-height: 1.5em;
    color: #dadada;
}

.button {
    font-family: 'Courier New', Courier, monospace;
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
    name: 'Intro',
    props: {
        intro: {
            type: String
        }
    }
}
</script>
