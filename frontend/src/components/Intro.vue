<template>
    <div id="intro" class="center-xy">
        <div class="top center-xy">
            <img src="../../assets/profile.png">
            <p>{{ $t('intro') }}</p>
        </div>
        <div class="scroll-arrow-container center-y" @click=onScrollArrowClick()>
            <span class="scroll-label">{{ $t('see-projects-label') }}</span>
            <div class="scroll-arrow">
                <img src="../../assets/icons/scroll-down.svg" class="svg-white">
            </div>
        </div>
        <div class="external-links">
            <div class="external-link-container" v-for="link in links" :key="link._id">
                <a :href="link.url" target="_blank">
                    <img :src="require(`../../../server/uploads/${link.logo}`)">
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
#intro {
    height: 100vh;
    position: relative;
    flex-direction: column;
    background-image: linear-gradient(#0f0f0f73 90%, #0f0f0fdb);
}

.top {
    width: 75%;
    height: 30vh;
    margin-bottom: 10vh;
}

.top > img {
    width: 30vh;
    height: 30vh;
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
    justify-content: flex-start;
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
    height: 7vh;
}

.external-links {
    position: absolute;
    right: 0;
    margin-right: 3em;
    display: flex;
    flex-direction: column;
}

.external-link-container {
    width: 50px;
    margin: 0.65em 0;
}

.external-link-container img {
    width: 100%;
}
</style>

<script>
export default {
    name: 'Intro',
    props: {
        links: {
            type: Array,
            required: true
        }
    },
    methods: {
        onScrollArrowClick() {
            const mainContent = document.getElementById('main-content');
            mainContent.scrollIntoView();
        }
    }
}
</script>
