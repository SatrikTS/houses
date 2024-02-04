<template>
  <div class="project">
    <Head>
      <Title>Монолитстрой | {{ projectsItem?.data.title }}</Title>
      <Meta name="description" content="Проектирование и строительство домов, бань, дач в Санкт-Петербурге"/>
    </Head>
    <TitleItem
      class="contacts__caption"
      :caption="projectsItem?.data.title"
    />
    <div class="container">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
      <div class="project__row">
        <div class="project__left">
          <div class="project__images">
            <card-slider
              :images="projectsItem?.data.images"
            />
          </div>
          <div class="project__desc _laptop">
            <Description :projectsItem="projectsItem" />
          </div>
          <div class="project__text">
            <div
              class="project__text-body"
              v-html="projectsItem.data.extende_info"
            />
          </div>
          <div
            v-if="projectsItem.data.project_video"
            class="project__video"
          >
            <Video-youtube :linkVideo="projectsItem.data.project_video" />
          </div>
        </div>
        <div class="project__right">
          <div class="project__desc _desktop">
            <Description :projectsItem="projectsItem" />
          </div>
          <div class="project__contacts">
            <FormFeedback :title="contactsTitle" />
          </div>
        </div>
      </div>
      <div class="project__others">
        <h2 class="project__others-title">Похожие проекты</h2>
        <div class="project__others-wrap">
          <House
            v-for="(item) in projectsList?.data"
            :key="item.id"
            :data="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useProjectsStore } from '@/store/projects-store'

const { getProjectsItem, getProjectsList } = useProjectsStore()
const { projectsItem, projectsList } = storeToRefs(useProjectsStore())

await getProjectsItem(useRoute().params.id)
await getProjectsList(null, 4)

const contactsTitle = ref('Задать вопрос:');

const breadcrumbs = [
  {
    title: 'Проекты домов',
    disabled: false,
    href: '/projects',
  },
  {
    title: projectsItem?.value.data.title,
    disabled: true,
  },
]
</script>
<style
  scoped
  lang="scss"
>
.project {
  padding-bottom: 70px;

  &__row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 40px;

    @media (max-width: $laptop-m) {
      flex-direction: column;
    }
  }

  &__left {
    flex-grow: 1;
    margin-right: 20px;

    @media (max-width: $laptop-m) {
      margin-right: 0;
    }
  }

  &__right {
    width: 37%;
    min-width: 370px;
    flex-shrink: 0;

    @media (max-width: $laptop-m) {
      flex-direction: column;
      width: 100%;
      min-width: 100%;
    }
  }

  &__images {
    margin-bottom: 40px;
  }

  &__desc {
    margin-bottom: 40px;

    &._laptop {
      display: none;
    }

    @media (max-width: $laptop-m) {
      &._laptop {
        display: block;
      }

      &._desktop {
        display: none;
      }
    }
    
  }

  &__video {
    margin-bottom: 40px;
  }

  &__contacts {
    flex-shrink: 0;
    padding: 40px 30px 60px;
    border-radius: 6px;
    box-shadow: 0 25px 30px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.25);
  }

  &__text {
    margin-bottom: 30px;
  }

  &__text-body {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    padding: 40px 30px 40px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 15px rgba(0, 0, 0, 0.25);
  }

  &__text-title,
  &__others-title {
    margin-bottom: 10px;
  }

  &__others-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>