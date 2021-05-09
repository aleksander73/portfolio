<template>
  <div :class="inputFieldClass()">
    <textarea rows="4" v-model.trim=input @focus=onFocus @input=onInput @blur=onBlur />
  </div>
</template>

<style scoped>
.text-area-input-field-container {
  border: 1px solid white;
  display: flex;
  justify-content: center;
  padding: 10px;
}

textarea {
  background-color: inherit;
  border: 0;
  color: white;
  font-family: inherit;
  font-size: 1em;
  outline: none;
  width: 100%;
  resize: none;
}

.shadow {
  box-shadow: 0 0 4px rgb(45, 165, 235);
}
</style>

<script>
export default {
  name: 'TextAreaInputField',
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
        { class: 'text-area-input-field-container', condition: () => true },
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
