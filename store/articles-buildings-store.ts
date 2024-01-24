import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * About
 */
export const useArticlesBuildingsStore = defineStore('articlesBuildingsStore', () => {
  const posts = ref();
  const article = ref();
  const isLoading = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить запись
   */
  const getPostItem = async (id: number): Promise<void> => {
    isLoading.value = true;
    const { data } = await $api.get(`/constructions/${id}`);
    article.value = data;
    isLoading.value = false;
  };

  /**
   * Получить запись
   */
  const getPosts = async (): Promise<void> => {
    isLoading.value = true;
    const { data } = await $api.get('/constructions');
    posts.value = data;
    isLoading.value = false;
  };

  /**
   * Создать запись
   * @param param
   * @param id
   */
  const postPostItem = async (params: any): Promise<any> => {
    const { data } = await $api.post('/constructions', {
      ...params,
    });
    return data;
  };

  /**
   * Изменить запись
   * @param param
   * @param id
   */
  const putPostItem = async (params: any, id: number): Promise<string> => {
    const { data } = await $api.put(`/constructions/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаление изображения
   * @param id
   */
  const removePost = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/constructions/${id}`);
    return data.message;
  };

  /**
   * Загрузка изображений к посту
   * @param files
   */
  const uploadImages = async (files: FormData): Promise<string> => {
    const { data } = await $api.post(
      '/construction_images',
      files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data.message;
  };

  /**
   * Удаление изображения
   * @param id
   */
  const removeImage = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/construction_images/${id}`);
    return data.message;
  };

  return {
    getPostItem,
    getPosts,
    putPostItem,
    uploadImages,
    removeImage,
    postPostItem,
    removePost,
    posts,
    isLoading,
    article,
  };
});
