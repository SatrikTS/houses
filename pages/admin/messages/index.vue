<template>
  <div class="messages">
    <h1>Сообщения</h1>
    <div>Всего сообщений: {{ messagesList.total }} шт.</div>
    <div class="messages__item messages__item--top">
      <div class="messages__date">
        Дата
      </div>
      <div class="messages__name">
        Имя
      </div>
      <div class="messages__email">
        email
      </div>
      <div class="messages__phone">
        Телефон
      </div>
      <div class="messages__type">
        Предпочтительный способ связи
      </div>
      <div class="messages__text">
        Сообщение
      </div>
      <div class="messages__service">
      </div>
    </div>
    <div
      v-for="item in messagesList.data"
      :key="item.name + Math.floor(Math.random() * 333)"
    >
      <div class="messages__item">
        <div class="messages__date">
          {{ dateFormatter(item.created_at) }}
        </div>
        <div class="messages__name">
          <b>{{ item.name }}</b>
        </div>
        <div class="messages__email">
          {{ item.email }}
        </div>
        <div class="messages__phone">
          {{ item.phone }}
        </div>
        <div class="messages__type">
          {{ item.method_communication }}
        </div>
        <div class="messages__text">
          {{ item.message }}
        </div>
        <div class="messages__service">
          <v-btn
            color="#e74c3c"
            @click="showRemoveModal(item.id)"
          >
            <IconRemove />
          </v-btn>
        </div>
      </div>
    </div>
    <RemoveOptionModal
      v-model="removeModal"
      @confirm="confirmRemoveModal"
    />
    <v-alert
      v-if="updateMsg"
      type="success"
      class="alert"
    >
      {{ updateMsg }}
    </v-alert>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import IconRemove from '@/assets/icons/IconDelete.vue';
import RemoveOptionModal from '@/components/modals/option-remove-modal.vue';
import { useMessagesStore } from '@/store/user-messages-store';
// import {dateFormatter} from '~/utils/dateFormatter'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getMessagesList, deleteMessage } = useMessagesStore();
const { messagesList } = storeToRefs(useMessagesStore());
const removeModal = ref(false);
const removeOptionId = ref();
const updateMsg = ref();

await getMessagesList();

const showRemoveModal = (id: string): void => {
  removeOptionId.value = id;
  removeModal.value = true;
};

const confirmRemoveModal = async (): Promise<void> => {
  const response = await deleteMessage(removeOptionId.value);
  console.log(response);
  setTimeout(() => {
    updateMsgStatus(response);
  });
  removeModal.value = false;
  removeOptionId.value = null;
  getMessagesList()
};

/**
 * Обновляем показ успешных сообщений
 * @param response
 */
const updateMsgStatus = (response: string): void => {
  updateMsg.value = response;
  setTimeout(() => (updateMsg.value = ''), 2000);
};
</script>
<style
  scoped
  lang="scss"
>
.messages {
  position: relative;
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    flex-direction: row;
    padding: 8px 4px;
    border-bottom: 1px solid $bg-dark2;

    &:hover {
      background: $bg-base;
    }

    &--top {
      background: $bg-dark;
      color: $bg-base;

      &:hover {
        background: $bg-dark;
        color: $bg-base;
      }
    }
  }

  &__date {
    width: 150px;
  }

  &__name {
    width: 200px;
  }

  &__email {
    width: 150px;
  }

  &__phone {
    width: 140px;
  }

  &__type {
    width: 200px;
  }

  &__text {
    width: 300px;
    font-size: 14px;
  }

  &__service {
    padding: 0 24px;
    display: flex;
    justify-content: flex-end;
  }

}
</style>