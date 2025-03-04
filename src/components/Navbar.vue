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
  
  /* Adiciona uma linha roxa maior no hover */
  .nav-bar a:hover::after {
    content: '';
    position: absolute;
    bottom: -5px; /* Ajusta a distância da linha do texto */
    left: 0;
    width: 100%; /* Cobrir todo o texto */
    height: 5px; /* Espessura da linha */
    background-color: #8b02ca; /* Cor roxa */
    transition: all 0.3s ease; /* Suaviza a animação */
  }
  </style>