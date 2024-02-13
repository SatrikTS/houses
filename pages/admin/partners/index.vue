<template>
  <div>
    <h2>Партнеры</h2>
    <v-btn
      color="#27ae60"
      @click="navigateTo({ path: `/admin/partners/add` }, { external: true })"
    >
      Добавить новый элемент
    </v-btn>
    <br>
    <br>
    <AdminOptionsList
      :list="partnersList.data"
      :noneEdit="true"
      :hasImage="true"
      :updateMsg="updateMsg"
      @removeData="removeData"
      @handleEdit="(id) => navigateTo({ path: `/admin/partners/${id}` }, { external: true })"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePartnersStore } from '~/store/partners-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getPartnersList, deletePartnersItem } = usePartnersStore();
const { partnersList } = storeToRefs(usePartnersStore());

const updateMsg = ref();

await getPartnersList();

const removeData = async (id: number): Promise<void> => {
  const response = await deletePartnersItem(id);
  updateMsgStatus(response);
  await getPartnersList();
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
