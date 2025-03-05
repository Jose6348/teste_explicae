<h1>Teste pratico Explicaê</h1>

<p>Este repositório contém uma aplicação frontend desenvolvida como parte de um teste técnico para a Explicae. A aplicação implementa uma listagem em formato de acordeon com aninhamento, utilizando Vue.js e Vuex, conforme especificado nas diretrizes do desafio. O objetivo é demonstrar habilidades técnicas, organização de código e atenção aos detalhes.</p>

## Requisitos Técnicos

Os seguintes tecnologias foram utilizadas conforme as diretrizes do teste:

- **Frameworks/Libraries**: 
  - [Vue.js](https://vuejs.org/) (versão 3) para construção da interface.
  - [Vuex](https://vuex.vuejs.org/) para gerenciamento de estado.
- **Linguagem**: JavaScript (Composition API).
- **Estilização**: CSS puro com `<style scoped>` para estilização modular.
- **Gerenciador de Pacotes**: [npm](https://www.npmjs.com/) para gerenciamento de dependências.
- **Controle de Versão**: [GitHub](https://github.com/) para versionamento e entrega.


## Desafio

O desafio consistiu em desenvolver uma aplicação baseada na imagem fornecida, com as seguintes funcionalidades:

1. **Listagem em Formato de Acordeon com Aninhamento**:
   - Implementada uma interface onde tópicos (ex.: "1. Interpretação de Textos") e subtópicos (ex.: "- Competência 07: Opinião e Ponto de Vista") podem ser expandidos ou recolhidos com animações.
   - Suporte a níveis aninhados, como "+ 1.1 Linguagem Verbal e Não Verbal" dentro de "- Competência 07".

2. **Simulação de Requisições**:
   - Dados mock são utilizados, e ao clicar nos tópicos internos, uma requisição assíncrona é simulada (com `setTimeout`) para carregar detalhes como aulas, exercícios e materiais.

## Estrutura do Projeto

- `public/`: Contém arquivos estáticos como `index.html` e `favicon.ico`.
- `src/`: Diretório principal do código-fonte.
  - `assets/`: Imagens como `logo.Explicae`.
  - `components/`: Componentes Vue, incluindo `CourseContent.vue` (listagem principal), `TopBar.vue` e `NavBar.vue`.
  - `store/`: Contém `index.js` para a store Vuex.
  - `App.vue`: Componente raiz.
  - `main.js`: Ponto de entrada da aplicação.
- `Dockerfile`: Configuração para containerização com Docker.
- `package.json`: Dependências e scripts do projeto.


## Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 14 ou superior).
- [npm](https://www.npmjs.com/) (gerenciador de pacotes).
- [Docker](https://www.docker.com/) (opcional, para containerização).

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/Jose6348/teste_explicae.git

2. Entre no diretório do projeto:
cd teste-explicae

3. Instale as dependências:
```
npm install
```

## Uso
Desenvolvimento Local

Para compilar e iniciar o servidor de desenvolvimento com hot-reload:

```
npm run serve
```

- A aplicação estará disponível em http://localhost:8080 (ou a porta informada no terminal).

## Build para Produção

Para compilar e minificar para produção:

```
npm run build
```

- Os arquivos serão gerados na pasta dist.

## Containerização com Docker

Construa a imagem Docker:
docker build -t meu-app-vue 

Execute o container:
docker run -d -p 8080:80 --name meu-app-container meu-app-vue

Acesse em http://localhost:8080.


## Licença

Este projeto está sob a licença MIT.


## Agradecimentos

Agradeço à equipe da Explicae pela oportunidade de demonstrar minhas habilidades neste teste técnico.




