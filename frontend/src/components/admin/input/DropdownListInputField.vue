<template>
  <div class="dropdown-list-input-field-container relative">
    <div :class="mainRowClass()" @click="toggleList()">
      <input type="text" v-model.trim="inputLabel" disabled />
      <div :class="dropDownButtonClass()">
        <img src="../../../../assets/icons/arrow-down.svg" class="svg-white">
      </div>
    </div>
    <div v-if="expanded" class="dropdown">
      <p v-if="!required" @click="onItemSelected(null)">{{ noneSelectedLabel }}</p>
      <p v-for="item in items.sort(sortFunc)" :key="getKey(item)" @click="onItemSelected(item)">{{ getName(item) }}</p>
    </div>
  </div>
</template>

<style scoped>
.dropdown-list-input-field-container {
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

.dropdown > p {
  padding: 5px 10px;
  cursor: default;
}

.dropdown > p:hover {
  background-color: rgb(85, 85, 85);
}
</style>

<script>
export default {
  name: 'DropdownListInputField',
  data() {
    return {
      selectedItem: null,
      expanded: false,
      noneSelectedLabel: 'no selection'
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    required: {
      type: Boolean,
      required: true
    },
    initSelectedItem: {
      type: Object
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
      this.selectedItem = item;
      this.expanded = false;
      this.$emit('input', this.selectedItem);
    }
  },
  computed: {
    inputLabel() {
      return this.selectedItem ? this.getName(this.selectedItem) : this.noneSelectedLabel;
    }
  },
  created() {
    if(this.initSelectedItem) {
      this.selectedItem = this.initSelectedItem;
    } else {
      this.selectedItem = this.required ? this.items.sort(this.sortFunc)[0] : null;
    }
    this.$emit('input', this.selectedItem);
  }
}
</script>
