<template>
  <div class="multiple-choice-field-container">
    <div :class="mainRowClass()">
      <input type="text" disabled />
      <div class="drop-down-button-container">
        <img src="../../../../assets/other/arrow-down.png" @click="dropList()">
      </div>
    </div>
    <div v-if="expanded" class="list">
      <div v-for="item in items" :key="getKey(item)">
        <p>{{ getName(item) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.multiple-choice-field-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.main-row {
  padding: 10px;
  border: 1px solid white;
  display: flex;
  justify-content: space-between;
}

input {
  background-color: inherit;
  border: 0;
  color: white;
  font-family: inherit;
  font-size: 1em;
  outline: none;
  width: 100%;
}

.drop-down-button-container {
  width: 25px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drop-down-button-container > img {
  height: 60%;
  width: 100%;
  cursor: pointer;
}

.shadow {
  box-shadow: 0 0 4px rgb(45, 165, 235);
}

.list {
  background-color: black;
  border: 1px solid white;
  position: absolute;
  top: 45px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
}
</style>

<script>
export default {
  name: 'MultipleChoiceInputField',
  data() {
    return {
      selectedItems: [],
      expanded: false
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    initSelectedItems: {
      type: Array
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
    mainRowClass() {
      return [
        { class: 'main-row', condition: () => true },
        { class: 'shadow', condition: () => this.expanded }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    dropList() {
      this.expanded = !this.expanded;
    },
    onInput() {
      this.$emit('input', this.selectedItems);
    }
  },
  created() {
    this.items.sort(this.sortFunc);
    this.selectedItems = this.initSelectedItems;
    this.$emit('input', this.selectedItems);
  }
}
</script>
