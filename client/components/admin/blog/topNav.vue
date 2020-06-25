<template>
  <nav class="mb-12">
    <nuxt-link :to="{ name: `admin-blog___${$i18n.locale}` }">
      {{ $t('nav.posts') }}
    </nuxt-link>
    <nuxt-link :to="{ name: `admin-blog-tags___${$i18n.locale}` }" class="mx-4">
      {{ $t('nav.tags') }}
    </nuxt-link>
    <nuxt-link to="/asad">
      {{ $t('nav.images') }}
    </nuxt-link>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
nav
  a
    @apply text-2xl font-bold text-gray-700 font-light pb-2 border-b-2 border-transparent transition
    &:hover
      @apply text-blue-700 font-normal
    &.exact-active-link
      @apply font-bold text-blue-600 border-blue-600
</style>
