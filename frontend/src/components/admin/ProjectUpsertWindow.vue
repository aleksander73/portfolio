<template>
  <div class="window-container">
    <div class="window">
      <div class="title-container">
        <h1>{{ title }}</h1>
      </div>
      <div>
        <div class="divide"></div>
        <div class="button-panel">
          <button class="btn-cancel" @click="cancel()">Cancel</button>
          <button :class="actionButtonClass()" @click="mainAction()">{{ buttonLabel }}</button> 
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 70px;
  height: 100vh;
  width: calc(100vw - 70px);
}

.window {
  background-color: black;
  border: 1px solid white;
  height: 75%;
  width: 33%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.title-container {
  display: flex;
  justify-content: center;
  font-size: 0.55em;
  border-bottom: 1px solid white;
}

.title-container > h1 {
  margin: 5px 0;
}

.divide {
  border-top: 1px solid white;
  margin: 20px auto 0 auto;
  width: 80%;
}

.window > * {
  width: 100%;
}

.window > *:last-child {
  position: absolute;
  bottom: 0;
}

.button-panel {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}

.button-panel > button {
  margin: 0 10px;
}

button.btn-cancel {
  background-color: rgb(130, 130, 130);
}

button.btn-add {
  background-color: rgb(60, 195, 35);
}

button.btn-update {
  background-color: rgb(0, 115, 175);
}
</style>

<script>
export default {
  name: 'ProjectUpsertWindow',
  props: {
    project: {
      type: Object
    }
  },
  methods:  {
    actionButtonClass() {
      return [
        { class: 'btn-add', condition: () => !this.project },
        { class: 'btn-update', condition: () => this.project }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    mainAction() {
      if(!this.project) {
        console.log('Adding new project');
      } else {
        console.log('Updating', this.project.name);
      }
    },
    cancel() {
      this.$emit('requestClose');
    }
  },
  computed: {
    title() {
      return !this.project ? 'Add new project' : this.project.name;
    },
    buttonLabel() {
      return !this.project ? 'Create' : 'Update';
    }
  }
}
</script>
