import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Проекты домов
 */
export const usePortfolioStore = defineStore('portfolioStore', () => {
  const portfolioList = ref();
  const portfolioItem = ref();
  const isLoading = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getPortfolioList = async (limit?: number): Promise<void> => {
    const params = {
      limit: limit || 100,
    };
    const { data } = await $api.get('/portfolios', { params });
    portfolioList.value = data;
  };

  /**
   * Изменить
   * @param param
   * @param id
   */
  const putPortfolioItem = async (params: any, id: number): Promise<string> => {
    isLoading.value = true;
    const { data } = await $api.put(`/portfolios/${id}`, {
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
  const postPortfolioItem = async (params: any): Promise<string> => {
    const { data } = await $api.post('/portfolios', {
      ...params,
    });
    return data;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deletePortfolioItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/portfolios/${id}`);
    return data.message;
  };

  /**
   * Получить один проект
   */
  const getPortfolioItem = async (id: number): Promise<void> => {
    const { data } = await $api.get(`/portfolios/${id}`);
    portfolioItem.value = data?.data;
  };

  /**
   * Загрузить картинки в проект
   * @param files
   */
  const uploadPortfolioImages = async (files: FormData): Promise<string> => {
    isLoading.value = true;
    const { data } = await $api.post(
      '/portfolio_images',
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

  const deletePortfolioImage = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/portfolio_images/${id}`);
    return data.message;
  };

  return {
    getPortfolioList,
    putPortfolioItem,
    postPortfolioItem,
    deletePortfolioItem,
    getPortfolioItem,
    uploadPortfolioImages,
    deletePortfolioImage,
    portfolioList,
    portfolioItem,
    isLoading,
  };
});
