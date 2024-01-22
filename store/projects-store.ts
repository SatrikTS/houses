import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FiltersList } from '@/utils/types';

/**
 * Проекты домов
 */
export const useProjectsStore = defineStore('projectsStore', () => {
  const projectsList = ref();
  const projectsItem = ref();
  const isLoading = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getProjectsList = async (args?: FiltersList | null): Promise<void> => {
    const getParams = {
      page: 1,
      limit: 100,
      ...args,
    };

    if (
      'totalArea' in getParams &&
      Array.isArray(getParams.total_area) &&
      getParams.total_area.length === 2
    ) {
      const [minValue, maxValue] = getParams.totalArea;
      getParams.min_area = minValue;
      getParams.max_area = maxValue;
      delete getParams.totalArea;
    }

    const params = Object.fromEntries(
      Object.entries(getParams).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(',')];
        }
        return [key, value];
      }),
    );

    const { data } = await $api.get('/projects', { params });
    projectsList.value = data;
  };

  /**
   * Изменить
   * @param param
   * @param id
   */
  const putProjectsItem = async (params, id: number): Promise<string> => {
    isLoading.value = true;
    const { data } = await $api.put(`/projects/${id}`, {
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
  const postProjectsItem = async (params): Promise<string> => {
    const { data } = await $api.post('/projects', {
      ...params,
    });
    return data;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteProjectsItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/projects/${id}`);
    return data.message;
  };

  /**
   * Получить один проект
   */
  const getProjectsItem = async (id: number): Promise<void> => {
    const { data } = await $api.get(`/projects/${id}`);
    projectsItem.value = data;
  };

  /**
   * Загрузить картинки в проект
   * @param files
   */
  const uploadProjectImages = async (files: FormData): Promise<string> => {
    isLoading.value = true;
    const { data } = await $api.post(
      '/project_images',
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

  const deleteProjectImage = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/project_images/${id}`);
    return data.message;
  }

  return {
    getProjectsList,
    putProjectsItem,
    postProjectsItem,
    deleteProjectsItem,
    uploadProjectImages,
    getProjectsItem,
    deleteProjectImage,
    projectsList,
    projectsItem,
    isLoading,
  };
});
