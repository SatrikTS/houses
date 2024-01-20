import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FiltersList } from '@/utils/types';

/**
 * Проекты домов
 */
export const useProjectsStore = defineStore('projectsStore', () => {
  const projectsList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getProjectsList = async (args?: FiltersList | null): Promise<void> => {
    const getParams = {
      page: 1,
      limit: 10,
      ...args,
    };

    if (
      'total_area' in getParams &&
      Array.isArray(getParams.total_area) &&
      getParams.total_area.length === 2
    ) {
      const [minValue, maxValue] = getParams.total_area;
      getParams.min_area = minValue;
      getParams.max_area = maxValue;
      // Удаление ключа total_area, если необходимо
      delete getParams.total_area;
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
    const { data } = await $api.put(`/projects/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать
   * @param param
   * @param id
   */
  const postProjectsItem = async (params): Promise<string> => {
    const { data } = await $api.post('/projects', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteProjectsItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/projects/${id}`);
    return data.message;
  };

  return {
    getProjectsList,
    putProjectsItem,
    postProjectsItem,
    deleteProjectsItem,
    projectsList,
  };
});
