<template>
  <div :class="inputFieldClass()">
    <input type="text" :placeholder="placeholder.toLowerCase()" v-model.trim=input @focus=onFocus @input=onInput @blur=onBlur />
  </div>
</template>

<style scoped>
.text-input-field-container {
  border: 1px solid white;
  display: flex;
  height: 50px;
  justify-content: center;
}

input {
  background-color: inherit;
  border: 0;
  color: white;
  font-family: inherit;
  font-size: 1.1em;
  outline: none;
  width: 90%;
}

.shadow {
  box-shadow: 0 0 4px rgb(45, 165, 235);
}
</style>

<script>
export default {
  name: 'TextInputField',
  data() {
    return {
      input: '',
      focused: false
    }
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    initValue: {
      type: String,
      required: true
    }
  },
  methods: {
    inputFieldClass() {
      return [
        { class: 'text-input-field-container', condition: () => true },
        { class: 'shadow', condition: () => this.focused }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    onFocus() {
      this.focused = true;
    },
    onInput() {
      this.$emit('input', this.input);
    },
    onBlur() {
      this.focused = false;
    }
  },
  created() {
    this.input = this.initValue;
    this.$emit('input', this.input);
  }
}
</script>
