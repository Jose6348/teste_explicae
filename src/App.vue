<template>
  <div id="app">
    <TopBar />
    <NavBar />
    <CourseContent />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import NavBar from './components/Navbar.vue'
import CourseContent from './components/CourseContent.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    NavBar,
    CourseContent
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>