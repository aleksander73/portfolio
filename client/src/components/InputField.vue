<template>
  <div class="container">
    <div :class="inputFieldClass('input-field-container')">
      <div class='icon-container'>
        <img class="icon" :src=model.icon :title=model.placeholder>
      </div>
      <div class="input-container">
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
  align-items: center;
  border-right: 1px solid white;
  display: flex;
  justify-content: center;
  width: 15%;
}

.icon {
  height: 50%;
  filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
}

.input-container {
  display: flex;
  justify-content: center;
  width: 85%;
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
import { InputField } from '../views/utility';

export default {
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
    inputFieldClass(base) {
      return `${base} ${this.focused ? 'shadow' : ''}`;
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  }
}
</script>
