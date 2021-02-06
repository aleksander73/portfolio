<template>
    <div class="gallery-container" v-if="images.length > 0" @mouseenter=onMouseEnterGallery @mouseleave=onMouseLeaveGallery>
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
</template>

<style scoped>
.gallery-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    transition: transform 0.5s ease;
}

.arrow-container > img:hover {
    cursor: pointer;
}

.arrow-active {
    transform: scale(1.2);
}

.image-container {
    width: 70%;
    height: 500px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
            return require(`../../assets/projects/${this.images[i]}`);
        },
        onMouseEnterGallery() {
            this.galleryAwake = true;
        },
        onMouseLeaveGallery() {
            this.galleryAwake = false;
        },
        toogleArrow(event) {
            event.target.classList.toggle('arrow-active');
        }
    },
    computed: {
        arrowImage() {
            return require('../../assets/other/arrow-left.png');
        },
        navigationClass() {
            let staticClasses = 'navigation';
            let dynamicClasses = '';
            if(this.images.length <= 1) {
                dynamicClasses += ' hidden'
            } else if(!this.galleryAwake) {
                dynamicClasses += ' inactive';
            }
            return `${staticClasses} ${dynamicClasses}`;
        }
    }
}
</script>
