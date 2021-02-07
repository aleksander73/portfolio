<template>
    <div class="gallery-container" @mouseenter=onMouseEnterGallery @mouseleave=onMouseLeaveGallery>
        <div class="row-content" v-if="images.length > 0">
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
        <div class="dots" v-if="images.length > 1">
            <div class="dot-container" v-for="(image, index) in images" :key=index>
                <span :class=dotClass(index) @click=select(index)></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gallery-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.row-content {
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

.dots {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dot-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
}

.dot {
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-radius: 50%;
    margin: 0 0.3em;
    opacity: 0;
    transition: background-color 0.5s ease, opacity 0.5s ease;
}

.dot:hover {
    cursor: pointer;
}

.dot-awake {
    opacity: 1;
}

.dot-active {
    background-color: #1a89e4;
    border-color:#1a89e4;
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
        },
        dotClass(index) {
            let staticClasses = 'dot';
            let dynamicClasses = '';
            if(this.galleryAwake) {
                dynamicClasses += ' dot-awake';
            }
            if(index === this.index) { 
                dynamicClasses += ' dot-active';
            }

            return `${staticClasses} ${dynamicClasses}`;
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
