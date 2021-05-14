<template>
  <div class="text-list-input-field-container">
    <div v-if="items.length > 0" class="list" ref="list">
      <div v-for="(item, i) in items" :key="i" :class="listItemClass(i)" @mouseenter="showItemControls(i)" @mouseleave="hideItemControls(i)">
        <div class="text-container">
          <p>{{ item }}</p>
        </div>
        <div :class="controlButtonClass(i)">
          <button class="edit-button center-xy" @click="editItem(item, i)">
            <img src="../../../../assets/icons/edit.svg" class="svg-blue">
          </button>
          <button class="delete-button center-xy" @click="deleteItem(i)">
            <img src="../../../../assets/icons/delete.svg" class="svg-red">
          </button>
        </div>
      </div>
    </div>
    <div :class="mainRowClass()">
      <input type="text" v-model.trim="buffer" ref="input" @focus="onFocus()" @blur="onBlur()" @keydown.enter="upsertItem()" />
      <button :class="mainButtonClass()" @click="onMainButtonClick()">
        <img src="../../../../assets/icons/plus.svg" :class="mainImageClass()">
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
  max-height: 135px;
  overflow-y: auto;
  padding: 1px;
}

.list-item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-width: 1px;
  border-style: solid;
  border-color: #00000000;
  transition: border-color 0.5s ease-in-out;
}

.list-item:nth-child(odd) {
  background-color: rgb(15, 15, 15);
}

.list-item-edited {
  animation: blink 3s linear infinite;
}

@keyframes blink {
  0% {
    border-color: rgb(30, 100, 155, 0);
  }
  20% {
    border-color: rgb(30, 100, 155, 1);
  }
  80% {
    border-color: rgb(30, 100, 155, 1);
  }
  100% {
    border-color: rgb(30, 100, 155, 0);
  }
}

p {
  cursor: default;
}

.control-buttons {
  opacity: 0;
  transition: opacity 0.15s ease-in;
  z-index: -1;
}

.show-controls {
  opacity: 1;
  z-index: 0;
}

.control-buttons > button {
  background-color: inherit;
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

.main-button {
  background-color: inherit;
  padding: 0;
  margin-left: 10px;
  height: 20px;
  min-width: 0;
  width: 25px;
  transform: rotate(0) scale(1);
  transition: transform 0.25s linear;
}

.main-button > img {
  height: 80%;
  transition: filter 0.25s linear;
}

.tilted {
  transform: rotate(-45deg) scale(1.25);
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
      active: [],
      modes: {
        ADDITION: 0,
        EDITION: 1
      },
      mode: 0,
      editedItemIndex: -1
    }
  },
  props: {
    initItems: {
      type: Array
    }
  },
  methods: {
    upsertItem() {
      if(!this.buffer) return
      if(this.mode === this.modes.ADDITION) {
        this.items.push(this.buffer);
        const list = this.$refs['list'];
        if(list) {
          this.$nextTick(() => {
            list.scrollTop = list.scrollHeight - list.clientHeight;
          });
        }
      } else if(this.mode === this.modes.EDITION) {
        this.items[this.editedItemIndex] = this.buffer;
        this.mode = this.modes.ADDITION;
        this.editedItemIndex = -1;
      }
      this.buffer = '';
      this.$emit('input', this.items);
    },
    editItem(item, index) {
      this.mode = this.modes.EDITION;
      this.buffer = item;
      this.editedItemIndex = index;
      this.$refs['input'].focus();
    },
    deleteItem(itemIndex) {
      this.items = this.items.filter((item, i) => i !== itemIndex);
      this.$emit('input', this.items);
    },
    onMainButtonClick() {
      if(this.mode === this.modes.ADDITION) {
        this.upsertItem();
      } else if(this.mode === this.modes.EDITION) {
        this.cancelEditing();
      }
    },
    cancelEditing() {
      this.mode = this.modes.ADDITION;
      this.buffer = '';
      this.editedItemIndex = -1;
    },
    listItemClass(i) {
      return [
        { class: 'list-item', condition: () => true },
        { class: 'list-item-edited', condition: () => this.editedItemIndex === i }
      ].map(x => x.condition() ? x.class : '').join(' ');
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
        { class: 'show-controls', condition: () => this.active[i] && this.mode == this.modes.ADDITION}
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    mainRowClass() {
      return [
        { class: 'main-row', condition: () => true },
        { class: 'shadow', condition: () => this.focused }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    mainButtonClass() {
      return [
        { class: 'main-button center-xy', condition: () => true },
        { class: 'tilted', condition: () => this.mode === this.modes.EDITION }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    mainImageClass() {
      return [
        { class: 'svg-white', condition: () => this.mode === this.modes.ADDITION },
        { class: 'svg-red', condition: () => this.mode === this.modes.EDITION }
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
