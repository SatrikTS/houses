<template>
  <div>
    <h2>Список материалов крыши</h2>
    <div class="row">
      <div class="column-4">
        <v-btn
          color="#27ae60"
          @click="optionModal = true"
        >Добавить элемент
        </v-btn>
      </div>
    </div>
    <div class="category-list">
      <div class="category-list__header">
        <div class="category-list__item category-list__item--id">ID</div>
        <div class="category-list__item">Название материала</div>
        <div class="category-list__item">Описание</div>
        <div class="category-list__item category-list__item--btns">Управление</div>
      </div>
      <div
        v-for="(item, index) in roofMaterials.data"
        :key="item.title"
        class="category-list__content"
      >
        <div class="category-list__item category-list__item--id">{{ item.id }}</div>
        <div
          ref="titleElement"
          class="category-list__item"
          contenteditable="true"
        >{{ item.title }}
        </div>
        <div
          ref="descriptionElement"
          class="category-list__item"
          contenteditable="true"
        >{{ item.description }}
        </div>
        <div class="category-list__item category-list__item--btns">
          <v-btn
            color="#f1c40f"
            @click="saveItemOption(item, index)"
          >
            Сохранить
            <IconEdit />
          </v-btn>
          <v-btn
            color="#e74c3c"
            @click="showRemoveModal(item.id)"
          >
            <IconRemove />
          </v-btn>
        </div>
      </div>
    </div>
    <v-alert
      v-if="updateMsg"
      type="success"
      class="alert"
    >
      {{ updateMsg }}
    </v-alert>
    <OptionAddModal
      v-model="optionModal"
      v-model:titleOption="titleOption"
      v-model:descriptionOption="descriptionOption"
      @confirm="submitNewOption"
    />
    <RemoveOptionModal
      v-model="removeModal"
      @confirm="confirmRemoveModal"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoofsStore } from '@/store/roofs-store';
import IconEdit from '@/assets/icons/IconEdit.vue';
import IconRemove from '@/assets/icons/IconDelete.vue';
import OptionAddModal from '@/components/dictionaries-modals/option-add-modal.vue';
import RemoveOptionModal from '@/components/dictionaries-modals/option-remove-modal.vue';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getRoofMaterials, deleteRoofMaterial, putRoofMaterial, postRoofMaterial } = useRoofsStore();
const { roofMaterials } = storeToRefs(useRoofsStore());
await getRoofMaterials();
const titleElement = ref();
const descriptionElement = ref();
const updateMsg = ref();
const optionModal = ref(false);
const titleOption = ref();
const descriptionOption = ref();
const removeModal = ref(false);
const removeOptionId = ref();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const confirmRemoveModal = async (): Promise<void> => {
  const response = await deleteRoofMaterial(removeOptionId.value);
  removeModal.value = false;
  removeOptionId.value = null;
  updateMsgStatus(response);
  await getRoofMaterials();
};

const showRemoveModal = (id: string): void => {
  removeOptionId.value = id;
  removeModal.value = true;
};

/**
 * Сохраняем опцию при изменении
 * @param item
 * @param index
 */
const saveItemOption = async (item: any, index: number): Promise<void> => {
  const dataForm = {
    title: titleElement.value[index].textContent.trim(),
    description: descriptionElement.value[index].textContent.trim(),
  };
  const response = await putRoofMaterial(dataForm, item.id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const submitNewOption = async (): Promise<void> => {
  const dataForm = {
    title: titleOption.value,
    description: descriptionOption.value,
  };
  const response = await postRoofMaterial(dataForm);
  optionModal.value = false;
  updateMsgStatus(response);
  await getRoofMaterials();
};

/**
 * Обновляем показ успешных сообщений
 * @param response
 */
const updateMsgStatus = (response: string): void => {
  updateMsg.value = response;
  setTimeout(() => updateMsg.value = '', 2000);
};
</script>
<style
  scoped
  lang="scss"
>
.category-list {
  min-height: 600px;
  margin: 0 0 $offset-base;

  &__header {
    display: flex;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;

    & > div {
      background: #f3f3f3;
    }
  }

  &__content {
    display: flex;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;

    &:hover {
      background: rgba($bg-base, 0.5);
    }
  }

  &__item {
    border: 1px solid $bg-base;
    border-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px;
    flex: 1;

    &--btns {
      width: 250px;
      flex: none;

      button {
        margin: 0 4px;
      }
    }

    &--id {
      width: 100px;
      flex: none;
    }
  }
}
</style>