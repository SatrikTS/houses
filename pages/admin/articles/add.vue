<template>
  <div className="admin-articles">
    <h2>Раздел: статьи</h2>
    <h4>Статья: {{ articleName }}</h4>
    <v-form
      ref="form"
      @submit.prevent
      @submit="saveData"
    >
      <v-btn
        color="#27ae60"
        type="submit"
      >Сохранить запись
      </v-btn>
      <br>
      <br>
      <v-text-field
        v-model="articleName"
        :rules="requiredRules"
        label="Название статьи"
      />
      <v-text-field
        v-model="keywords"
        label="Ключевые слова"
      />
      <v-select
        v-if="category.data"
        v-model="categoryChoice"
        :items="category.data"
        :rules="requiredRules"
        label="Категория"
        return-object
      ></v-select>
      <v-text-field
        v-model="videoLinks"
        label="Ссылка на видео"
      />
      <h3>Загрузка изображений:</h3>
      <Uploader
        v-if="!isLoading"
        :file="images"
        @uploadImage="uploadImage"
        @removeImage="handleRemoveImage"
      />
    </v-form>
    <h3>Редактор основного текста:</h3>
    <ClientOnly>
      <Editor v-model="content" />
    </ClientOnly>
    <br>
    <SuccessAlert :successMessage="successMessage" />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useArticlesStore } from '@/store/articles-store';
import { useCategoryStore } from '@/store/category-store';
import { requiredRules } from '@/utils/validation';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { isLoading } = storeToRefs(useArticlesStore());
const { postPostItem, uploadImages, removeImage } = useArticlesStore();

const content = ref();
const keywords = ref();
const videoLinks = ref();
const images = ref();
const articleName = ref();
const newImagesList = ref();
const successMessage = ref();
const categoryChoice = ref();
const { category } = storeToRefs(useCategoryStore());
const { getCategory } = useCategoryStore();
const form = ref();

await getCategory();

const saveData = async (e: Event): Promise<void> => {
  e.preventDefault();

  if (form.value.isValid) {
    const data = {
      title: articleName.value,
      html_content: content.value,
      keywords: keywords.value,
      construction_video: videoLinks.value,
      category_id: categoryChoice.value.id,
    };

    const response = await postPostItem(data);
    successMessage.value = response.message;

    if (newImagesList.value && response.post?.id) {
      await saveImage(response.post?.id);
    } else {
      setTimeout(() => location.reload(), 2000);
    }
  }

};

const saveImage = async (id: number): Promise<void> => {
  const formData = new FormData();
  formData.append('post_id', id);
  for (let index = 0; index < newImagesList.value.length; index++) {
    formData.append('images[]', newImagesList.value[index]);
  }
  const responseImageMessage = await uploadImages(formData);
  successMessage.value = responseImageMessage;
  setTimeout(() => location.reload(), 3000);
};

const uploadImage = (value: File[]): void => {
  newImagesList.value = value;
};

const handleRemoveImage = async (id: number): Promise<void> => {
  const response = await removeImage(id);
  successMessage.value = response;
  await saveData();
  setTimeout(() => location.reload(), 3000);
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