<template>
  <div class="partners">
    <div v-for="item in data" :key="item.id" class="partners-item">
      <div class="partners-item__wrap">
        <img
          :src="MAIN_URL + '/' + item.images[0]?.img"
          :alt="item.title"
        >
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  data: any;
}

defineProps<Props>();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
</script>
<style
  scoped
  lang="scss"
>
.partners {
  display: flex;
  flex-wrap: wrap;
  padding: 48px 0 32px;
}

.partners-item {
  align-items: center;
  display: flex;
  height: 150px;
  margin: 0;
  overflow: hidden;
  padding: 8px;
  transition: box-shadow .25s ease-in-out;
  width: 25%;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 0 20px #0003, 0 0 10px #0000001a;
  }

  &__wrap {
    align-items: center;
    border: 1px solid #e5e5e5;
    display: flex;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    border-radius: 8px;
  }

  img {
    height: auto;
    -o-object-fit: contain;
    object-fit: contain;
    padding: 8px;
    width: 100%;
  }
}
</style>