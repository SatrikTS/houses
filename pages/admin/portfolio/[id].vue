<template>
  <div class="admin-projects-add">
    <v-form
      ref="form"
      @submit.prevent
      @submit="submitPortfolioItem"
    >
      <h2>{{ portfolioItem.title }}</h2>
      <v-btn
        color="#27ae60"
        type="submit"
      >Сохранить
      </v-btn>
      <br>
      <br>
      <h3>Изображения проекта</h3>
      <Uploader
        :file="portfolioItem.images"
        @removeImage="handleRemoveImage"
        @uploadImage="uploadImage"
      />
      <br>
      <h3>Характеристики проекта</h3>
      <div class="admin-projects-add__group">
        <v-text-field
          v-model="portfolioItem.title"
          :rules="requiredRules"
          label="Название проекта"
        />
        <v-text-field
          v-model="portfolioItem.video_house"
          label="Ссылка на видео в ютуб"
        />
        <v-text-field
          v-model="portfolioItem.location_house"
          label="Локация"
        />
        <v-text-field
          v-model="portfolioItem.map_link"
          label="Ссылка на карту Яндекс"
        />
        <v-text-field
          v-model="portfolioItem.total_area"
          type="number"
          min="0"
          max="1000"
          label="Общая площадь"
        />
        <v-text-field
          v-model="portfolioItem.construction_period"
          type="number"
          min="0"
          label="Сроки строительства"
        />
        <v-text-field
          v-model="portfolioItem.year_house"
          type="number"
          min="0"
          label="Год постройки"
        />
        <v-text-field
          v-model="portfolioItem.additional_building"
          label="Дополнительные строения"
        />
      </div>
      <h3>Опции проекта</h3>
      <div class="admin-projects-add__options">
        <v-select
          v-model="portfolioItem.roof_type"
          label="Тип крыши"
          :items="filtersList.roofTypes"
          clearable
        />
        <v-select
          v-model="portfolioItem.roof_material"
          label="Материал крыши"
          :items="filtersList.roofMaterials"
          clearable
        />
        <v-select
          v-model="portfolioItem.wall_material"
          label="Материал стен"
          :items="filtersList.wallMaterials"
          clearable
        />
        <v-select
          v-model="portfolioItem.foundation_type"
          label="Тип фундамента"
          :items="filtersList.foundationTypes"
          clearable
        />
        <v-select
          v-model="portfolioItem.heating_type"
          label="Тип отопления"
          :items="filtersList.heatingTypes"
          clearable
        />
        <v-select
          v-model="portfolioItem.level_type"
          label="Кол-во этажей"
          :items="filtersList.levelTypes"
          clearable
        />
        <v-select
          v-model="portfolioItem.room_count"
          label="Кол-во комнат"
          :items="filtersList.roomCounts"
          clearable
        />
      </div>
      <v-textarea
        v-model="portfolioItem.description"
        label="Описание"
      />
      <v-btn
        color="#27ae60"
        type="submit"
      >Сохранить
      </v-btn>
      <br>
      <br>
    </v-form>
    <h3>Расширенное описание проекта</h3>
    <ClientOnly>
      <Editor v-model="portfolioItem.info_house" />
    </ClientOnly>
    <SuccessAlert :successMessage="successMessage" />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { requiredRules } from '@/utils/validation';
import { usePortfolioStore } from '@/store/portfolio-store';
import { useFiltersStore } from '@/store/filters-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getPortfolioItem, putPortfolioItem, uploadPortfolioImages, deletePortfolioImage } = usePortfolioStore();
const { getFiltersList } = useFiltersStore();

const { portfolioItem } = storeToRefs(usePortfolioStore());
const { filtersList } = storeToRefs(useFiltersStore());

const newImagesList = ref();
const successMessage = ref();
const form = ref();

const projectID = useRoute().params.id;
await getPortfolioItem(projectID);
await getFiltersList();

const submitPortfolioItem = async (): Promise<void> => {
  if (form.value.isValid) {

    const data = {
      ...portfolioItem.value,
      map_link: portfolioItem.value.map_link,
    };

    const response = await putPortfolioItem(data, projectID);
    successMessage.value = response;
    if (newImagesList.value) {
      await saveImage();
    }
  }
};

const saveImage = async (): Promise<void> => {
  const formData = new FormData();
  formData.append('portfolio_id', projectID);
  for (let index = 0; index < newImagesList.value.length; index++) {
    formData.append('images[]', newImagesList.value[index]);
  }
  await uploadPortfolioImages(formData);
  setTimeout(() => location.reload(), 3000);
};

const uploadImage = (value: File[]): void => {
  newImagesList.value = value;
};

const handleRemoveImage = async (id: number): Promise<void> => {
  const response = await deletePortfolioImage(id);
  successMessage.value = response;
  await submitPortfolioItem();
  setTimeout(() => location.reload(), 3000);
};

watch(successMessage, () => {
  setTimeout(() => successMessage.value = null, 3000);
});
</script>
<style
  scoped
  lang="scss"
>
.admin-projects-add {
  position: relative;

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $offset-base;
    align-items: flex-start;
  }

  &__group {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: $offset-base;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $offset-base;
  }
}
</style>