<template>
  <div class="list-container">
    <div class="item" @click="itemClicked(null)">
      <div class="item-name">[+]</div>
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
  margin: 5px 0;
  padding: 10px 0;
  text-align: center;
  width: 50%;
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
