import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 * Category
 */
export const useCategoryStore = defineStore('categoryStore', () => {
  const category = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getCategory = async (): Promise<void> => {
    const { data } = await $api.get('/categories');
    category.value = data;
  };

  /**
   * Изменить категорию
   * @param param
   * @param id
   */
  const putCategoryItem = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/categories/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать категорию
   * @param param
   * @param id
   */
  const postCategory = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/categories', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteCategory = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/categories/${id}`);
    return data.message;
  };

  return {
    getCategory,
    putCategoryItem,
    postCategory,
    deleteCategory,
    category,
  };
});
