<template>
  <div>
    <h2>Проекты из портфолио</h2>
    <v-btn
      color="#27ae60"
      @click="navigateTo({ path: `/admin/portfolio/add` })"
    >
      Добавить новый проект в портфолио
    </v-btn>
    <br>
    <br>
    <AdminOptionsList
      :list="portfolioList.data"
      :noneEdit="true"
      :hasImage="true"
      :updateMsg="updateMsg"
      @removeData="removeData"
      @handleEdit="(id) => navigateTo({ path: `/admin/portfolio/${id}` })"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/store/portfolio-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getPortfolioList, deletePortfolioItem } = usePortfolioStore();
const { portfolioList } = storeToRefs(usePortfolioStore());
const updateMsg = ref();

await getPortfolioList();

const removeData = async (id: number): Promise<void> => {
  const response = await deletePortfolioItem(id);
  updateMsgStatus(response);
  await getPortfolioList();
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
