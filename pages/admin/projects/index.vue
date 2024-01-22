<template>
  <div>
    <h2>Проекты</h2>
    <v-btn
      color="#27ae60"
      @click="navigateTo({ path: `/admin/projects/add` })"
    >
      Добавить новый проект
    </v-btn>
    <br>
    <br>
    <AdminOptionsList
      title="Проекты"
      :list="projectsList.data"
      :noneEdit="true"
      :updateMsg="updateMsg"
      @removeData="removeData"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '@/store/projects-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getProjectsList, deleteProjectsItem } = useProjectsStore();
const { projectsList } = storeToRefs(useProjectsStore());
const updateMsg = ref();

await getProjectsList();

const removeData = async (id: number): Promise<void> => {
  const response = await deleteProjectsItem(id);
  updateMsgStatus(response);
  await getProjectsList();
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
<style scoped></style>
