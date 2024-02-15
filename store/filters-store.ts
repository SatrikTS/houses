import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFiltersStore = defineStore('filtersStore', () => {
  const filtersList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список материалов
   */
  const getFiltersList = async (): Promise<void> => {
    const { data } = await $api.get('/filter');
    filtersList.value = data;
  };


  return {
    getFiltersList,
    filtersList,
  };
});
