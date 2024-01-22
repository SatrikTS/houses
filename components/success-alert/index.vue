<template>
  <v-alert
    v-if="successMessage"
    class="alert"
    color="success"
    icon="$success"
  >{{ successMessage }}
  </v-alert>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  successMessage: string;
}

defineProps<Props>();
</script>
<style scoped>
</style>