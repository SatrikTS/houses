<template>
  <AdminOptionsList
    title="Категории"
    :list="category.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
</template>
<script
  lang="ts"
  setup
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '@/store/category-store';
import type { OptionsListItem } from '@/utils/types';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getCategory, postCategory, putCategoryItem, deleteCategory } = useCategoryStore();
const { category } = storeToRefs(useCategoryStore());
await getCategory();
const updateMsg = ref();

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionsListItem): Promise<void> => {
  const response = await postCategory(params);
  updateMsgStatus(response);
  await getCategory();
};

/**
 * Сохраняем опцию при изменении
 * @param item
 * @param index
 */
const updateData = async (
  params: OptionsListItem,
  id: number,
): Promise<void> => {
  const response = await putCategoryItem(params, id);
  updateMsgStatus(response);
};

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteCategory(id);
  updateMsgStatus(response);
  await getCategory();
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
<style scoped>
</style>