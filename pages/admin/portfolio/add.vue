<template>
  <div class="admin-projects-add">
    <v-form
      ref="form"
      @submit.prevent
      @submit="submitPortfolioItem"
    >
      <h2>Создание нового проекта в портфолио</h2>
      <v-btn
        color="#27ae60"
        type="submit"
      >Сохранить
      </v-btn>
      <br>
      <br>
      <h3>Изображения проекта</h3>
      <Uploader
        @uploadImage="uploadImage"
      />
      <br>
      <h3>Характеристики проекта</h3>
      <div class="admin-projects-add__group">
        <v-text-field
          v-model="portfolioItemFields.title"
          :rules="requiredRules"
          label="Название проекта"
        />
        <v-text-field
          v-model="portfolioItemFields.video_house"
          label="Ссылка на видео в ютуб"
        />
        <v-text-field
          v-model="portfolioItemFields.location_house"
          label="Локация"
        />
        <v-text-field
          v-model="portfolioItemFields.map_link"
          label="Ссылка на карту Яндекс"
        />
        <v-text-field
          v-model="portfolioItemFields.total_area"
          type="number"
          min="0"
          max="1000"
          label="Общая площадь"
        />
        <v-text-field
          v-model="portfolioItemFields.construction_period"
          type="number"
          min="0"
          label="Сроки строительства"
        />
        <v-text-field
          v-model="portfolioItemFields.year_house"
          type="number"
          min="0"
          label="Год постройки"
        />
        <v-text-field
          v-model="portfolioItemFields.additional_building"
          label="Дополнительные строения"
        />
      </div>
      <h3>Опции проекта</h3>
      <div class="admin-projects-add__options">
        <v-select
          v-model="portfolioItemFields.roof_type"
          label="Тип крыши"
          :items="filtersList.roofTypes"
          clearable
        />
        <v-select
          v-model="portfolioItemFields.roof_material"
          label="Материал крыши"
          :items="filtersList.roofMaterials"
          clearable
        />
        <v-select
          v-model="portfolioItemFields.wall_material"
          label="Материал стен"
          :items="filtersList.wallMaterials"
          clearable
        />
        <v-select
          v-model="portfolioItemFields.foundation_type"
          label="Тип фундамента"
          :items="filtersList.foundationTypes"
          clearable
        />
        <v-select
          v-model="portfolioItemFields.heating_type"
          label="Тип отопления"
          :items="filtersList.heatingTypes"
          clearable
        />
        <v-select
          v-model="portfolioItemFields.level_type"
          label="Кол-во этажей"
          :items="filtersList.levelTypes"
          clearable
        />
        <v-select
          v-model="portfolioItemFields.room_count"
          label="Кол-во комнат"
          :items="filtersList.roomCounts"
          clearable
        />
        <v-textarea
          v-model="portfolioItemFields.description"
          label="Описание"
        />
      </div>
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
      <Editor v-model="content" />
    </ClientOnly>
    <SuccessAlert :successMessage="successMessage" />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { requiredRules } from '@/utils/validation';
import { usePortfolioStore } from '@/store/portfolio-store';
import { useFiltersStore } from '@/store/filters-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { postPortfolioItem, uploadPortfolioImages } = usePortfolioStore();
const { getFiltersList } = useFiltersStore();
const { filtersList } = storeToRefs(useFiltersStore());

const newImagesList = ref();
const successMessage = ref();
const form = ref();
const content = ref();

await getFiltersList();

const portfolioItemFields = reactive({
  title: '',
  description: '',
  year_house: '',
  location_house: '',
  map_link: '',
  info_house: '',
  video_house: '',
  total_area: '',
  price_per_project: '',
  construction_period: '',
  project_period: '',
  additional_building: '',
  roof_material: null,
  wall_material: null,
  foundation_type: null,
  roof_type: null,
  heating_type: null,
  level_type: null,
  room_count: null,
});

const submitPortfolioItem = async (e: Event): Promise<void> => {
  e.preventDefault();

  if (form.value.isValid) {

    const data = {
      ...portfolioItemFields,
      info_house: content.value,
    };

    const response = await postPortfolioItem(data);
    successMessage.value = response.message;
    if (newImagesList.value && response?.portfolio?.id) {
      await saveImage(response?.portfolio?.id);
    } else {
      setTimeout(() => location.reload(), 2000);
    }
  }
};

const saveImage = async (id: number): Promise<void> => {
  const formData = new FormData();
  formData.append('portfolio_id', id);
  for (let index = 0; index < newImagesList.value.length; index++) {
    formData.append('images[]', newImagesList.value[index]);
  }
  await uploadPortfolioImages(formData);
  setTimeout(() => location.reload(), 3000);
};

const uploadImage = (value: File[]): void => {
  newImagesList.value = value;
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