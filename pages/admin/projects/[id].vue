<template>
  <div
    v-if="projectsItem"
    :class="{ 'is-loading': isLoading }"
    class="admin-projects-add">
    <v-form
      ref="form"
      @submit.prevent
      @submit="handlePutProject"
    >
      <h2>Редактирование проекта "{{ projectsItem.data.title }}"</h2>
      <v-btn
        color="#27ae60"
        type="submit"
      >Сохранить
      </v-btn>
      <br>
      <br>
      <h3>Изображения проекта</h3>
      <Uploader
        :file="projectsItem.data.images"
        @removeImage="handleRemoveImage"
        @uploadImage="uploadImage"
      />
      <br>
      <h3>Характеристики проекта</h3>
      <div class="admin-projects-add__group">
        <v-text-field
          v-model="projectsItem.data.title"
          :rules="requiredRules"
          label="Название проекта"
        />
        <v-text-field
          v-model="projectsItem.data.article"
          :rules="requiredRules"
          label="Артикул"
        />
        <v-text-field
          v-model="projectsItem.data.project_video"
          label="Ссылка на видео в ютуб"
        />
        <v-text-field
          v-model="projectsItem.data.price_turnkey"
          type="number"
          min="0"
          label="Стоимость под ключ"
        />
        <v-text-field
          v-model="projectsItem.data.price_per_project"
          type="number"
          min="0"
          label="Стоимость проектирования"
        />
        <v-text-field
          v-model="projectsItem.data.total_area"
          type="number"
          min="0"
          max="1000"
          label="Общая площадь"
        />
        <v-text-field
          v-model="projectsItem.data.construction_period"
          type="number"
          min="0"
          label="Сроки строительства в месяцах"
        />
        <v-text-field
          v-model="projectsItem.data.project_period"
          type="number"
          min="0"
          label="Сроки проектирования в месяцах"
        />
        <v-text-field
          v-model="projectsItem.data.additional_buildings"
          label="Дополнительные строения"
        />
      </div>
      <h3>Опции проекта</h3>
      <div class="admin-projects-add__options">
        <v-select
          v-model="projectsItem.data.roof_type"
          label="Тип крыши"
          :items="roofTypesList.data"
          clearable
          return-object
        />
        <v-select
          v-model="projectsItem.data.roof_material"
          label="Материал крыши"
          :items="roofMaterials.data"
          return-object
          clearable
        />
        <v-select
          v-if="wallMaterials?.data"
          v-model="projectsItem.data.wall_material"
          label="Материал стен"
          :items="wallMaterials.data"
          return-object
          clearable
        />
        <v-select
          v-if="foundationsTypes?.data"
          v-model="projectsItem.data.foundation_type"
          label="Тип фундамента"
          :items="foundationsTypes.data"
          return-object
          clearable
        />
        <v-select
          v-if="heatingList?.data"
          v-model="projectsItem.data.heating_type"
          label="Тип отопления"
          :items="heatingList.data"
          return-object
          clearable
        />
        <v-select
          v-if="levelsList?.data"
          v-model="projectsItem.data.level_type"
          label="Кол-во этажей"
          :items="levelsList.data"
          return-object
          clearable
        />
        <v-select
          v-if="roomList?.data"
          v-model="projectsItem.data.room_count"
          label="Кол-во комнат"
          :items="roomList.data"
          return-object
          clearable
        />
      </div>
      <h3>Описание проекта</h3>
      <v-textarea
        v-model="projectsItem.data.description"
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
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useWallsStore } from '@/store/wall-store';
import { useRoofsStore } from '@/store/roofs-store';
import { useFoundationsStore } from '@/store/foundation-store';
import { useHeatingStore } from '@/store/heating-store';
import { useRoomsStore } from '@/store/rooms-store';
import { useLevelsStore } from '@/store/levels-store';
import { useRoofsTypeStore } from '@/store/roofs-type-store';
import { useProjectsStore } from '@/store/projects-store';
import { requiredRules } from '@/utils/validation';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getWallsMaterials } = useWallsStore();
const { getRoofMaterials } = useRoofsStore();
const { getFoundationsTypes } = useFoundationsStore();
const { getHeatingList } = useHeatingStore();
const { getRoomsList } = useRoomsStore();
const { getLevelsList } = useLevelsStore();
const { getRoofsTypeList } = useRoofsTypeStore();
const { putProjectsItem, uploadProjectImages, getProjectsItem, deleteProjectImage } = useProjectsStore();

const { wallMaterials } = storeToRefs(useWallsStore());
const { roofMaterials } = storeToRefs(useRoofsStore());
const { foundationsTypes } = storeToRefs(useFoundationsStore());
const { heatingList } = storeToRefs(useHeatingStore());
const { roomList } = storeToRefs(useRoomsStore());
const { levelsList } = storeToRefs(useLevelsStore());
const { roofTypesList } = storeToRefs(useRoofsTypeStore());
const { projectsItem, isLoading } = storeToRefs(useProjectsStore());

const newImagesList = ref();
const successMessage = ref();
const form = ref();
const projectID = useRoute().params.id;

getWallsMaterials();
getRoofMaterials();
getFoundationsTypes();
getHeatingList();
getRoomsList();
getLevelsList();
getRoofsTypeList();
getProjectsItem(projectID);

const content = ref(projectsItem?.value?.data?.extende_info);

const handlePutProject = async (): Promise<void> => {
  const data = {
    ...projectsItem.value.data,
    roof_type_id: projectsItem.value.data.roof_type?.id,
    roof_material_id: projectsItem.value.data.roof_material?.id,
    wall_material_id: projectsItem.value.data.wall_material?.id,
    foundation_type_id: projectsItem.value.data.foundation_type?.id,
    heating_type_id: projectsItem.value.data.heating_type?.id,
    level_type_id: projectsItem.value.data.level_type?.id,
    room_count_id: projectsItem.value.data.room_count?.id,
    extende_info: content.value,
  };

  const response = await putProjectsItem(data, projectID);
  if (newImagesList.value) {
    await saveImage(response);
  } else {
    successMessage.value = response;
  }
};

const saveImage = async (message: string): Promise<void> => {
  const formData = new FormData();
  formData.append('project_id', projectID);
  for (let index = 0; index < newImagesList.value.length; index++) {
    formData.append('images[]', newImagesList.value[index]);
  }
  await uploadProjectImages(formData);
  successMessage.value = message;
  setTimeout(() => location.reload(), 3000);
};

const uploadImage = (value: File[]): void=> {
  newImagesList.value = value;
};

const handleRemoveImage = async (id: number): Promise<void> => {
  const response = await deleteProjectImage(id)
  successMessage.value = response
  await handlePutProject()
  setTimeout(() => location.reload(), 3000);
}

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

  &.is-loading {
    @include skeleton(100%, 170px);
  }

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