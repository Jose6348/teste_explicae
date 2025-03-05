import { createStore } from 'vuex';

export default createStore({
  state: {
    notebooks: [
      {
        title: '1. Interpretação de Textos',
        lessons: [
            {
                title: '',
                details: ['Aulas: 1193 | 100h 22m', 'Exercícios: 181 | 79h 12m', 'Materiais: 53 | 86h 03m']
            },
            {
                title: '+ Competência 01: Palavras, Imagem e Vida Social',
                details: ['Aulas: 523 | 44h 59m', 'Exercícios: 62 | 28h 39m', 'Materiais: 12 | 34h 03m']
            },
            {
                title: '+ Competência 06: Text - Contexto e Função ',
                details: ['Aulas: 510 | 42h 24m', 'Exercícios: 90 | 38h 54m', 'Materiais: 29 | 39h 03m']
            },
            {
                title: '- Competência 07: Opinião e Ponto de Vista',
                details: ['']
            },
            {
                title: '+ 1.1 Linguagem Verbal e Não Verbal',
                details: ['Aulas: 02 | 00h 18m', 'Exercícios: 03 | 00h 48m', 'Materiais: 03 | 01h 03m']
            },
            {
                title: '+ 1.2 Estratégias Impostas na Construção do Texto',
                details: ['Aulas: 67 | 04h 49m', 'Exercícios: 10 | 04h 12m', 'Materiais: 03 | 04h 42m']
            },
            {
                title: '+ 1.2 Voz Autoral, Crítica e Perspectiva do Eu-Lírico',
                details: ['Aulas: 62 | 05h 34m', 'Exercícios: 10 | 04h 12m', 'Materiais: 03 | 04h 54m']
            },
            {
                title: '+ Competência 08: Diversidade Linguística',
                details: ['Aulas: 29 | 02h 15m', 'Exercícios: 06 | 02h 28m', 'Materiais: 03 | 02h 18m']
            }
        ]
    },
    {
        title: '2. Gramática',
        lessons: [
            {
                title: '',
                details: ['Aulas: 86 | 14h 41m', 'Exercícios: 27 | 10h 45m', 'Materiais: 10 | 10h 00m']
            },
            {
                title: '+ 2.1 Fonologia',
                details: ['Aulas: 07 | 01h 09m', 'Exercícios: 04 | 01h 36m', 'Materiais: 02 | 01h 36m']
            }
        ]
    },
    {
        title: '- 2.2 Morfologia',
        lessons: [
            {
                title: '- A. Estrutura e Formação das Palavras',
                details: ['Aulas: 04 | 00h 55m', 'Exercícios: 06 | 02h 45m', 'Materiais: 01 | 00h 48m']
            }
          ]
        }
    ],
    expandedLessons: [],
    expandedSublessons: new Set(), 
    selectedTopics: [],
    progressTopics: [
      { title: 'Estrutura e Formação da Palavra I', duration: '00:14:19' },
      { title: 'Estrutura e Formação da Palavra II', duration: '00:14:00' },
      { title: 'Estrutura e Formação da Palavra III', duration: '00:15:34' },
      { title: 'Estrutura e Formação das Palavras IV: Um Passeio no Cotidiano', duration: '00:11:56' },
    ],
    additionalLessons: [
      { title: '+ B. Classes de Palavras', details: ['Aulas: 27 | 04h 41m', 'Exercícios: 01 | 00h 21m', 'Materiais: 01 | 02h 09m'] },
      { title: '+ 2.3 Sintaxe', details: ['Aulas: 48 | 07h 54m', 'Exercícios: 16 | 06h 03m', 'Materiais: 06 | 05h 27m'] },
    ],
  },
  mutations: {
    toggleLesson(state, index) {
      const i = state.expandedLessons.indexOf(index);
      if (i > -1) state.expandedLessons.splice(i, 1);
      else state.expandedLessons.push(index);
    },
    toggleSublesson(state, { notebookIndex, lessonIndex }) {
      const key = `${notebookIndex}-${lessonIndex}`;
      if (state.expandedSublessons.has(key)) state.expandedSublessons.delete(key);
      else state.expandedSublessons.add(key);
    },
    setSublessonDetails(state, { notebookIndex, lessonIndex, sublessonIndex, details }) {
      state.notebooks[notebookIndex].lessons[lessonIndex].sublessons[sublessonIndex].details = details;
    },
    updateSelectedTopics(state, topics) {
      state.selectedTopics = topics;
    },
  },
  actions: {
    fetchSublessonDetails({ commit }, { notebookIndex, lessonIndex, sublessonIndex }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockDetails = ['Aulas: 62m', 'Exercícios: 03m', 'Materiais: 02m'];
          commit('setSublessonDetails', { notebookIndex, lessonIndex, sublessonIndex, details: mockDetails });
          resolve();
        }, 1000);
      });
    },
  },
  getters: {
    getNotebooks: (state) => state.notebooks,
    getExpandedLessons: (state) => state.expandedLessons,
    getExpandedSublessons: (state) => state.expandedSublessons,
    getSelectedTopics: (state) => state.selectedTopics,
    getProgressTopics: (state) => state.progressTopics,
    getAdditionalLessons: (state) => state.additionalLessons,
  },
});