<template>
  <header :class="{ 'is-loading': isLoading }" class="header">
    <div class="container">
      <div class="header__wrap">
        <div class="header__logo">
          <Logo />
        </div>
        <div class="header__contact-info">
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
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.header {
  background-color: $bg-light;
  color: $bg-dark;
  padding: 10px;

  &.is-loading {
    @include skeleton(100%, 90px);
  }

  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
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
  }

  &__slogan {
    font-size: 14px;
  }

  &__text {
    font-size: 14px;
  }

  .address {
    align-items: flex-end;
  }
}
</style>
