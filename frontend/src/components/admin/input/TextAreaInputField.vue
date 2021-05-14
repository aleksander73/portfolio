<template>
  <div :class="inputFieldClass()">
    <textarea rows="4" v-model.trim=input @focus=onFocus @input=onInput @blur=onBlur />
  </div>
</template>

<style scoped>
.text-area-input-field-container {
  border: 1px solid white;
  padding: 10px;
}

textarea {
  resize: none;
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
        { class: 'text-area-input-field-container center-x', condition: () => true },
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
