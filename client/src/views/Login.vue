<template>
  <div class="login-container">
    <div class="form-container pos-relative">
      <div class="title-container">
        <h1>Admin panel</h1>
      </div>
      <div v-for="(inputField, index) in loginInputFields" :key=index class="input-field">
        <input-field :ref=inputField.id :model=inputField />
      </div>
      <button>Log in</button>
      <div :class=errorClass><span>{{ error.message }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.form-container {
  align-items: center;
  background-color: rgb(30, 30, 30);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 420px;
  justify-content: center;
  width: 550px;
}

.title-container {
  display: flex;
  justify-content: center;
  width: inherit;
}

.title-container > h1 {
  margin-bottom: 1em;
  text-transform: uppercase;
}

.input-field {
  margin: 1em 0;
}

button {
  border-radius: 0;
  height: 65px;
  margin-top: 20px;
  text-transform: uppercase;
  width: 400px;
}

.error {
  border: 1px solid rgb(250, 50, 50);
  bottom: 0;
  cursor: default;
  display: none;
  margin-bottom: 1em;
  opacity: 0;
  padding: 0.5em 1em;
  position: absolute;
}

.error > span {
  color: rgb(250, 50, 50);
}

.error-active {
  align-items: center;
  animation: show-error 3s linear;
  display: flex;
  justify-content: center;
}

@keyframes show-error {
  0% { opacity: 0; }
  5% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
}

.pos-relative {
  position: relative;
}
</style>

<script>
import { InputField as InputFieldComponent } from '../components';
import { InputField } from './utility';

export default {
  data() {
    return {
      loginInputFields: [
        new InputField('username', 'text', require('../../assets/icons/user.svg'), 'username'),
        new InputField('password', 'password', require('../../assets/icons/password.svg'), 'password')
      ],
      error: {
        message: '',
        animationTime: 3000
      }
    }
  },
  components: {
    'input-field': InputFieldComponent
  },
  methods: {
    getInputFieldById(id) {
      return Object.values(this.$refs).find(ref => ref.model.id === id);
    },
    showError(message) {
      this.error.message = message;
      setTimeout(() => {
        this.error.message = '';
      }, this.error.animationTime);
    }
  },
  computed: {
    errorClass() {
      const staticClasses = 'error';
      let dynamicClasses = this.error.message ? 'error-active' : '';
      return `${staticClasses} ${dynamicClasses}`;
    }
  }
}
</script>
