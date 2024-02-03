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
            <div class="project__video-wrap">
              <iframe
                width="100%"
                height="100%"
                title="RAM Effect Vehicle"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                :src="'https://www.youtube.com/embed/' + idVideo"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="project__right">
          <div class="project__desc">
            <div
              v-if="projectsItem.data.total_area"
              class="project__desc-item"
            >
              <div class="project__desc-title">площадь</div>
              <div class="project__desc-text">{{ projectsItem?.data.total_area }} м
                <sup>2</sup>
              </div>
            </div>
            <div
              v-if="projectsItem.data.level_type.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">этажность</div>
              <div class="project__desc-text">{{ projectsItem?.data.level_type.title }}</div>
            </div>
            <div
              v-if="projectsItem.data.room_count.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">количество комнат</div>
              <div class="project__desc-text">{{ projectsItem?.data.room_count.title }}</div>
            </div>
            <div
              v-if="projectsItem.data.additional_buildings"
              class="project__desc-item"
            >
              <div class="project__desc-title">дополнительно</div>
              <div class="project__desc-text">{{ projectsItem?.data.additional_buildings }}</div>
            </div>
            <hr>
            <div
              v-if="projectsItem.data.roof_type.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">тип крыши</div>
              <div class="project__desc-text">{{ projectsItem?.data.roof_type.title }}</div>
            </div>
            <div
              v-if="projectsItem.data.roof_material.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">материал крыши</div>
              <div class="project__desc-text">{{ projectsItem?.data.roof_material.title }}</div>
            </div>
            <div
              v-if="projectsItem.data.wall_material.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">материал стены</div>
              <div class="project__desc-text">{{ projectsItem?.data.wall_material.title }}</div>
            </div>
            <div
              v-if="projectsItem.data.foundation_type.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">тип фундамента</div>
              <div class="project__desc-text">{{ projectsItem?.data.foundation_type.title }}</div>
            </div>
            <div
              v-if="projectsItem.data.heating_type.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">тип отопления</div>
              <div class="project__desc-text">{{ projectsItem?.data.heating_type.title }}</div>
            </div>
            <div
              v-if="projectsItem.data.completion_stage.title"
              class="project__desc-item"
            >
              <div class="project__desc-title">}{3 - completion_stage</div>
              <div class="project__desc-text">{{ projectsItem?.data.completion_stage.title }}</div>
            </div>
            <hr>
            <div
              v-if="projectsItem.data.price_per_project"
              class="project__desc-item"
            >
              <div class="project__desc-title">стоимость проекта</div>
              <div class="project__desc-text">{{ projectsItem?.data.price_per_project }} ₽</div>
            </div>
            <div
              v-if="projectsItem.data.price_turnkey"
              class="project__desc-item"
            >
              <div class="project__desc-title">стоимость под ключ</div>
              <div class="project__desc-text">{{ projectsItem?.data.price_turnkey }} ₽</div>
            </div>
            <div
              v-if="projectsItem.data.project_period"
              class="project__desc-item"
            >
              <div class="project__desc-title">срок проектирования</div>
              <div class="project__desc-text">от {{ projectsItem?.data.project_period }} мес.</div>
            </div>
            <div
              v-if="projectsItem.data.construction_period"
              class="project__desc-item"
            >
              <div class="project__desc-title">срок строительства</div>
              <div class="project__desc-text">от {{ projectsItem?.data.construction_period }} мес.</div>
            </div>
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
const getIdVideo = (link) => {
  const idVidoRegex = /(?:\?v=|\/embed\/|\/\d\/|\/v\/|https:\/\/youtu.be\/|\/embed\/|\/\d\/|\/v\/|https:\/\/www.youtube.com\/watch?v=)([a-zA-Z0-9_-]{11})/;
  const match = link.match(idVidoRegex);
  return match ? match[1] : "";
};
const idVideo = ref(getIdVideo(projectsItem?.value.data.project_video));

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
hr {
  margin: 15px 0 35px;
}

.project {
  padding-bottom: 70px;

  &__row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 40px;
  }

  &__left {
    flex-grow: 1;
    margin-right: 20px;
  }

  &__right {
    width: 37%;
    flex-shrink: 0;
  }

  &__images {
    margin-bottom: 40px;
  }

  &__desc {
    padding: 40px 25px 60px;
    background: rgb(0 0 0 / 70%);
    color: $bg-main;
    border-radius: 6px;
    margin-bottom: 40px;
    box-shadow: 0 25px 30px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.25);
  }

  &__desc-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__desc-title {
    width: 45%;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
  }

  &__desc-text {
    width: 50%;
    text-align: start;
    font-size: 14px;
    line-height: 1.5;

    sup {
      top: -0.5em;
      position: relative;
      font-size: 0.75em;
      line-height: 0;
      vertical-align: baseline;
    }
  }

  &__video {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 40px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 15px rgba(0, 0, 0, 0.25);
  }

  &__video-wrap {
    width: 100%;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      width: 100%;
      height: 101%;
    }
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