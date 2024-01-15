import { defineStore } from 'pinia';
import { ref } from 'vue';
import { OptionsListItem } from '@/utils/types';

export const useFoundationsStore = defineStore('foundationsStore', () => {
  const foundationsTypes = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список материалов
   */
  const getFoundationsTypes = async (): Promise<void> => {
    const { data } = await $api.get('/foundation_types');
    foundationsTypes.value = data;
  };

  /**
   * Изменить материал крыши
   * @param param
   * @param id
   */
  const putFoundationMaterial = async (params: OptionsListItem, id: number): Promise<string> => {
    const { data } = await $api.put(`/foundation_types/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать материал крыши
   * @param param
   * @param id
   */
  const postFoundationMaterial = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/foundation_types', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteFoundationMaterial = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/foundation_types/${id}`);
    return data.message;
  };

  return {
    getFoundationsTypes,
    putFoundationMaterial,
    postFoundationMaterial,
    deleteFoundationMaterial,
    foundationsTypes,
  };
});