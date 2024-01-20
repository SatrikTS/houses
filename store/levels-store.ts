import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 * Количетсво этажей
 */
export const useLevelsStore = defineStore('levelsStore', () => {
  const levelsList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getLevelsList = async (): Promise<void> => {
    const { data } = await $api.get('/level_types');
    levelsList.value = data;
  };

  /**
   * Изменить
   * @param param
   * @param id
   */
  const putLevelItem = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/level_types/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать
   * @param param
   * @param id
   */
  const postLevelItem = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/level_types', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteLevelItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/level_types/${id}`);
    return data.message;
  };

  return {
    getLevelsList,
    putLevelItem,
    postLevelItem,
    deleteLevelItem,
    levelsList,
  };
});
