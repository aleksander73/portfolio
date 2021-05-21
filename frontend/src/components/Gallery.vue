<template>
    <div class="gallery-container center-y">
        <div class="gallery center-xy" v-if="images.length > 0" @mouseenter="onMouseEnterGallery" @mouseleave="onMouseLeaveGallery">
            <div :class="navigationClass">
                <div class="arrow-container">
                    <img :src="arrowImage" @mouseenter="toogleArrow" @mouseleave="toogleArrow" @click="move(-1)">
                </div>
            </div>
            <div class="image-container">
                <div class="image" :style="imageStyle()" alt="image"></div>
            </div>
            <div :class="navigationClass">
                <div class="arrow-container">
                    <img :src="arrowImage" @mouseenter="toogleArrow" @mouseleave="toogleArrow" @click="move(1)">
                </div>
            </div>
            <div class="dots-container center-xy" v-if="images.length > 1">
                <div class="center-xy" v-for="(image, index) in images" :key="index">
                    <span :class="dotClass" :style="dotStyle(index)" @click="select(index)"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gallery-container {
    flex-direction: column;
}

.gallery {
    position: relative;
    height: 536px;
    width: 950px;
}

.gallery > * {
    height: 100%;
}

.navigation {
    width: 10%;
    transition: opacity 0.4s ease;
    position: absolute;
    left: 0;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), #0000);
}

.navigation:nth-child(3) {
    transform: scaleX(-1);
    left: inherit;
    right: 0;
}

.hidden {
    display: none;
}

.inactive {
    opacity: 0.25;
}

.arrow-container {
    height: 15%;
    width: 45%;
}

.arrow-container > img {
    height: 100%;
    width: 100%;
    transition: transform 0.35s ease;
}

.arrow-container > img:hover {
    cursor: pointer;
}

.arrow-active {
    transform: scale(1.1);
}

.image-container {
    background-color: #0f0f0f;
    height: 100%;
    width: 100%;
}

.image {
    height: 100%;
    width: 100%;
    background-repeat: round;
    transition: background-image 0.25s linear
}

.dots-container {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    margin: 10px 0;
}

.dot {
    width: 17px;
    height: 17px;
    border-width: 1px;
    border-style: solid;
    border-radius: 50%;
    margin: 0 0.3em;
    opacity: 0;
    transition: background-color 0.25s linear, opacity 0.25s linear;
}

.dot:hover {
    cursor: pointer;
}

.dot-awake {
    opacity: 1;
}
</style>

<script>
export default {
    name: 'Gallery',
    data() {
        return {
            images: [],
            index: 0,
            galleryAwake: false
        };
    },
    props: {
        imagePaths: {
            type: Array,
            required: true
        },
        color: {
            type: String
        }
    },
    methods: {
        move(dir) {
            const n = this.images.length;
            this.index += dir;
            if(this.index < 0 || this.index > n - 1) {
                this.index += -dir * n;
            }
        },
        onMouseEnterGallery() {
            this.galleryAwake = true;
        },
        onMouseLeaveGallery() {
            this.galleryAwake = false;
        },
        toogleArrow(event) {
            event.target.classList.toggle('arrow-active');
        },
        imageStyle() {
            const src = this.images[this.index];
            return {
                'background-image': `url(${src})`
            };
        },
        dotStyle(index) {
            return {
                'background-color': index === this.index ? this.color : 'rgba(255, 255, 255, 0.75)',
                'border-color': index === this.index ? this.color : 'black'
            };
        },
        select(index) {
            this.index = index;
        }
    },
    computed: {
        arrowImage() {
            return require('../../assets/other/arrow-left.png');
        },
        navigationClass() {
            return [
                { class: 'navigation center-xy', condition: () => true },
                { class: 'hidden', condition: () => this.images.length <= 1 },
                { class: 'inactive', condition: () => !this.galleryAwake }
            ].map(x => x.condition() ? x.class : '').join(' ');
        },
        dotClass() {
            return [
                { class: 'dot', condition: () => true },
                { class: 'dot-awake', condition: () => this.galleryAwake },
            ].map(x => x.condition() ? x.class : '').join(' ');
        }
    },
    created() {
        this.images = this.imagePaths.map(x => require(`../../../server/uploads/${x}`));
    }
}
</script>
