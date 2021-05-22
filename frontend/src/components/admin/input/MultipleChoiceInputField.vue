<template>
  <div class="multiple-choice-field-container relative">
    <div :class="mainRowClass()" @click="toggleList()">
      <input type="text" v-model.trim="inputLabel" disabled />
      <div :class="dropDownButtonClass()">
        <img src="../../../../assets/icons/arrow-down.svg" class="svg-white">
      </div>
    </div>
    <div v-if="expanded" class="dropdown">
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
  font-size: 1em;
  width: 100%;
  cursor: pointer;
}

.drop-down-button-container {
  width: 25px;
  margin-left: 10px;
  transition: transform 0.15s linear;
}

.flipped {
  transform: scaleY(-1);
}

.drop-down-button-container > img {
  height: 60%;
  width: 100%;
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
        { class: 'drop-down-button-container center-xy', condition: () => true },
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
      return this.selectedItems.map(x => this.getName(x)).sort((x, y) => x.localeCompare(y)).join(', ');
    }
  },
  created() {
    this.selectedItems = this.initSelectedItems;
    this.$emit('input', this.selectedItems);
  }
}
</script>
