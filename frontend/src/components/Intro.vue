<template>
    <div id="intro">
        <div class="top">
            <img src="../../assets/external/profile.png">
            <p>{{ $t('intro') }}</p>
        </div>
        <div class="scroll-arrow-container" @click=onScrollArrowClick()>
            <span class="scroll-label">{{ $t('see-projects-label') }}</span>
            <div class="scroll-arrow">
                <img src="../../assets/other/arrow-down.png" >
            </div>
        </div>
        <div class="external-links">
            <div class="external-link-container" v-for="link in externalLinks" :key="link.urlTag">
                <a :href="$t(link.urlTag)" target="_blank">
                    <img :src="require(`../../assets/external/${link.src}`)">
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

.scroll-arrow-container {
    height: 12vh;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

.scroll-label {
    font-size: 1.4em;   
    margin-bottom: 0.5em;
}

.scroll-arrow {
    animation: scroll-me 1.25s infinite alternate;
}

@keyframes scroll-me {
    from {
        opacity: 0;
        margin-top: 0;
    }
    to {
        opacity: 1;
        margin-top: 2vh;
    }
}

.scroll-arrow img {
    height: 6vh;
}

.external-links {
    position: absolute;
    right: 0;
    margin-right: 3em;
    display: flex;
    flex-direction: column;
}

.external-link-container {
    width: 60px;
    margin: 0.75em 0;
}

.external-link-container img {
    width: 100%;
}
</style>

<script>
export default {
    name: 'Intro',
    data() {
        return {
            externalLinks: [
                {
                    urlTag: "github-url",
                    src: "github.png"
                },
                {
                    urlTag: "codewars-url",
                    src: "codewars.png"
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
        onScrollArrowClick() {
            const mainContent = document.getElementById('main-content');
            mainContent.scrollIntoView();
        }
    }
}
</script>
