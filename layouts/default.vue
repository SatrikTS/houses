<template>
  <div>
    <Header />
    <Menu class="menu"/>
    <main>
      <div class="container">
        main
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
export default {
  name: 'default',
}
</script>
<style scoped lang="scss">
.menu {
  background: $danger;
}
</style>