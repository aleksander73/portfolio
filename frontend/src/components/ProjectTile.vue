<template>
  <div :id="'project-' + project._id" class="project-tile-container">
    <div class="project-header">
      <div class="title-container">
        <div class="center-x">
          <h1 class="title">{{ project.name }}</h1>
          <img v-if="project.technology" class="logo" :src=logoSrc :title="project.technology.name + ' logo'">
        </div>
      </div>
      <div class="tech-stack">
        <div v-for="(technology, index) in project.technologies" :key=index>
          <Technology :name=technology.name :icon=technology.icon />
        </div>
      </div>
    </div>
    <div class="description">
      <p>{{ project.description }}</p>
    </div>
    <div class="read-more">
      <a :href="'/projects/' + project._id"><button>See project</button></a>
    </div>
  </div>
</template>

<style scoped>
.project-tile-container {
  padding: 1em 2.5em;
  background-color: #0f0f0fdb;
}

.project-header {
  display: flex;
  justify-content: space-between;
}

.title-container {
  width: 60%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo {
  height: 50px;
  margin: auto 20px;
}

.title {
  font-size: 2.5em;
  font-weight: 100;
}

.tech-stack {
  width: 40%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.description {
  margin-top: 0.5em;
  padding: 15px 5px;
  font-size: 1.25em;
  line-height: 1.5em;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}

.description > p {
  margin-left: 5px;
  width: 90%;
}

.read-more {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0 5px 0;
}
</style>

<script>
import Technology from './Technology.vue';

export default {
  name: 'Project',
  components: {
    Technology
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    logoSrc() {
      return require(`../../../server/uploads/${this.project.technology.icon}`);
    }
  },
  created() {
    this.project.technologies.sort((x, y) => x.name.localeCompare(y.name));
  }
}
</script>
