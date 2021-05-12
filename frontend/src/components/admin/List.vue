<template>
  <div class="list-container">
    <div class="item center-xy" @click="itemClicked(null)">
        <img src="../../../assets/icons/plus.svg" class="svg-white">
    </div>
    <div v-for="item in data" :key="getKey(item)" class="item center-xy" @click="itemClicked(item)">
      <div class="item-name">{{ getName(item) }}</div>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 75vh;
  overflow-y: overlay;
}

.item {
  border: 1px solid white;
  cursor: pointer;
  margin: 5px 0;
  padding: 10px 0;
  height: 20px;
  width: 35%;
  transition: background-color 0.25s ease;
}

.item:hover {
  background-color: rgb(50, 50, 50);
}

.item > img {
  height: 100%;
}

.item > .item-name {
  font-size: 1.2em;
}
</style>

<script>
export default {
  name: 'List',
  props: {
    data: {
      type: Array,
      required: true
    },
    getKey: {
      type: Function,
      required: true
    },
    getName: {
      type: Function,
      required: true
    },
    sortFunc: {
      type: Function
    }
  },
  methods: {
    itemClicked(item) {
      this.$emit('itemClicked', item);
    }
  },
  created() {
    this.data.sort(this.sortFunc);
  }
}
</script>
