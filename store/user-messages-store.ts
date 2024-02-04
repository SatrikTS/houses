import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 *
 */
export const useMessagesStore = defineStore('messagesStore', () => {
  const messagesList = ref();
  const { $api } = useNuxtApp();
  const token = useCookie('token');
  /**
   * Получить список
   */
  const getMessagesList = async (): Promise<void> => {
    const { data } = await $api.get('/user_messages', {
      headers: {
        Authorization: 'Bearer ' + token.value,
      },
    });
    messagesList.value = data;
  };

  /**
   * Изменить материал
   * @param param
   * @param id
   */
  const putMessagesItem = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/user_messages/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать материал
   * @param param
   * @param id
   */
  const postMessagesItem = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/user_messages', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteMessage = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/user_messages/${id}`);
    return data.message;
  };

  return {
    getMessagesList,
    putMessagesItem,
    postMessagesItem,
    deleteMessage,
    messagesList,
  };
});
