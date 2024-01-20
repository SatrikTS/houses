<template>
  <AdminOptionsList
    title="Тип крыши"
    :list="roofTypesList.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoofsTypeStore } from '@/store/roofs-type-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const {
  getRoofsTypeList,
  putRoofsTypeItem,
  postRoofsTypeItem,
  deleteRoofsTypeItem,
} = useRoofsTypeStore();

const { roofTypesList } = storeToRefs(useRoofsTypeStore());
await getRoofsTypeList();
const updateMsg = ref();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteRoofsTypeItem(id);
  updateMsgStatus(response);
  await getRoofsTypeList();
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
  const response = await putRoofsTypeItem(params, id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionListItem): Promise<void> => {
  const response = await postRoofsTypeItem(params);
  updateMsgStatus(response);
  await getRoofsTypeList();
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
