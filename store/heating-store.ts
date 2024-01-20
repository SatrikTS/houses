import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 * Тип отопления проекте
 */
export const useHeatingStore = defineStore('heatingStore', () => {
  const heatingList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список материалов
   */
  const getHeatingList = async (): Promise<void> => {
    const { data } = await $api.get('/heating_types');
    heatingList.value = data;
  };

  /**
   * Изменить материал крыши
   * @param param
   * @param id
   */
  const putHeatingItem = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/heating_types/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать материал крыши
   * @param param
   * @param id
   */
  const postHeatingItem = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/heating_types', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteHeatingItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/heating_types/${id}`);
    return data.message;
  };

  return {
    getHeatingList,
    putHeatingItem,
    postHeatingItem,
    deleteHeatingItem,
    heatingList,
  };
});
