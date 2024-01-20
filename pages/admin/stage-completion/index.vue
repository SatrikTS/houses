<template>
  <AdminOptionsList
    title="Комплектация"
    :list="stagesList.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStageStore } from '@/store/stage-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

interface OptionListItem {
  id?: number;
  title: string;
  description?: string;
}

const { getStageList, putStageItem, postStageItem, deleteStageItem } =
  useStageStore();

const { stagesList } = storeToRefs(useStageStore());
await getStageList();
const updateMsg = ref();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteStageItem(id);
  updateMsgStatus(response);
  await getStageList();
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
  const response = await putStageItem(params, id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionListItem): Promise<void> => {
  const response = await postStageItem(params);
  updateMsgStatus(response);
  await getStageList();
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
