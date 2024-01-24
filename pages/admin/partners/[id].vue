<template>
  <div>
    <h2>Редактировать партнера</h2>
    <v-form
      ref="form"
      @submit.prevent
      @submit="submitForm"
    >
      <Uploader
        :file="partnersItem.images"
        @removeImage="handleRemoveImage"
        @uploadImage="uploadImage"
      />
      <v-text-field
        v-model="partnersItem.title"
        :rules="requiredRules"
        label="Название"
      />
      <v-text-field
        v-model="partnersItem.description"
        label="Описание"
      />
      <v-text-field
        v-model="partnersItem.partner_link"
        label="Ссылка"
      />
      <v-btn
        color="#27ae60"
        type="submit"
      >Сохранить
      </v-btn>
    </v-form>
    <SuccessAlert :successMessage="successMessage" />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref, watch } from 'vue';
import { requiredRules } from '@/utils/validation';
import { storeToRefs } from 'pinia';
import { usePartnersStore } from '~/store/partners-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { partnersItem } = storeToRefs(usePartnersStore());
const { putPartnersItem, getPartnersItem, deletePartnersImage, uploadPartnersImages } = usePartnersStore();
const partnerId = useRoute().params.id;
const form = ref();
const successMessage = ref();
await getPartnersItem(partnerId);
const newImagesList = ref();


const submitForm = async (): Promise<void> => {
  const data = {
    title: partnersItem.value.title,
    description: partnersItem.value.description,
    partner_link: partnersItem.value.partner_link,
  };

  if (form.value.isValid) {
    const response = await putPartnersItem(data, partnerId);
    successMessage.value = response;

    if (newImagesList.value) {
      await saveImage();
    }
  }

};

const saveImage = async (): Promise<void> => {
  const formData = new FormData();
  formData.append('partner_id', partnerId);
  formData.append('image', newImagesList.value[0]);
  await uploadPartnersImages(formData);
  setTimeout(() => location.reload(), 3000);
};

const handleRemoveImage = async (id: number): Promise<void> => {
  const response = await deletePartnersImage(id);
  successMessage.value = response;
  await submitForm();
  setTimeout(() => location.reload(), 3000);
};

const uploadImage = (value: File[]): void => {
  newImagesList.value = value;
};

watch(successMessage, () => {
  setTimeout(() => successMessage.value = null, 3000);
});
</script>
<style scoped>
</style>