import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 * Тип крыши
 */
export const useRoofsTypeStore = defineStore('roofsTypeStore', () => {
  const roofTypesList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getRoofsTypeList = async (): Promise<void> => {
    const { data } = await $api.get('/roof_types');
    roofTypesList.value = data;
  };

  /**
   * Изменить
   * @param param
   * @param id
   */
  const putRoofsTypeItem = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/roof_types/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать
   * @param param
   * @param id
   */
  const postRoofsTypeItem = async (
    params: OptionsListItem,
  ): Promise<string> => {
    const { data } = await $api.post('/roof_types', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteRoofsTypeItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/roof_types/${id}`);
    return data.message;
  };

  return {
    getRoofsTypeList,
    putRoofsTypeItem,
    postRoofsTypeItem,
    deleteRoofsTypeItem,
    roofTypesList,
  };
});
