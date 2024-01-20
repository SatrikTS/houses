<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="row">
      <div class="column-4">
        <v-btn color="#27ae60" @click="optionModal = true"
          >Добавить элемент
        </v-btn>
      </div>
    </div>
    <div class="category-list">
      <div class="category-list__header">
        <div class="category-list__item category-list__item--id">ID</div>
        <div class="category-list__item">Название материала</div>
        <div class="category-list__item">Описание</div>
        <div class="category-list__item category-list__item--btns">
          Управление
        </div>
      </div>
      <div
        v-for="(item, index) in list"
        :key="item.title"
        class="category-list__content"
      >
        <div class="category-list__item category-list__item--id">
          {{ item.id }}
        </div>
        <div
          ref="titleElement"
          class="category-list__item"
          contenteditable="true"
        >
          {{ item.title }}
        </div>
        <div
          ref="descriptionElement"
          class="category-list__item"
          contenteditable="true"
        >
          {{ item.description }}
        </div>
        <div class="category-list__item category-list__item--btns">
          <v-btn color="#f1c40f" @click="saveItemOption(item, index)">
            Сохранить
            <IconEdit />
          </v-btn>
          <v-btn color="#e74c3c" @click="showRemoveModal(item.id)">
            <IconRemove />
          </v-btn>
        </div>
      </div>
    </div>
    <v-alert v-if="updateMsg" type="success" class="alert">
      {{ updateMsg }}
    </v-alert>
    <OptionAddModal
      v-model="optionModal"
      v-model:titleOption="titleOption"
      v-model:descriptionOption="descriptionOption"
      @confirm="submitNewOption"
    />
    <RemoveOptionModal v-model="removeModal" @confirm="confirmRemoveModal" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import IconEdit from '@/assets/icons/IconEdit.vue';
import IconRemove from '@/assets/icons/IconDelete.vue';
import OptionAddModal from '@/components/dictionaries-modals/option-add-modal.vue';
import RemoveOptionModal from '@/components/dictionaries-modals/option-remove-modal.vue';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

interface OptionListItem {
  id?: number;
  title: string;
  description?: string;
}

interface Props {
  /**
   * Заголовок блока
   */
  title: string;
  /**
   * Сообщение об успешной операции
   */
  updateMsg: string;
  /**
   * Список опций
   */
  list: OptionListItem[];
}

interface IEmits {
  /**
   * Обновление данных
   * @param e
   * @param params
   * @param id
   */
  (e: 'updateData', params: OptionListItem, id: number): void;
  /**
   * Удаление данных
   * @param e
   * @param id
   */
  (e: 'removeData', id: number): void;
  /**
   * Создание новой опции
   * @param e
   * @param params
   */
  (e: 'createData', params: OptionListItem): void;
}

defineProps<Props>();
const emit = defineEmits<IEmits>();

const titleElement = ref();
const descriptionElement = ref();
const optionModal = ref(false);
const titleOption = ref();
const descriptionOption = ref();
const removeModal = ref(false);
const removeOptionId = ref();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const confirmRemoveModal = (): void => {
  emit('removeData', removeOptionId.value);
  removeModal.value = false;
  removeOptionId.value = null;
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
const saveItemOption = (item: any, index: number): void => {
  const dataForm = {
    title: titleElement.value[index].textContent.trim(),
    description: descriptionElement.value[index].textContent.trim(),
  };
  emit('updateData', dataForm, item.id);
};

/**
 * Создаем новую опцию в список
 */
const submitNewOption = (): void => {
  const dataForm = {
    title: titleOption.value,
    description: descriptionOption.value,
  };
  emit('createData', dataForm);
  optionModal.value = false;
};
</script>
<style scoped lang="scss">
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
