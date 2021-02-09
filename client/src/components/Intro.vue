<template>
    <div id="intro">
        <div class="top">
            <img src="../../assets/social/profile.png">
            <p>{{ $t('intro') }}</p>
        </div>
        <button class="button" @click=onButtonClick()>{{ $t('projects-btn') }}</button>
        <div class="social-links">
            <div class="social-link-container" v-for="link in socialLinks" :key="link.urlTag">
                <a :href="$t(link.urlTag)" target="_blank">
                    <img :src="require(`../../assets/social/${link.src}`)">
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
#intro {
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0f0f0fad;
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
    background-color: #1a89e4;
    width: 35vh;
    height: 10vh;
    font-size: 1.5em;
    text-decoration: none;
    cursor: pointer;
    text-transform: uppercase;
}

.social-links {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
}

.social-link-container {
    width: 70px;
    margin: 1em 3em 1em 0;
}

.social-link-container img {
    width: 100%;
}

.filter-white{
    filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
}
</style>

<script>
export default {
    name: 'Intro',
    data() {
        return {
            socialLinks: [
                {
                    urlTag: "github-url",
                    src: "github.png"
                },
                {
                    urlTag: "linkedin-url",
                    src: "linkedin.png"
                },
                {
                    urlTag: "youtube-url",
                    src: "youtube.png"
                }
            ]
        };
    },
    methods: {
        onButtonClick() {
            const mainContent = document.getElementById('main-content');
            mainContent.scrollIntoView();
        }
    }
}
</script>
