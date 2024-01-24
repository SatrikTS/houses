<template>
  <div class="main-page">
    <Banner />
    <TitleItem caption="Проекты" />
    <div class="project-list">
      <HousesList :projects="projectsList" />
      <div class="container">
        <v-btn
          color="#e84118"
          @click="navigateTo({ path: `/projects` })"
        >
          Смотреть все проекты
        </v-btn>
      </div>
    </div>
    <TitleItem caption="Наши работы" />
    <div class="project-list">
      <PortfolioList :list="portfolioList" />
      <div class="container">
        <v-btn
          color="#e84118"
          @click="navigateTo({ path: `/portfolio` })"
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
    <ContentBlock>
      <p>
        Добро пожаловать на сайт нашей компании по строительству домов в
        Санкт-Петербурге и области! Мы - команда профессионалов,
        специализирующихся на создании уютных и функциональных жилых
        пространств, которые сочетают в себе высокое качество, современные
        технологии и индивидуальный подход.
      </p>
      <p>
        Наши услуги включают в себя полный цикл строительства, начиная от
        проектирования и заканчивая сдачей готового объекта. Мы предоставляем
        широкий спектр строительных услуг: от возведения каркасных и кирпичных
        домов до ремонта и реконструкции существующих строений. Независимо от
        размера и сложности проекта, мы гарантируем высокий уровень
        профессионализма и внимание к деталям.
      </p>
      <p>
        Наша цель - воплотить мечты клиентов в реальность, предоставляя надежные
        и стильные жилья. Мы сотрудничаем с опытными архитекторами, дизайнерами
        и строителями, чтобы обеспечить нашим заказчикам результат, который
        превосходит их ожидания.
      </p>
    </ContentBlock>
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

const { getProjectsList } = useProjectsStore();
const { projectsList } = storeToRefs(useProjectsStore());
const { getPortfolioList } = usePortfolioStore();
const { portfolioList } = storeToRefs(usePortfolioStore());

const { getPartnersList } = usePartnersStore();
const { partnersList } = storeToRefs(usePartnersStore());

await getProjectsList(null, 4);
await getPortfolioList(3);
await getPartnersList();
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
