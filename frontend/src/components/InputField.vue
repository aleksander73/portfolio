<template>
  <div class="container">
    <div :class="inputFieldClass">
      <div class='icon-container center-xy'>
        <img class="icon svg-white" :src=model.icon :title=model.placeholder>
      </div>
      <div class="input-container center-x">
        <input :type=model.inputType :placeholder=model.placeholder.toLowerCase() v-model.trim=model.value @focus=onFocus @blur=onBlur />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
}

.input-field-container {
  border: 1px solid white;
  border-radius: 0px;
  display: flex;
  height: 50px;
  justify-content: flex-start;
}

.icon-container {
  border-right: 1px solid white;
  width: 15%;
}

.icon {
  height: 50%;
}

.input-container {
  width: 85%;
}
</style>

<script>
import { InputField } from '../views/utility';

export default {
  name: 'InputField',
  data() {
    return {
      focused: false
    }
  },
  props: {
    model: {
      type: InputField,
      required: true
    }
  },
  methods: {
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  },
  computed: {
    inputFieldClass() {
      return [
        { class: 'input-field-container', condition: () => true },
        { class: 'shadow', condition: () => this.focused },
      ].map(x => x.condition() ? x.class : '').join(' ');
    }
  }
}
</script>
