<template>
  <div class="multiple-choice-field-container">
    <div :class="mainRowClass()" @click="toggleList()">
      <input type="text" v-model.trim="inputLabel" disabled />
      <div :class="dropDownButtonClass()">
        <img src="../../../../assets/other/arrow-down.png">
      </div>
    </div>
    <div v-if="expanded" class="list">
      <CheckboxInputField v-for="item in items.sort(sortFunc)" :key="getKey(item)" 
        :item="item" 
        :getName="getName" 
        :initSelected="selectedItems.includes(item)"
        @selected="onItemSelected"
        @unselected="onItemUnselected"
      />
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
  cursor: pointer;
}

input {
  background-color: inherit;
  border: 0;
  color: white;
  font-family: inherit;
  font-size: 1em;
  outline: none;
  width: 100%;
  cursor: pointer;
}

.drop-down-button-container {
  width: 25px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.15s linear;
}

.flipped {
  transform: scaleY(-1);
}

.drop-down-button-container > img {
  height: 60%;
  width: 100%;
}

.shadow {
  box-shadow: 0 0 4px rgb(45, 165, 235);
}

.list {
  background-color: black;
  border: 1px solid white;
  border-top: 0;
  position: absolute;
  top: 45px;
  width: 100%;
  max-height: 200px;
  overflow-y: overlay;
  padding: 5px 0;
  z-index: 1;
}
</style>

<script>
import CheckboxInputField from './CheckboxInputField';

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
  components: {
    CheckboxInputField
  },
  methods: {
    mainRowClass() {
      return [
        { class: 'main-row', condition: () => true },
        { class: 'shadow', condition: () => this.expanded }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    dropDownButtonClass() {
      return [
        { class: 'drop-down-button-container', condition: () => true },
        { class: 'flipped', condition: () => this.expanded }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    toggleList() {
      this.expanded = !this.expanded;
    },
    onItemSelected(item) {
      this.selectedItems.push(item);
      this.$emit('input', this.selectedItems);
    },
    onItemUnselected(item) {
      this.selectedItems = this.selectedItems.filter(x => x !== item);
      this.$emit('input', this.selectedItems);
    }
  },
  computed: {
    inputLabel() {
      return this.selectedItems.map(x => x.name).sort((x, y) => x.localeCompare(y)).join(', ');
    }
  },
  created() {
    this.selectedItems = this.initSelectedItems;
    this.$emit('input', this.selectedItems);
  }
}
</script>
