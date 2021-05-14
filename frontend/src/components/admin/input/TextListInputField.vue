<template>
  <div class="text-list-input-field-container">
    <div v-if="items.length > 0" class="list" ref="list">
      <div v-for="(item, i) in items" :key="i" class="list-item" @mouseenter="showItemControls(i)" @mouseleave="hideItemControls(i)">
        <div class="text-container">
          <p>{{ item }}</p>
        </div>
        <div :class="controlButtonClass(i)">
          <button class="edit-button center-xy" @click="editItem(item)">
            <img src="../../../../assets/icons/edit.svg" class="svg-blue">
          </button>
          <button class="delete-button center-xy" @click="deleteItem(item)">
            <img src="../../../../assets/icons/delete.svg" class="svg-red">
          </button>
        </div>
      </div>
    </div>
    <div :class="mainRowClass()">
      <input type="text" v-model.trim="buffer" @focus="onFocus()" @blur="onBlur()" @keydown.enter="addItem()" />
      <button class="add-button center-xy" @click="addItem()">
        <img src="../../../../assets/icons/plus.svg" class="svg-white">
      </button>
    </div>
  </div>
</template>

<style scoped>
.text-list-input-field-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list {
  border: 1px solid white;
  border-bottom: 0;
  max-height: 128px;
  overflow-y: auto;
}

.list-item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.list-item:nth-child(odd) {
  background-color: rgb(15, 15, 15);
}

p {
  cursor: default;
}

.control-buttons {
  opacity: 0;
  transition: opacity 0.15s ease-in;
}

.show-controls {
  opacity: 1;
}

.control-buttons > button {
  background-color: #000000;
  min-width: 0;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 0 5px;
}

.control-buttons > button > img {
  height: 90%;
}

.main-row {
  padding: 10px;
  border: 1px solid white;
  display: flex;
  justify-content: space-between;
}

input {
  font-size: 1em;
  width: 100%;
}

.add-button {
  background-color: inherit;
  padding: 0;
  margin-left: 10px;
  height: auto;
  min-width: 0;
  width: 25px;
}

.add-button > img {
  height: 80%;
}
</style>

<script>
export default {
  name: 'TextListInputField',
  data() {
    return {
      items: [],
      buffer: '',
      focused: false,
      active: []
    }
  },
  props: {
    initItems: {
      type: Array
    }
  },
  methods: {
    addItem() {
      if(!this.buffer) return
      this.items.push(this.buffer);
      this.buffer = '';
      this.$emit('input', this.items);
      this.$nextTick(() => {
        const list = this.$refs['list'];
        list.scrollTop = list.scrollHeight - list.clientHeight;
      });
      this.$emit('input', this.items);
    },
    deleteItem(item) {
      this.items = this.items.filter(i => i !== item);
      this.$emit('input', this.items);
    },
    showItemControls(i) {
      this.active[i] = true;
      this.active = [...this.active];
    },
    hideItemControls(i) {
      this.active[i] = false;
      this.active = [...this.active];
    },
    controlButtonClass(i) {
      return [
        { class: 'control-buttons center-x', condition: () => true },
        { class: 'show-controls', condition: () => this.active[i] }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    mainRowClass() {
      return [
        { class: 'main-row', condition: () => true },
        { class: 'shadow', condition: () => this.focused }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  },
  created() {
    this.items = this.initItems;
  }
}
</script>
