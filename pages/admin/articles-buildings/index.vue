<template>
  <div class="admin-articles">
    <h2>Статьи</h2>
    <v-btn
      color="#27ae60"
      @click="navigateTo({ path: `/admin/articles-buildings/add` })"
    >Создать запись
    </v-btn>
    <br>
    <br>
    <AdminOptionsList
      :list="posts.data"
      :noneEdit="true"
      :updateMsg="successMessage"
      @removeData="removeData"
      @handleEdit="(id) => navigateTo({ path: `/admin/articles-buildings/${id}` })"
    />
    <SuccessAlert :successMessage="successMessage" />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useArticlesBuildingsStore } from '@/store/articles-buildings-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { posts } = storeToRefs(useArticlesBuildingsStore());
const { getPosts, removePost } = useArticlesBuildingsStore();

const successMessage = ref();

await getPosts();

const removeData = async (id: number): Promise<void> => {
  const response = await removePost(id);
  updateMsgStatus(response);
  await getPosts();
};

/**
 * Обновляем показ успешных сообщений
 * @param response
 */
const updateMsgStatus = (response: string): void => {
  successMessage.value = response;
  setTimeout(() => (successMessage.value = ''), 2000);
};

watch(successMessage, () => {
  setTimeout(() => successMessage.value = null, 3000);
});
</script>
<style lang="scss">
.admin-articles {
  position: relative;
}
</style>