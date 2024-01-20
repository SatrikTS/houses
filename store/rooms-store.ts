import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 * Количетсво комнат в проекте
 */
export const useRoomsStore = defineStore('roomsStore', () => {
  const roomList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список материалов
   */
  const getRoomsList = async (): Promise<void> => {
    const { data } = await $api.get('/room_counts');
    roomList.value = data;
  };

  /**
   * Изменить материал крыши
   * @param param
   * @param id
   */
  const putRoomNumber = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/room_counts/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать материал крыши
   * @param param
   * @param id
   */
  const postRoomNumber = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/room_counts', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteRoomNumber = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/room_counts/${id}`);
    return data.message;
  };

  return {
    getRoomsList,
    putRoomNum: putRoomNumber,
    postRoomNum: postRoomNumber,
    deleteRoomNum: deleteRoomNumber,
    roomList,
  };
});
