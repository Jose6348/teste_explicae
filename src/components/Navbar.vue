<template>
    <nav class="nav-bar">
      <ul>
        <li><a href="#">Cadernos</a></li>
        <li>/</li>
        <li><a href="#">Língua Portuguesa</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped>
  .nav-bar {
    background-color: #ffffff;
    padding: 10px;
  }
  
  .nav-bar ul {
    list-style: none;
    display: flex;
    gap:5px;
    font-size: 1.9em;
  }
  
  .nav-bar a {
    color: #000000;
    text-decoration: none;
    font-weight: bold;
    position: relative; 
  }
  
  .nav-bar a:hover {
    text-decoration: none;
  }
  
  .nav-bar a:hover::after {
    content: '';
    position: absolute;
    bottom: -5px; 
    left: 0;
    width: 100%; 
    height: 5px; 
    background-color: #8b02ca; 
    transition: all 0.3s ease; 
  }
  </style>