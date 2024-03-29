<template>
  <div class="portfolio-page">
    <Head>
      <Title>Монолитстрой | {{ portfolioItem?.title }}</Title>
      <Meta
        name="description"
        content="Проектирование и строительство загородных домов в Ленинградской области"
      />
    </Head>
    <div class="container">
      <h1>{{ portfolioItem.title }}</h1>
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
      <div>
        <ul class="list">
          <li v-if="portfolioItem.year_house">
            <span class="list__key">Год постройки: </span>
            <span class="list__value">{{ portfolioItem.year_house }}</span>
          </li>
          <li v-if="portfolioItem.total_area">
            <span class="list__key">Площадь: </span>
            <span class="list__value">{{ portfolioItem.total_area }}  м<sup>2</sup></span>
          </li>
          <li v-if="portfolioItem.location_house">
            <span class="list__key">Локация: </span>
            <span class="list__value">{{ portfolioItem.location_house }}</span>
          </li>
          <li v-if="portfolioItem.roof_material">
            <span class="list__key">Материал крыши: </span>
            <span class="list__value">{{ portfolioItem.roof_material }}</span>
          </li>
          <li v-if="portfolioItem.roof_type">
            <span class="list__key">Тип крыши: </span>
            <span class="list__value">{{ portfolioItem.roof_type }}</span>
          </li>
          <li v-if="portfolioItem.room_count">
            <span class="list__key">Кол-во комнат: </span>
            <span class="list__value">{{ portfolioItem.room_count }}</span>
          </li>
          <li v-if="portfolioItem.total_area">
            <span class="list__key">Площадь дома: </span>
            <span class="list__value">{{ portfolioItem.total_area }}</span>
          </li>
          <li v-if="portfolioItem.wall_material">
            <span class="list__key">Стены: </span>
            <span>{{ portfolioItem.wall_material }}</span>
          </li>
          <li v-if="portfolioItem.year_house">
            <span class="list__key">Срок строительства: </span>
            <span class="list__value">{{ portfolioItem.year_house }}</span>
          </li>
          <li v-if="portfolioItem.level_type">
            <span class="list__key">Кол-во этажей: </span>
            <span class="list__value">{{ portfolioItem.level_type }}</span>
          </li>
          <li v-if="portfolioItem.heating_type">
            <span class="list__key">Отопление: </span>
            <span class="list__value">{{ portfolioItem.heating_type }}</span>
          </li>
          <li v-if="portfolioItem.foundation_type">
            <span class="list__key">Фундамент: </span>
            <span class="list__value">{{ portfolioItem.foundation_type }}</span>
          </li>
          <li v-if="portfolioItem.additional_building">
            <span class="list__key">Дополнительные строения: </span>
            <span class="list__value">{{ portfolioItem.additional_building }}</span>
          </li>
        </ul>
      </div>
      <div
        v-if="portfolioItem.description"
        class="portfolio-page__description"
      >
        {{ portfolioItem.description }}
      </div>
      <h2>Фотогалерея</h2>
      <div class="portfolio-page__images">
        <card-slider
          :images="portfolioItem?.images"
        />
      </div>
      <div
        v-if="portfolioItem.info_house"
        class="portfolio-page__description"
        v-html="portfolioItem.info_house"
      />
      <div
        v-if="portfolioItem.video_house"
        class="portfolio-page__video"
      >
        <Video-youtube :linkVideo="portfolioItem.video_house" />
      </div>
    </div>
    <div
      v-if="portfolioItem.map_link"
      class="portfolio-page__map"
    >
      <div class="container">
        <h2>Объект на карте</h2>
      </div>
      <iframe
        :src="getSourceIframe(portfolioItem.map_link)"
        width="100%"
        height="450"
        frameborder="1"
        allowfullscreen="true"
        style="position: relative"
      >
      </iframe>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { usePortfolioStore } from '~/store/portfolio-store';
const { getPortfolioItem } = usePortfolioStore();

// TODO: сделать ssr загрузку
const { data: portfolioItem } = await useAsyncData(
  'portfolioItem',
  () => getPortfolioItem(useRoute().params.id),
);

const getSourceIframe = (html: string): string => {
  const iframeSourceRegex = /<iframe[^>]+src=["'](.*?)["']/i;
  const match = html.match(iframeSourceRegex);
  return match ? match[1] : '';
};

const breadcrumbs = [
  {
    title: 'Выполненные работы',
    disabled: false,
    href: '/portfolio',
  },
  {
    title: portfolioItem.title,
    disabled: true,
  },
]
// getPortfolioItem(useRoute().params.id);

</script>
<style
  scoped
  lang="scss"
>
.portfolio-page {
  padding: $offset-large 0 0;

  &__images {
    max-width: 1000px;
    margin: 0 auto $offset-large;

    img {
      max-width: 100%;
    }

  }

  &__images-item {
    margin: 0 0 15px;
  }

  &__description {
    margin-bottom: $offset-large;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    padding: 40px 30px 40px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 15px rgba(0, 0, 0, 0.25);
  }

  &__video {
    margin-bottom: $offset-large;
  }
}

.list {
  margin: $offset-large 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: $offset-base;

  @media (max-width: $laptop-h) {
    grid-template-columns: repeat(1, 1fr);
  }

  i {
    display: none;
  }

  &__key {
    font-weight: 600;
    font-size: 13px;
  }

  &__value {

  }
}
</style>