<template>
  <div class="list-container">
    <div class="item" @click="itemClicked(null)">
        <img src="../../../assets/icons/plus.png" alt="">
    </div>
    <div v-for="item in data" :key="getKey(item)" class="item" @click="itemClicked(item)">
      <div class="item-name">{{ getName(item) }}</div>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80vh;
}

.item {
  border: 1px solid white;
  cursor: pointer;
  margin: 5px 0;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 50%;
}

.item > img {
  height: 100%;
}

.item > .item-name {
  font-size: 1.2em;
  text-transform: uppercase;
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
