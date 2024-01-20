import { defineStore } from 'pinia';
import { ref } from 'vue';
import { OptionsListItem } from '@/utils/types';

export const useWallsStore = defineStore('wallsStore', () => {
  const wallMaterials = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список материалов
   */
  const getWallsMaterials = async (): Promise<void> => {
    const { data } = await $api.get('/wall_materials');
    wallMaterials.value = data;
  };

  /**
   * Изменить материал крыши
   * @param param
   * @param id
   */
  const putWallMaterial = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/wall_materials/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать материал крыши
   * @param param
   * @param id
   */
  const postWallMaterial = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/wall_materials', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteWallMaterial = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/wall_materials/${id}`);
    return data.message;
  };

  return {
    getWallsMaterials,
    putWallMaterial,
    postWallMaterial,
    deleteWallMaterial,
    wallMaterials,
  };
});
