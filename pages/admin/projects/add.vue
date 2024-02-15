<template>
  <div class="admin-projects-add">
    <v-form
      ref="form"
      @submit.prevent
      @submit="postProject"
    >
      <h2>Создание нового проекта</h2>
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
        @removeImage="(id) => deleteProjectImage(id)"
      />
      <br>
      <h3>Характеристики проекта</h3>
      <div class="admin-projects-add__group">
        <v-text-field
          v-model="projectFields.title"
          :rules="requiredRules"
          label="Название проекта"
        />
        <v-text-field
          v-model="projectFields.article"
          :rules="requiredRules"
          label="Артикул"
        />
        <v-text-field
          v-model="projectFields.project_video"
          label="Ссылка на видео в ютуб"
        />
        <v-text-field
          v-model="projectFields.price_turnkey"
          min="0"
          type="number"
          label="Стоимость под ключ"
        />
        <v-text-field
          v-model="projectFields.price_per_project"
          min="0"
          type="number"
          label="Стоимость проектирования"
        />
        <v-text-field
          v-model="projectFields.total_area"
          type="number"
          min="0"
          max="1000"
          label="Общая площадь"
        />
        <v-text-field
          v-model="projectFields.construction_period"
          type="number"
          min="0"
          label="Сроки строительства"
        />
        <v-text-field
          v-model="projectFields.project_period"
          type="number"
          min="0"
          label="Сроки проектирования"
        />
        <v-text-field
          v-model="projectFields.additional_buildings"
          label="Дополнительные строения"
        />
      </div>
      <h3>Опции проекта</h3>
      <div class="admin-projects-add__options">
        <v-select
          v-model="projectFields.roof_type_id"
          label="Тип крыши"
          :items="filtersList.roofTypes"
          clearable
          return-object
        />
        <v-select
          v-model="projectFields.roof_material_id"
          label="Материал крыши"
          :items="filtersList.roofMaterials"
          return-object
          clearable
        />
        <v-select
          v-model="projectFields.wall_material_id"
          label="Материал стен"
          :items="filtersList.wallMaterials"
          return-object
          clearable
        />
        <v-select
          v-model="projectFields.foundation_type_id"
          label="Тип фундамента"
          :items="filtersList.foundationTypes"
          return-object
          clearable
        />
        <v-select
          v-model="projectFields.heating_type_id"
          label="Тип отопления"
          :items="filtersList.heatingTypes"
          return-object
          clearable
        />
        <v-select
          v-model="projectFields.level_type_id"
          label="Кол-во этажей"
          :items="filtersList.levelTypes"
          return-object
          clearable
        />
        <v-select
          v-model="projectFields.room_count_id"
          label="Кол-во комнат"
          :items="filtersList.roomCounts"
          return-object
          clearable
        />
      </div>
      <h3>Описание проекта</h3>
      <v-textarea
        v-model="projectFields.description"
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
    <h3>Расширенное описание</h3>
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
import { useProjectsStore } from '@/store/projects-store';
import { requiredRules } from '@/utils/validation';
import { useFiltersStore } from '@/store/filters-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { postProjectsItem, uploadProjectImages, deleteProjectImage } = useProjectsStore();
const { getFiltersList } = useFiltersStore();

const { filtersList } = storeToRefs(useFiltersStore());
const newImagesList = ref();
const successMessage = ref();
const form = ref();
const content = ref()

await getFiltersList();

const projectFields = reactive({
  title: '',
  article: '',
  description: '',
  extende_info: '',
  project_video: '',
  characteristics: '',
  price_turnkey: '',
  price_per_project: '',
  total_area: '',
  construction_period: '',
  project_period: '',
  additional_buildings: '',
  roof_material_id: null,
  wall_material_id: null,
  foundation_type_id: null,
  roof_type_id: null,
  heating_type_id: null,
  level_type_id: null,
  room_count_id: null,
});

const postProject = async (e: Event): Promise<void> => {
  e.preventDefault();

  if (form.value.isValid) {

    const data = {
      ...projectFields,
      roof_type_id: projectFields.roof_type_id?.id,
      roof_material_id: projectFields.roof_material_id?.id,
      wall_material_id: projectFields.wall_material_id?.id,
      foundation_type_id: projectFields.foundation_type_id?.id,
      heating_type_id: projectFields.heating_type_id?.id,
      level_type_id: projectFields.level_type_id?.id,
      room_count_id: projectFields.room_count_id?.id,
      extende_info: content.value,
    };

    const response = await postProjectsItem(data);
    successMessage.value = response.message;
    if (newImagesList.value && response?.product?.id) {
      await saveImage(response?.product?.id);
    }
  }
};

const saveImage = async (id: number): Promise<void> => {
  const formData = new FormData();
  formData.append('project_id', id);
  for (let index = 0; index < newImagesList.value.length; index++) {
    formData.append('images[]', newImagesList.value[index]);
  }
  await uploadProjectImages(formData);
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