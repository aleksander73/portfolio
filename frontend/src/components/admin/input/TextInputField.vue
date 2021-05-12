<template>
  <div :class="inputFieldClass()">
    <input type="text" v-model.trim=input @focus=onFocus @input=onInput @blur=onBlur />
  </div>
</template>

<style scoped>
.text-input-field-container {
  border: 1px solid white;
  display: flex;
  justify-content: center;
  padding: 10px;
}

input {
  font-size: 1em;
  width: 100%;
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
