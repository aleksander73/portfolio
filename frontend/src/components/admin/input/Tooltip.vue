<template>
  <div class="tooltip-container center-xy">
      <img src="../../../../assets/icons/info.svg" class="svg-blue" @mouseenter="showHint = true" @mouseleave="showHint = false">
      <div :class="hintClass()">
          <span>{{ hint }}</span>
      </div>
  </div>
</template>

<style scoped>
.tooltip-container {
    position: relative;
    margin: 0 5px;
}

.tooltip-container > img {
    height: 17px;
    width: 17px;
}

.hint-container {
    background-color: black;
    border: 1px solid white;
    border-radius: 2px;
    padding: 5px 10px;
    min-width: 150px;
    position: absolute;
    left: 16px;
    bottom: 25px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.25s linear;
}

.show-hint {
    z-index: 0;
    opacity: 1;
}
</style>

<script>
export default {
    name: 'Tooltip',
    data() {
        return {
            showHint: false
        }
    },
    props: {
        hint: {
            type: String,
            required: true
        }
    },
    methods: {
        hintClass() {
            return [
                { class: 'hint-container center-xy', condition: () => true },
                { class: 'show-hint', condition: () => this.showHint }
            ].map(x => x.condition() ? x.class : '').join(' ');
        }
    }
}
</script>
