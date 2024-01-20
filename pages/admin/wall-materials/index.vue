<template>
  <AdminOptionsList
    title="Список материалов стен"
    :list="wallMaterials.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWallsStore } from '@/store/wall-store';

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
  getWallsMaterials,
  putWallMaterial,
  postWallMaterial,
  deleteWallMaterial,
} = useWallsStore();

const { wallMaterials } = storeToRefs(useWallsStore());
await getWallsMaterials();
const updateMsg = ref();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteWallMaterial(id);
  updateMsgStatus(response);
  await getWallsMaterials();
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
  const response = await putWallMaterial(params, id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionListItem): Promise<void> => {
  const response = await postWallMaterial(params);
  updateMsgStatus(response);
  await getWallsMaterials();
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
