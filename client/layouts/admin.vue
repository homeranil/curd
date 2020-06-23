<template>
  <div id="app" class="font-primary flex flex-col lg:flex-row">
    <nav
      class="w-full lg:w-1/5 py-4 mx-auto max-w-2xl lg:mx-0 lg:min-w-xs lg:max-w-sm"
    >
      <div class="hidden lg:flex flex-col items-center py-8">
        <img
          src="https://www.gravatar.com/avatar/123456"
          alt="User's profile image"
          class="rounded-full w-24 h-24 mb-2"
        />
        <label class="text-xl text-gray-800">User Name</label>
      </div>
      <div class="flex lg:flex-col justify-between items-center px-4 lg:px-12">
        <nuxt-link
          :to="{ name: `admin-blog___${$i18n.locale}` }"
          class="text-lg lg:text-2xl lg:mb-4 hover:text-gray-900 hover:font-bold transition-sm text-gray-700"
        >
          {{ $t('nav.blog') }}
        </nuxt-link>
        <a
          class="text-lg lg:text-2xl lg:mb-4 hover:text-gray-900 hover:font-bold transition-sm text-gray-700"
        >
          {{ $t('nav.media') }}
        </a>
        <a
          class="text-lg lg:text-2xl lg:mb-4 hover:text-gray-900 hover:font-bold transition-sm text-gray-700"
        >
          {{ $t('nav.profile') }}
        </a>
        <a
          href="#"
          class="text-lg lg:text-2xl text-gray-700 lg:mb-4 hover:text-gray-900 hover:font-bold transition-sm"
        >
          {{ $t('nav.logout') }}
        </a>
        <nuxt-link
          v-if="$i18n.locale !== 'en'"
          :to="switchLocalePath('en')"
          class="lg:mt-32 text-lg lg:text-2xl lg:mb-4 hover:text-gray-900 hover:font-bold transition-sm text-gray-700"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/English_language.png"
            alt="English"
            class="w-8 lg:w-20"
          />
        </nuxt-link>

        <nuxt-link
          v-if="$i18n.locale !== 'he'"
          :to="switchLocalePath('he')"
          class="lg:mt-32 text-lg lg:text-2xl lg:mb-4 hover:text-gray-900 hover:font-bold transition-sm text-gray-700"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/234px-Flag_of_Israel.svg.png"
            alt="English"
            class="w-8 lg:w-20"
          />
        </nuxt-link>
      </div>
    </nav>
    <main class="bg-gray-100 min-h-screen w-full lg:w-4/5 lg:px-4 p-8">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
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

<style lang="sass" scoped>
.active-link
  @apply text-gray-900 font-bold
</style>
