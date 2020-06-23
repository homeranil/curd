<template>
  <div class="">
    <nav class="flex items-center h-40 bg-primary">
      <div
        class="container flex flex-wrap items-center justify-center md:justify-between"
      >
        <div class="logo_container">
          <nuxt-link :to="localePath('index')">
            <h1>Ran<span>Tayar</span></h1>
          </nuxt-link>
        </div>
        <ul class="navigation">
          <li>
            <nuxt-link :to="localePath({ name: 'about' })">
              {{ $t('nav.about') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath({ name: 'projects' })">
              {{ $t('nav.projects') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath({ name: 'blog' })">
              {{ $t('nav.blog') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath({ name: 'contact' })">
              {{ $t('nav.contact') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              >{{ locale.name }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        dir: this.$t('settings.dir'),
      },
    }
  },
}
</script>
<style lang="sass">
nav
  .links
    a
      @apply text-lg text-white
      [dir="rtl"] &
        @apply ml-4
      [dir="ltr"] &
        @apply mr-4
      &:hover
        @apply text-gray-900 font-bold
      @screen lg
        @apply text-xl
        [dir="rtl"] &
          @apply ml-10
        [dir="ltr"] &
          @apply mr-10

.logo_container
  height: 100%
  [dir="ltr"] &
    float: left
  h1
    @apply text-white text-6xl font-light text-primaryLight
    span
      @apply font-bold

.navigation
  @apply flex float-left h-full items-center
  [dir="ltr"] &
    @applt float-right
  li
    @apply px-3
    @screen lg
      @apply px-4
    a
      @apply font-light text-white
      @screen lg
        @apply text-xl
      &:hover
        @apply text-primaryDark
</style>
