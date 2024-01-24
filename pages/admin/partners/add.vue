<template>
  <div>
    <h2>Создать партнера</h2>
    <v-form
      ref="form"
      @submit.prevent
      @submit="submitForm"
    >
      <Uploader
        @uploadImage="uploadImage"
      />
      <v-text-field
        v-model="fields.title"
        :rules="requiredRules"
        label="Название"
      />
      <v-text-field
        v-model="fields.description"
        label="Описание"
      />
      <v-text-field
        v-model="fields.partner_link"
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
import { reactive, ref, watch } from 'vue';
import { requiredRules } from '@/utils/validation';
import { usePartnersStore } from '~/store/partners-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { postPartnersItem, uploadPartnersImages } = usePartnersStore();
const successMessage = ref();
const form = ref();
const newImagesList = ref();
const fields = reactive({
  title: '',
  description: '',
  partner_link: '',
});

const submitForm = async (): Promise<void> => {
  if (form.value.isValid) {
    const response = await postPartnersItem(fields);
    successMessage.value = response.message;

    if (newImagesList.value && response?.partner?.id) {
      await saveImage(response?.partner?.id);
    } else {
      setTimeout(() => location.reload(), 2000);
    }
  }
};

const saveImage = async (id: number): Promise<void> => {
  const formData = new FormData();
  formData.append('partner_id', id);
  formData.append('image', newImagesList.value[0]);
  await uploadPartnersImages(formData);
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