<template>
  <AdminOptionsList
    title="Этажность"
    :list="levelsList.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLevelsStore } from '@/store/levels-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

interface OptionListItem {
  id?: number;
  title: string;
  description?: string;
}

const { getLevelsList, putLevelItem, postLevelItem, deleteLevelItem } =
  useLevelsStore();

const { levelsList } = storeToRefs(useLevelsStore());
await getLevelsList();
const updateMsg = ref();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteLevelItem(id);
  updateMsgStatus(response);
  await getLevelsList();
};

/**
 * Сохраняем опцию при изменении
 * @param item
 * @param index
 */
const updateData = async (
  params: OptionListItem,
  id: number,
): Promise<void> => {
  const response = await putLevelItem(params, id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionListItem): Promise<void> => {
  const response = await postLevelItem(params);
  updateMsgStatus(response);
  await getLevelsList();
};

/**
 * Обновляем показ успешных сообщений
 * @param response
 */
const updateMsgStatus = (response: string): void => {
  updateMsg.value = response;
  setTimeout(() => (updateMsg.value = ''), 2000);
};
</script>
