<template>
  <div class="admin-articles">
    <h2>Раздел: строительство</h2>
    <h4>Статья: {{ articleName }}</h4>
    <v-btn
      color="#27ae60"
      @click="saveData"
    >Сохранить запись
    </v-btn>
    <br>
    <br>
    <v-text-field
      v-model="articleName"
      label="Название статьи"
    />
    <v-text-field
      v-model="keywords"
      label="Ключевые слова"
    />
    <v-select
      v-model="category"
      :items="categoryPost"
      label="Категория"
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
    <h3>Редактор основного текста:</h3>
    <ClientOnly>
      <Editor v-model="content" />
    </ClientOnly>
    <br>
    <v-btn
      color="#27ae60"
      @click="saveData"
    >Сохранить запись
    </v-btn>
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
import { categoryPost } from './caregory';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { article, isLoading } = storeToRefs(useArticlesBuildingsStore());
const { getPostItem, putPostItem, uploadImages, removeImage } = useArticlesBuildingsStore();

const articleID = useRoute().params.id;

await getPostItem(articleID);
const content = ref(article.value.data?.html_content);
const keywords = ref(article.value.data?.keywords);
const videoLinks = ref(article.value.data.construction_video);
const images = ref(article.value.data.images);
const articleName = ref(article.value.data.title);
const category = ref(article.value.data.category);

const newImagesList = ref();
const successMessage = ref();

const saveData = async (): Promise<void> => {
  const data = {
    title: articleName.value,
    html_content: content.value,
    keywords: keywords.value,
    construction_video: videoLinks.value,
    // category: category.value
  };
  const response = await putPostItem(data, articleID);
  successMessage.value = response;

  if (newImagesList.value) {
    await saveImage();
  }
};

const saveImage = async (): Promise<void> => {
  const formData = new FormData();
  formData.append('construction_id', articleID);
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