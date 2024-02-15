<template>
  <div
    v-if="projectsList"
    class="projects"
  >
    <Head>
      <Title>Монолитстрой | Проекты домов</Title>
      <Meta
        name="description"
        content="Проектирование и строительство домов, бань, дач в Санкт-Петербурге"
      />
    </Head>
    <TitleItem
      class="contacts__caption"
      caption="Проекты домов"
    />
    <div class="container">
      <Filters
        class="projects__filters"
        :filtersArray="filtersList"
        :count="projectsList?.total"
        @filters="filtersProjects"
      />
    </div>
    <HousesList
      class="projects__list"
      :projects="projectsList"
      :loader="isProjectsLoading"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import type { FiltersList } from '@/utils/types';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '@/store/projects-store';
import { useFiltersStore } from '@/store/filters-store';

const { getProjectsList } = useProjectsStore();
const { getFiltersList } = useFiltersStore();

const { projectsList, isProjectsLoading } = storeToRefs(useProjectsStore());
const { filtersList } = storeToRefs(useFiltersStore());

getProjectsList();
await getFiltersList();


const filtersProjects = (params: FiltersList): void => {
  getProjectsList(params);
};
</script>
<style
  scoped
  lang="scss"
>
.projects {
  &__filters {
    margin: $offset-large-2 0 0;
  }
}
</style>
