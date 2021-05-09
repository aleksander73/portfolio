<template>
  <div class="checkbox-input-field-container">
    <div class="checkbox-container" @click="onCheckboxClicked()">
      <div :class="checkboxClass()"></div>
    </div>
    <div class="label-container">
      <p>{{ getName(item) }}</p>
    </div>
  </div>
</template>

<style scoped>
.checkbox-input-field-container {
  display: flex;
  padding: 5px 10px;
}

.checkbox-container {
  border: 1px solid white;
  border-radius: 3px;
  width: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox {
  height: 75%;
  width: 75%;
  border-radius: 3px;
}

.selected {
  background-color: white;
}

.label-container {
  margin-left: 10px;
}
</style>

<script>
export default {
  name: 'CheckboxInputField',
  data() {
    return {
      selected: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    getName: {
      type: Function,
      required: true
    },
    initSelected: {
      type: Boolean
    }
  },
  methods: {
    checkboxClass() {
      return [
        { class: 'checkbox', condition: () => true },
        { class: 'selected', condition: () => this.selected }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    onCheckboxClicked() {
      if(!this.selected) {
        this.selected = true;
        this.$emit('selected', this.item);
      } else {
        this.selected = false;
        this.$emit('unselected', this.item);
      }
    }
  },
  created() {
    this.selected = this.initSelected;
  }
}
</script>
