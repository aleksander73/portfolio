<template>
  <span class="tag" :style="tagStyle">{{ '#' + label }}</span>
</template>

<style scoped>
.tag {
  border: 1px solid white;
  border-radius: 2px;
  padding: 5px 10px;
  margin: 5px;
  cursor: default;
}
</style>

<script>
export default {
  name: 'Tag',
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    tagStyle() {
      return {
      'border-color': this.color
    };
    }
  }
}
</script>
