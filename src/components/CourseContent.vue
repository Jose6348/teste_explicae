<template>
    <div class="course-content">
        <!-- Seções de cadernos -->
        <div v-for="(notebook, index) in notebooks" :key="index" 
             class="notebook-container" 
             :class="{ 'morfologia-section': notebook.title === '- 2.2 Morfologia' }">
            <div class="notebook-item">
                <h2 :class="{ 'sub-section': notebook.title.startsWith('-') }">
                    {{ notebook.title }}
                </h2>
                <div v-for="(lesson, lessonIndex) in notebook.lessons" :key="lessonIndex" class="lesson">
                    <h3 :class="{ 'sub-lesson': lesson.title.startsWith('+') || lesson.title.startsWith('-'), 'lesson-sub-section': lesson.title.startsWith('-') }">
                        {{ lesson.title }}
                    </h3>
                    <ul class="detail-row">
                        <p v-for="(detail, detailIndex) in lesson.details" :key="detailIndex" class="detail-item"
                            v-html="formatDetail(detail)"></p>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Seção Técnica + Questões Orientadas -->
        <div class="progress-section">
            <h2>TEORIA + QUESTÕES ORIENTADAS</h2>
            <div class="progress-info">
                <span v-html="formatProgressInfo('4 aulas | 00:55:29')"></span>
            </div>
            <div class="checkbox-group">
                <label v-for="topic in progressTopics" :key="topic.title">
                    <input type="checkbox" v-model="selectedTopics" :value="topic.title" />
                    {{ topic.title }} <span class="duration" v-html="formatDuration(topic.duration)"></span>
                </label>
            </div>
            <div v-for="(lesson, index) in additionalLessons" :key="index" class="additional-lesson">
                <h3>{{ lesson.title }}</h3>
                <ul>
                    <li v-for="(detail, detailIndex) in lesson.details" :key="detailIndex"
                        v-html="formatDetail(detail)"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'CourseContent',
    setup() {
        const notebooks = ref([
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
        ])

        const progressTopics = ref([
            { title: 'Estrutura e Formação da Palavra I', duration: '00:14:19' },
            { title: 'Estrutura e Formação da Palavra II', duration: '00:14:00' },
            { title: 'Estrutura e Formação da Palavra III', duration: '00:15:34' },
            { title: 'Estrutura e Formação das Palavras IV: Um Passeio no Cotidiano', duration: '00:11:56' }
        ])

        const additionalLessons = ref([
            {
                title: '+ B. Classes de Palavras',
                details: ['Aulas: 27 | 04h 41m', 'Exercícios: 01 | 00h 21m', 'Materiais: 01 | 02h 09m']
            },
            {
                title: '+ 2.3 Sintaxe',
                details: ['Aulas: 48 | 07h 54m', 'Exercícios: 16 | 06h 03m ', 'Materiais: 06 | 05h 27m']
            }
        ])

        const selectedTopics = ref([])

        const formatDetail = (detail) => {
            if (detail && detail.includes(':')) {
                const [label, value] = detail.split(':');
                const [number, time] = value.trim().split('|');
                return `${label}: <strong>${number.trim()}</strong> | <strong>${time.trim()}</strong>`;
            }
            return detail;
        };

        const formatProgressInfo = (info) => {
            const [lessons, duration] = info.split('|');
            const [lessonNum, lessonText] = lessons.trim().split(' ');
            return `${lessonText} <strong>${lessonNum}</strong> | <strong>${duration.trim()}</strong>`;
        };

        const formatDuration = (duration) => {
            return `<strong>(${duration})</strong>`;
        };

        return {
            notebooks,
            progressTopics,
            selectedTopics,
            additionalLessons,
            formatDetail,
            formatProgressInfo,
            formatDuration
        };
    }
}
</script>

<style scoped>
.course-content {
    padding: 20px;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
}

.notebook-container {
    background-color: #fff;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.morfologia-section {
    background-color: #e6c3e6; 
    color: #fff; 
}

.morfologia-section .notebook-item h2,
.morfologia-section .lesson h3,
.morfologia-section .detail-row,
.morfologia-section .detail-item {
    background-color: #e6c3e6; 
    color: #000000; 
}

.morfologia-section .detail-item strong {
    color: #000000; 
}

.notebook-item h2 {
    font-size: 1.7em;
    font-weight: bold;
    margin: 10px 0 5px 0;
    padding: 5px 0;
    color: #000;
}

.sub-section {
    background-color: #e6c3e6;
    padding: 5px 10px;
    margin: 10px 0 5px 20px;
    color: #fff;
    font-weight: bold;
    width: 100%;
    height: 50px;
}

.lesson h3 {
    font-size: 1.1em;
    margin: 5px 0;
    padding-left: 40px;
    color: #000;
    font-weight: normal;
}

.lesson-sub-section {
    background-color: #e6c3e6;
    padding: 5px 10px;
    margin: 10px 0 5px 40px;
    color: #000000;
    font-weight: normal;
    width: auto;
    height: 50px;
    align-content: center;
}

.sub-lesson {
    padding-left: 60px;
}

.detail-row {
    display: flex;
    gap: 20px;
    padding-left: 60px;
    margin-bottom: 10px;
    border-bottom: 1px dotted #ccc;
}

.detail-item {
    margin-bottom: 5px;
    color: #444;
}

.detail-item strong,
.progress-info strong,
.duration strong {
    font-weight: bold;
}

.progress-section {
    margin-top: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    margin-bottom: 20px;
}

.progress-section h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #333;
    font-weight: bold;
}

.checkbox-group label {
    display: block;
    margin: 5px 0 5px 20px;
}

.checkbox-group input[type="checkbox"] {
    margin-right: 10px;
}

.progress-info {
    margin-top: 10px;
    color: #666;
    font-style: italic;
    margin-left: 20px;
}

.duration {
    color: #666;
    font-style: italic;
    margin-left: 5px;
}

.additional-lesson {
    margin-top: 15px;
    padding-left: 20px;
}

.additional-lesson h3 {
    font-size: 1.1em;
    margin-bottom: 5px;
    display: flex;
    font-weight: normal;
}

.additional-lesson ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 20px;
}

.additional-lesson p {
    margin-bottom: 5px;
    color: #444;
}
</style>