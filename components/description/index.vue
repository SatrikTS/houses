<template>
  <div class="description">
    <div
      v-if="projectsItem.data.total_area"
      class="description__item"
    >
      <div class="description__title">площадь</div>
      <div class="description__text">{{ projectsItem?.data.total_area }} м
        <sup>2</sup>
      </div>
    </div>
    <div
      v-if="projectsItem.data.level_type.title"
      class="description__item"
    >
      <div class="description__title">этажность</div>
      <div class="description__text">{{ projectsItem?.data.level_type.title }}</div>
    </div>
    <div
      v-if="projectsItem.data.room_count.title"
      class="description__item"
    >
      <div class="description__title">количество комнат</div>
      <div class="description__text">{{ projectsItem?.data.room_count.title }}</div>
    </div>
    <div
      v-if="projectsItem.data.additional_buildings"
      class="description__item"
    >
      <div class="description__title">дополнительно</div>
      <div class="description__text">{{ projectsItem?.data.additional_buildings }}</div>
    </div>
    <hr>
    <div
      v-if="projectsItem.data.roof_type.title"
      class="description__item"
    >
      <div class="description__title">тип крыши</div>
      <div class="description__text">{{ projectsItem?.data.roof_type.title }}</div>
    </div>
    <div
      v-if="projectsItem.data.roof_material.title"
      class="description__item"
    >
      <div class="description__title">материал крыши</div>
      <div class="description__text">{{ projectsItem?.data.roof_material.title }}</div>
    </div>
    <div
      v-if="projectsItem.data.wall_material.title"
      class="description__item"
    >
      <div class="description__title">материал стены</div>
      <div class="description__text">{{ projectsItem?.data.wall_material.title }}</div>
    </div>
    <div
      v-if="projectsItem.data.foundation_type.title"
      class="description__item"
    >
      <div class="description__title">тип фундамента</div>
      <div class="description__text">{{ projectsItem?.data.foundation_type.title }}</div>
    </div>
    <div
      v-if="projectsItem.data.heating_type.title"
      class="description__item"
    >
      <div class="description__title">тип отопления</div>
      <div class="description__text">{{ projectsItem?.data.heating_type.title }}</div>
    </div>
    <div
      v-if="projectsItem.data.completion_stage.title"
      class="description__item"
    >
      <div class="description__title">}{3 - completion_stage</div>
      <div class="description__text">{{ projectsItem?.data.completion_stage.title }}</div>
    </div>
    <hr>
    <div
      v-if="projectsItem.data.price_per_project"
      class="description__item"
    >
      <div class="description__title">стоимость проекта</div>
      <div class="description__text">{{ projectsItem?.data.price_per_project }} ₽</div>
    </div>
    <div
      v-if="projectsItem.data.price_turnkey"
      class="description__item"
    >
      <div class="description__title">стоимость под ключ</div>
      <div class="description__text">{{ projectsItem?.data.price_turnkey }} ₽</div>
    </div>
    <div
      v-if="projectsItem.data.project_period"
      class="description__item"
    >
      <div class="description__title">срок проектирования</div>
      <div class="description__text">от {{ projectsItem?.data.project_period }} мес.</div>
    </div>
    <div
      v-if="projectsItem.data.construction_period"
      class="description__item"
    >
      <div class="description__title">срок строительства</div>
      <div class="description__text">от {{ projectsItem?.data.construction_period }} мес.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  projectsItem: [];
}

defineProps<Props>();
</script>

<style scoped lang="scss">
hr {
  margin: 15px 0 35px;
}

.description {
  padding: 40px 25px 60px;
  background: rgb(0 0 0 / 70%);
  color: $bg-main;
  border-radius: 6px;
  margin-bottom: 40px;
  box-shadow: 0 25px 30px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.25);

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__title {
    width: 45%;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
  }

  &__text {
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
}
</style>
