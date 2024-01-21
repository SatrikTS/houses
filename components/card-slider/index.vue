<template>
  <div class="card-slider">
      <div class="card-slider__big-img">
        <img
          :src="activeImage.url"
          alt="Строительство домов"
        >
      </div>
      <div class="card-slider__select-wrap">
        <div 
          class="card-slider__select-item"
          v-for="(item, index) in images" 
          :key="item.id"
        >
          <div 
            class="card-slider__select-img-wrap"
            @click="setActiveImage(index)"
          >
            <img
              :src="item.url"
              alt="Строительство домов"
            >
          </div>
        </div>
      </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, reactive, onMounted } from 'vue';

const images = ref();
const activeImage = ref();

const fetchPhotos = async (): Promise<void> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
  const data = await response.json();
  images.value = data;
};

const setActiveImage = (index: number) => {
  activeImage.value = images.value[index];
};

await fetchPhotos();
activeImage.value = images.value[0];
</script>
<style
  scoped
  lang="scss"
>
.card-slider {
  &__big-img {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    border-radius: $offset-small;
    overflow: hidden;
    margin-bottom: 30px;
    
    img {
      position: absolute; 
      width: 100%;
      height: 100%;
      top: 0; 
      left: 0;
      object-fit: cover;
    }
  }

  &__select-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  &__select-item {
    width: 20%;
    min-width: 100px;
    padding: 4px;
    cursor: pointer;
  }

  &__select-img-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    border-radius: 5px;
    overflow: hidden;


    img {
      position: absolute; 
      width: 100%;
      height: 100%;
      top: 0; 
      left: 0;
      object-fit: cover;
    }
  }
}
</style>