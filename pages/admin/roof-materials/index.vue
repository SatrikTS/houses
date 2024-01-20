<template>
  <AdminOptionsList
    title="Список материалов крыши"
    :list="roofMaterials.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoofsStore } from '@/store/roofs-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

interface OptionListItem {
  id?: number;
  title: string;
  description?: string;
}

const {
  getRoofMaterials,
  deleteRoofMaterial,
  putRoofMaterial,
  postRoofMaterial,
} = useRoofsStore();
const { roofMaterials } = storeToRefs(useRoofsStore());
await getRoofMaterials();
const updateMsg = ref();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteRoofMaterial(id);
  updateMsgStatus(response);
  await getRoofMaterials();
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
  const response = await putRoofMaterial(params, id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionListItem): Promise<void> => {
  const response = await postRoofMaterial(params);
  updateMsgStatus(response);
  await getRoofMaterials();
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
