<template>
  <div class="main-page">
    <Banner :title="aboutPost?.data?.main_title" />
    <TitleItem caption="Проекты" />
    <div class="project-list">
      <HousesList :projects="projectsList" />
      <div class="container">
        <v-btn
          color="#e84118"
          @click="navigateTo({ path: `/projects` }, { external: true })"
        >
          Смотреть все проекты
        </v-btn>
      </div>
    </div>
    <TitleItem caption="Выполненные работы" />
    <div class="project-list">
      <PortfolioList :list="portfolioList" />
      <div class="container">
        <v-btn
          color="#e84118"
          @click="navigateTo({ path: `/portfolio` }, { external: true })"
        >
          Смотреть все проекты
        </v-btn>
      </div>
    </div>
    <TitleItem caption="Партнеры" />
    <div class="container">
      <Partners
        :data="partnersList?.data"
      />
    </div>
    <TitleItem caption="О Компании" />
    <div class="container">
      <ContentBlock>
        <p>
          <div v-html="aboutPost.data?.main_text" />
        </p>
      </ContentBlock>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '~/store/projects-store';
import { usePartnersStore } from '~/store/partners-store';
import { usePortfolioStore } from '~/store/portfolio-store';
import { useAboutStore } from '@/store/about-store';

const { getProjectsList } = useProjectsStore();
const { projectsList } = storeToRefs(useProjectsStore());
const { getPortfolioList } = usePortfolioStore();
const { portfolioList } = storeToRefs(usePortfolioStore());

const { getPartnersList } = usePartnersStore();
const { partnersList } = storeToRefs(usePartnersStore());

const { aboutPost } = storeToRefs(useAboutStore());
const { getAboutData } = useAboutStore();

await getProjectsList(null, 4);
await getPortfolioList(3);
await getPartnersList();
await getAboutData();
</script>
<style
  lang="scss"
  scoped
>
.main-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.project-list {
  .houses-list {
    padding: 0 0 $offset-large;
    min-height: auto;
  }

  .portfolio-list {
    padding: 0 0 $offset-large;
    min-height: auto;
  }

}
</style>
