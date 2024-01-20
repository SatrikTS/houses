import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * About
 */
export const useAboutStore = defineStore('aboutStore', () => {
  const aboutPost = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить запись
   */
  const getAboutData = async (): Promise<void> => {
    const { data } = await $api.get('/about_companies/1');
    aboutPost.value = data;
  };

  /**
   * Изменить запись
   * @param param
   * @param id
   */
  const putAboutData = async (params: any, id: number): Promise<string> => {
    const { data } = await $api.put(`/about_companies/${id}`, {
      ...params,
    });
    return data.message;
  };

  return {
    getAboutData,
    putAboutData,
    aboutPost,
  };
});
