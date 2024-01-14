import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RoofMaterials } from '@/utils/types';

export const useRoofsStore = defineStore('dictionariesStore', () => {
  const roofMaterials = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список материалов
   */
  const getRoofMaterials = async (): Promise<void> => {
    const { data } = await $api.get('/roof_materials');
    roofMaterials.value = data;
  };

  /**
   * Изменить материал крыши
   * @param param
   * @param id
   */
  const putRoofMaterial = async (params: RoofMaterials, id: number): Promise<string> => {
    const { data } = await $api.put(`/roof_materials/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать материал крыши
   * @param param
   * @param id
   */
  const postRoofMaterial = async (params: RoofMaterials): Promise<string> => {
    const { data } = await $api.post('/roof_materials', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteRoofMaterial = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/roof_materials/${id}`);
    return data.message;
  };

  return {
    getRoofMaterials,
    putRoofMaterial,
    postRoofMaterial,
    deleteRoofMaterial,
    roofMaterials,
  };
});