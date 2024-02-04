import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 *
 */
export const useStageStore = defineStore('stageStore', () => {
  const stagesList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getStageList = async (): Promise<void> => {
    const { data } = await $api.get('/completion_stages');
    stagesList.value = data;
  };

  /**
   * Изменить материал
   * @param param
   * @param id
   */
  const putStageItem = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/completion_stages/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать материал
   * @param param
   * @param id
   */
  const postStageItem = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/completion_stages', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteStageItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/completion_stages/${id}`);
    return data.message;
  };

  return {
    getStageList,
    putStageItem,
    postStageItem,
    deleteStageItem,
    stagesList,
  };
});
