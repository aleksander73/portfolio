<template>
  <div class="login-container center-xy">
    <div class="form-container center-xy relative">
      <div class="center-x">
        <h1 class="title">Control panel</h1>
      </div>
      <div v-for="(inputField, index) in loginInputFields" :key=index class="input-field">
        <InputField :ref=inputField.id :model=inputField />
      </div>
      <LoadingButton label="Log in" :action="() => login()" @completed="onLoggedIn" />
      <div :class=errorClass><span>{{ error.message }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
}

.form-container {
  background-color: rgb(30, 30, 30);
  border-radius: 5px;
  flex-direction: column;
  height: 475px;
  width: 550px;
}

.title {
  font-size: 40px;
  margin-bottom: 10px;
}

.input-field {
  margin: 1em 0;
}

button {
  margin-top: 20px;
}

.error {
  border: 1px solid rgb(250, 50, 50);
  bottom: 0;
  cursor: default;
  margin-bottom: 25px;
  opacity: 0;
  padding: 0.5em 1em;
  position: absolute;
}

.error > span {
  color: rgb(250, 50, 50);
}

.error-active {
  animation: show-error 3s linear;
}

@keyframes show-error {
  0% { opacity: 0; }
  5% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
}
</style>

<script>
import { InputField as InputFieldComponent, LoadingButton } from '../components';
import { InputField } from './utility';
import apiClient from '../api/ApiClient';

export default {
  title: 'Login',
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
    'InputField': InputFieldComponent,
    LoadingButton
  },
  methods: {
    getInputFieldById(id) {
      return Object.values(this.$refs).map(ref => ref[0]).find(ref => ref.model.id === id);
    },
    async login() {
      const username = this.getInputFieldById('username').model.value;
      const password = this.getInputFieldById('password').model.value;
      return await apiClient.loginUser(username, password);
    },
    onLoggedIn(result) {
      if(result) {
        this.$router.push('/control-panel');
      } else {
        this.showError('Invalid username or password');
      }
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
      return [
        { class: 'error center-xy', condition: () => true },
        { class: 'error-active', condition: () => this.error.message }
      ].map(x => x.condition() ? x.class : '').join(' ');
    }
  }
}
</script>
