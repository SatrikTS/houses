import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Проекты домов
 */
export const usePartnersStore = defineStore('partnersStore', () => {
  const partnersList = ref();
  const partnersItem = ref();
  const isLoading = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getPartnersList = async (limit?: number): Promise<void> => {
    const params = {
      limit: limit || 100,
    };
    const { data } = await $api.get('/partners', { params });
    partnersList.value = data;
  };

  /**
   * Изменить
   * @param param
   * @param id
   */
  const putPartnersItem = async (params: any, id: number): Promise<string> => {
    isLoading.value = true;
    const { data } = await $api.put(`/partners/${id}`, {
      ...params,
    });
    isLoading.value = false;
    return data.message;
  };

  /**
   * Создать проект
   * @param param
   * @param id
   */
  const postPartnersItem = async (params: any): Promise<string> => {
    const { data } = await $api.post('/partners', {
      ...params,
    });
    return data;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deletePartnersItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/partners/${id}`);
    return data.message;
  };

  /**
   * Получить один проект
   */
  const getPartnersItem = async (id: number): Promise<void> => {
    const { data } = await $api.get(`/partners/${id}`);
    partnersItem.value = data?.data;
  };

  /**
   * Загрузить картинки в проект
   * @param files
   */
  const uploadPartnersImages = async (files: FormData): Promise<string> => {
    isLoading.value = true;
    const { data } = await $api.post(
      '/partner_images',
      files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    isLoading.value = false;
    return data.message;
  };

  const deletePartnersImage = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/partner_images/${id}`);
    return data.message;
  };

  return {
    getPartnersList,
    putPartnersItem,
    postPartnersItem,
    deletePartnersItem,
    getPartnersItem,
    uploadPartnersImages,
    deletePartnersImage,
    partnersList,
    partnersItem,
    isLoading,
  };
});
