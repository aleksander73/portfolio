<template>
  <div class="text-list-input-field-container">
    <div v-if="items.length > 0" class="list" ref="list">
      <div v-for="(item, i) in items" :key="i" class="list-item">
        <p>{{ item }}</p>
      </div>
    </div>
    <div :class="mainRowClass()">
      <input type="text" v-model.trim="buffer" @focus="onFocus()" @blur="onBlur()" @keydown.enter="addItem()" />
      <div class="button-container center-xy" @click="addItem()">
        <img src="../../../../assets/icons/plus.svg" class="svg-white">
      </div>
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
}

.list-item:nth-child(odd) {
  background-color: rgb(15, 15, 15);
}

.list-item > p {
  cursor: default;
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

.button-container {
  width: 25px;
  margin-left: 10px;
  cursor: pointer;
}

.button-container > img {
  height: 80%;
  width: 100%;
}
</style>

<script>
export default {
  name: 'TextListInputField',
  data() {
    return {
      items: [],
      buffer: '',
      focused: false
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
