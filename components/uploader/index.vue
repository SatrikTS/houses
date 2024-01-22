<template>
  <div class="uploader">
    <input
      v-if="single"
      ref="fileInputRef"
      type="file"
      class="uploader__input"
      @change="onFileChange"
    >
    <input
      v-else
      ref="fileInputRef"
      type="file"
      multiple
      class="uploader__input"
      @change="onFileChange"
    >
    <div class="uploader__list">
      <v-btn
        class="uploader__btn"
        @click="triggerFileInput"
      ><v-icon icon="mdi-cloud-upload"></v-icon>
      </v-btn>
      <div
        v-for="(item, index) in uploadedFiles"
        :key="item"
        class="uploader__img uploader__img--temporary"
      >
        <img
          v-if="uploadedFiles.length"
          :src="getFileDataURL(item)"
          alt="каринка продукта"
        >
        <v-btn
          size="small"
          buttonStyle="danger"
          type="button"
          @click="removeImage(index)"
        >
          <IconRemove />
        </v-btn>
      </div>
      <div v-if="publishedFiles" class="uploader__img-list">
        <div
          v-for="item in publishedFiles"
          :key="item.img"
          class="uploader__img"
        >
          <img
            :src="MAIN_URL+item.img"
            :alt="item.id"
          >
          <v-btn
            size="small"
            buttonStyle="danger"
            type="button"
            @click="confirmRemoveModal(item.id)"
          >
            <IconRemove />
          </v-btn>
        </div>
      </div>
    </div>
    <RemoveOptionModal
      v-model="isShowModal"
      @confirm="removeImageFromServer"
    />
  </div>
</template>
<script setup lang="ts">
import IconRemove from '@/assets/icons/IconDelete.vue'
import { ref, watch } from 'vue'
import RemoveOptionModal from '@/components/modals/option-remove-modal.vue';

interface Props {
  name: string,
  file: any,
  single: boolean,
}

const props = defineProps<Props>()

const emit = defineEmits(['uploadImage', 'updateData', 'removeImage'])

const MAIN_URL = useRuntimeConfig().public.MAIN_URL
const fileInputRef = ref(null)
const inputValue = ref()
const uploadedFiles = ref([])
const isShowModal = ref(false)
const removeImageId = ref()
const publishedFiles = ref(props.file)

function onFileChange(event): void {
  inputValue.value = event.target.files[0]
  const files = event.target.files

  if (!uploadedFiles.value) {
    uploadedFiles.value = Array.from(files)
  } else {
    for (const file of files) {
      uploadedFiles.value.push(file)
    }
  }

  emit('uploadImage', uploadedFiles.value)
}

/**
 * Формируем урл для показа локальной загрузки картинки
 * @param file
 * @returns {string}
 */
function getFileDataURL(file: File): any {
  if (uploadedFiles.value.length) {
    return URL.createObjectURL(file)
  }
}

/**
 * Удаление картинки из локального хранилища до загрузки
 * @param index
 */
function removeImage(index: number): void {
  uploadedFiles.value.splice(index, 1)
}

/**
 * Удаление картинки с запросом на сервер
 * @param index
 */
function removeImageFromServer(): void {
  isShowModal.value = false
  emit('removeImage', removeImageId.value)
  emit('updateData')
}

function confirmRemoveModal(imageId: number): void {
  isShowModal.value = true
  removeImageId.value = imageId
}

/**
 * Триггер через кнопку на инпут
 */
function triggerFileInput(): void {
  fileInputRef.value.click()
}

watch(
  () => props.file,
  (newFile) => {
    publishedFiles.value = newFile
  },
)
</script>
<style
  scoped
  lang="scss"
>
.uploader {

  &__input {
    font-size: 0;
    opacity: 0;
    display: none;
  }

  &__list {
    margin: 0 -4px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  &__btn {
    width: 120px;
    height: 120px !important;
    border: 3px solid #f3f3f3;
    margin: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  &__btn-icon {
    margin: 0 0 16px;

    svg {
      fill: $secondary;
    }
  }

  &__img {
    width: 120px;
    height: 120px;
    border: 3px solid $bg-base;
    margin: 4px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: relative;

    &--temporary {

      &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: -6px;
        right: -6px;
        bottom: -6px;
        border: 3px solid transparent;
        border-radius: inherit;
        animation: borderBlink 1s infinite;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
    }

    button {
      position: relative;
      z-index: 1;
    }
  }

  &__img-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}

@keyframes borderBlink {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: $bg-gold;
  }
  100% {
    border-color: transparent;
  }
}
</style>