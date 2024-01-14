<template>
  <v-dialog
    v-model="showModal"
    class="modal"
  >
    <v-card>
      <v-toolbar
        color="#27ae60"
        title="Создать новый элемент в список"
      ></v-toolbar>
      <v-card-text>
        <v-form
          class="form"
          @submit.prevent
          @submit="emit('confirm')"
        >
          <v-text-field
            v-model="title"
            class="input"
            label="Название "
          />
          <v-textarea
            v-model="description"
            clearable
            clear-icon="mdi-close-circle"
            label="Описание"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="emit('update:modelValue', false)"
        >Отмена
        </v-btn>
        <v-btn
          color="#27ae60"
          @click="emit('confirm')"
        >Добавить элемент
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script
  setup
  lang="ts"
>
import { watch, ref } from 'vue';

interface Props {
  modelValue: boolean
}

interface IEmits {
  (e: 'update:modelValue', value: boolean): void,
  (e: 'update:titleOption', value: string): void,
  (e: 'update:descriptionOption', value: string): void,
  (e: 'confirm'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();

const showModal = ref();
const title = ref();
const description = ref();

watch(() => title.value, () => {
  emit('update:titleOption', title.value);
});

watch(() => description.value, () => {
  emit('update:descriptionOption', description.value);
});

watch(() => props.modelValue, (oldState) => {
  showModal.value = oldState;
  if(!showModal.value) {
    title.value = ''
    description.value = ''
  }
});

watch(() => showModal.value, () => {
  if (!showModal.value) emit('update:modelValue', false);
});
</script>
