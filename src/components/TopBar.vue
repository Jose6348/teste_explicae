<template>
    <header class="top-bar">
      <img src="https://github.com/Jose6348/Images_Projects/blob/main/Explicae_project/LogoExpicae.png?raw=trueo" alt="Explica Logo" class="logo" />
      <div class="time">{{ currentTime }}</div>
    </header>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  export default {
    name: 'TopBar',
    setup() {
      const currentTime = ref(new Date().toLocaleTimeString())
  
      const updateTime = () => {
        currentTime.value = new Date().toLocaleTimeString()
      }
  
      onMounted(() => {
        setInterval(updateTime, 1000) // Atualizar as horas
      })
  
      onUnmounted(() => {
        clearInterval(updateTime) 
      })
  
      return { currentTime }
    }
  }
  </script>
  
  <style scoped>
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .logo {
    height: 50px;
  }
  
  .time {
    font-size: 1.7em;
    color: #666;
  }
  </style>