<template>
  <footer :class="{ 'is-loading': isLoading }" class="footer">
    <div class="container">
      <div class="footer__top">
        <Logo />
        <Menu />
      </div>
      <div class="footer__bottom">
        <Address :address="contacts?.address" class="address" />
        <span class="copyright">© ООО «Строительство», 2016—2024</span>
        <Phones :phone1="contacts?.phone_1" :phone2="contacts?.phone_2" />
      </div>
    </div>
  </footer>
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
<style lang="scss">
.footer {
  background: $bg-dark;

  &.is-loading {
    @include skeleton(100%, 170px);
  }

  &__top {
    padding: 16px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $bg-base;
  }

  .logo {
    &__icon {
      width: 80px;
    }

    &__name {
      font-size: 20px;
    }

    &__slogan {
      width: auto;
      color: $bg-main;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 16px 0;
    color: $bg-base;

    .address {
      align-items: flex-start;

      &__text {
        text-align: left;
      }
    }
  }

  .menu {
    width: 100%;

    .container {
      width: auto;
    }

    .menu-item a {
      color: $bg-base;
    }

    .menu-item .router-link-active,
    .menu-item a:hover {
      color: $danger;
    }
  }

  .copyright {
    font-size: 14px;
  }
}
</style>
