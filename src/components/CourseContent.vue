<template>
  <div class="course-content">
    
    <div v-for="(notebook, notebookIndex) in notebooks" :key="notebookIndex" class="notebook-container"
      :class="{ 'morfologia-section': notebook.title === '- 2.2 Morfologia' }">
      <div class="notebook-item">
        <h2 @click="toggleLesson(notebookIndex)" :class="{ 'sub-section': notebook.title.startsWith('-') }">
          {{ notebook.title }}
        </h2>
        <transition name="fade">
          <div v-show="isLessonExpanded(notebookIndex)" class="lesson-container">
            <div v-for="(lesson, lessonIndex) in notebook.lessons" :key="lessonIndex" class="lesson">
              <h3 @click="fetchSublessonDetails({ notebookIndex, lessonIndex, sublessonIndex: 0 })"
                :class="{ 'sub-lesson': lesson.title.startsWith('+') || lesson.title.startsWith('-'), 'lesson-sub-section': lesson.title.startsWith('-') }">
                {{ lesson.title }}
              </h3>
              <div class="lesson-details">
                <template v-if="lesson.sublessons && lesson.sublessons.length">
                  <ul class="sublesson-container">
                    <li v-for="(sublesson, sublessonIndex) in lesson.sublessons" :key="sublessonIndex"
                      class="sublesson">
                      <h4 @click="fetchSublessonDetails({ notebookIndex, lessonIndex, sublessonIndex })"
                        class="sub-lesson">
                        {{ sublesson.title }}
                      </h4>
                      <div v-if="sublesson.details.length" class="detail-row">
                        <span v-for="(detail, detailIndex) in sublesson.details" :key="detailIndex" class="detail-item"
                          v-html="formatDetail(detail)"></span>
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <div class="detail-row">
                    <span v-for="(detail, detailIndex) in lesson.details" :key="detailIndex" class="detail-item"
                      v-html="formatDetail(detail)"></span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>


    <div class="progress-section">
      <h2>TEORIA + QUESTÕES ORIENTADAS</h2>
      <div class="progress-info">
        <span v-html="formatProgressInfo('4 aulas | 00:55:29')"></span>
      </div>
      <div class="checkbox-group">
        <label v-for="topic in progressTopics" :key="topic.title">
          <input type="checkbox" v-model="selectedTopics" :value="topic.title" @change="updateSelectedTopics" />
          {{ topic.title }} <span class="duration" v-html="formatDuration(topic.duration)"></span>
        </label>
      </div>
      <div v-for="(lesson, index) in additionalLessons" :key="index" class="additional-lesson">
        <h3>{{ lesson.title }}</h3>
        <ul>
          <li v-for="(detail, detailIndex) in lesson.details" :key="detailIndex" v-html="formatDetail(detail)"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {
  name: 'CourseContent',
  setup() {
    const store = useStore();
    const selectedTopics = ref([]);

    const notebooks = computed(() => store.getters.getNotebooks);
    const progressTopics = computed(() => store.getters.getProgressTopics);
    const additionalLessons = computed(() => store.getters.getAdditionalLessons);
    const expandedLessons = computed(() => store.getters.getExpandedLessons);

    const isLessonExpanded = (index) => expandedLessons.value.includes(index);

    const toggleLesson = (index) => {
      store.commit('toggleLesson', index);
    };

    const fetchSublessonDetails = async ({ notebookIndex, lessonIndex, sublessonIndex }) => {
      await store.dispatch('fetchSublessonDetails', { notebookIndex, lessonIndex, sublessonIndex });
    };

    const updateSelectedTopics = () => {
      store.commit('updateSelectedTopics', selectedTopics.value);
    };

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
      isLessonExpanded,
      toggleLesson,
      fetchSublessonDetails,
      updateSelectedTopics,
      formatDetail,
      formatProgressInfo,
      formatDuration,
    };
  },
};
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
  color: #000;
}

.morfologia-section .detail-item strong {
  color: #000;
}

.notebook-item h2 {
  font-size: 1.7em;
  font-weight: bold;
  margin: 15px 0;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
}

.sub-section {
  background-color: #e6c3e6;
  padding: 5px 10px;
  margin: 15px 0;
  color: #fff;
  font-weight: bold;
  width: auto;
  height: 40px;
  cursor: pointer;
}

.lesson h3 {
  font-size: 1.1em;
  margin: 10px 0;
  padding-left: 20px;
  color: #000;
  font-weight: normal;
  cursor: pointer;
}

.lesson-sub-section {
  background-color: #e6c3e6;
  padding: 5px 10px;
  margin: 5px 0;
  color: #000;
  font-weight: normal;
  width: auto;
  height: 60px;
  align-content: center;
  cursor: pointer;
}

.sub-lesson {
  padding-left: 30px;
}

.lesson-details {
  margin-left: 20px;
}

.detail-row {
  display: flex;
  gap: 20px;
  padding-left: 30px;
  margin: 5px 0;
  border-bottom: none;
  list-style-type: none;
}

.detail-item {
  margin-bottom: 0;
  color: #444;
  padding: 0 5px;
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
  gap: 10px;
}

.additional-lesson p {
  margin-bottom: 5px;
  color: #444;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>