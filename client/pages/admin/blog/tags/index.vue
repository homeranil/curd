<template>
  <div>
    <TopNav />
    <section class="admin-card">
      <h2>{{ $t('tags.index.title') }}</h2>

      <div class="admin-grid admin-grid-3 mt-8">
        <h4>{{ $t('tags.title') }}</h4>
        <h4>{{ $t('tags.status') }}</h4>
        <h4 class="ltr:text-right rtl:text-left">&nbsp;</h4>
        <template v-for="tag in tags">
          <p :key="tag._id" class="rtl:ml-8 ltr:mr-8">{{ tag.title }}</p>
          <p :key="tag._id">
            {{ tag.status ? $t('status.active') : $t('status.inactive') }}
          </p>
          <p :key="tag._id" class="ltr:text-right rtl:text-left">
            <nuxt-link
              :to="{
                name: `admin-blog-tags-id-edit___${$i18n.locale}`,
                params: { id: tag._id },
              }"
              class="admin-link"
            >
              {{ $t('site.edit') }}
            </nuxt-link>
          </p>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import TopNav from '@/components/admin/blog/topNav'
export default {
  components: {
    TopNav,
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('tags')

    return {
      tags: response,
    }
  },
  data() {
    return {
      tags: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
