<template>
  <header :class="{ 'is-loading': isLoading }" class="header">
    <div class="container">
      <div class="header__wrap">
        <div v-if="!isMobileSize" class="header__logo">
          <Logo />
        </div>
        <div class="header__contact-info header__contact-info--schedule">
          <span class="header__label">Время работы</span>
          <span class="header__text">{{ contacts?.schedule }}</span>
          <span class="header__text">вс: выходной</span>
        </div>
        <div class="header__contact-info">
          <Phones :phone1="contacts?.phone_1" :phone2="contacts?.phone_2" />
        </div>
        <div class="header__contact-info header__contact-info--last">
          <Address :address="contacts?.address" />
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
interface Contacts {
  address: string;
  email_1: string;
  email_2: string;
  phone_1: string;
  phone_2: string;
  schedule: string;
  whereabouts: string;
}

interface Props {
  contacts: Contacts;
  isLoading: boolean;
  isMobileSize: boolean
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.header {
  background-color: $bg-light;
  color: $bg-dark;
  padding: 10px;

  @media (max-width: $laptop-w) {
    padding: 10px 0;
  }

  &.is-loading {
    @include skeleton(100%, 90px);
  }

  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    @media (max-width: $laptop-w) {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    @media (max-width: $laptop-h) {
      gap: 4px
    }
  }

  &__label {
    font-size: 0.9em;
    font-weight: 600;
  }

  &__contact-info {
    display: flex;
    flex-direction: column;

    &--last {
      align-items: flex-end;
    }

    &--schedule {
      @media (max-width: $laptop-w) {
        display: none;
      }
    }
  }

  &__slogan {
    font-size: 14px;
  }

  &__text {
    font-size: 14px;
  }

  .address {
    align-items: flex-end;

    @media (max-width: $mobile) {
      align-items: flex-start;
    }
  }
}
</style>
