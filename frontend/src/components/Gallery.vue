<template>
    <div class="gallery-container center-y" @mouseenter=onMouseEnterGallery @mouseleave=onMouseLeaveGallery>
        <div class="center-xy" v-if="images.length > 0">
            <div :class=navigationClass>
                <div class="arrow-container">
                    <img :src=arrowImage @mouseenter=toogleArrow @mouseleave=toogleArrow @click=move(-1)>
                </div>
            </div>
            <div class="image-container">
                <img class="image" :src=src(index) alt="image">
            </div>
            <div :class=navigationClass>
                <div class="arrow-container">
                    <img :src=arrowImage @mouseenter=toogleArrow @mouseleave=toogleArrow @click=move(1)>
                </div>
            </div>
        </div>
        <div class="center-xy" v-if="images.length > 1">
            <div class="dot-container center-xy" v-for="(image, index) in images" :key=index>
                <span :class=dotClass(index) @click=select(index)></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gallery-container {
    flex-direction: column;
}

.navigation {
    width: 15%;
    transition: opacity 0.4s ease;
}

.navigation:last-child {
    transform: scaleX(-1)
}

.hidden {
    display: none;
}

.inactive {
    opacity: 0.15;
}

.arrow-container {
    margin-right: 2em;
    display: flex;
    justify-content: flex-end;
}

.arrow-container > img {
    width: 30%;
    transition: transform 0.35s ease;
}

.arrow-container > img:hover {
    cursor: pointer;
}

.arrow-active {
    transform: scale(1.1);
}

.image-container {
    width: 70%;
    height: 400px;
    background-color: #0f0f0f;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.dot-container {
    margin-top: 1em;
}

.dot {
    width: 17px;
    height: 17px;
    border: 1px solid white;
    border-radius: 50%;
    margin: 0 0.3em;
    opacity: 0;
    transition: background-color 0.25s ease, opacity 0.25s ease;
}

.dot:hover {
    cursor: pointer;
}

.dot-awake {
    opacity: 1;
}

.dot-active {
    background-color: rgb(30, 100, 155);
    border-color: rgb(30, 100, 155);
}
</style>

<script>
export default {
    name: 'Gallery',
    data() {
        return {
            index: 0,
            galleryAwake: false
        };
    },
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    methods: {
        move(dir) {
            let n = this.images.length;
            this.index += dir;
            if(this.index < 0 || this.index > n - 1) {
                this.index += -dir * n;
            }
        },
        src(i) {
            return require(`../../../server/uploads/${this.images[i]}`);
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
        dotClass(index) {
            return [
                { class: 'dot', condition: () => true },
                { class: 'dot-awake', condition: () => this.galleryAwake },
                { class: 'dot-active', condition: () => index === this.index }
            ].map(x => x.condition() ? x.class : '').join(' ');
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
                { class: 'navigation', condition: () => true },
                { class: 'hidden', condition: () => this.images.length <= 1 },
                { class: 'inactive', condition: () => !this.galleryAwake }
            ].map(x => x.condition() ? x.class : '').join(' ');
        }
    }
}
</script>
