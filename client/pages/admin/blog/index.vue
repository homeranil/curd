<template>
  <div>
    <TopNav />
    <section class="admin-card">
      <h2>{{ $t('blog.index.title') }}</h2>
      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead>
            <tr class="ltr:text-left rtl:text-right">
              <th>{{ $t('blog.title') }}</th>
              <th>{{ $t('blog.status') }}</th>
              <th>{{ $t('blog.published_on') }}</th>
              <th>{{ $t('lang.lang') }}</th>
              <th class="ltr:text-right rtl:text-left">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post._id">
              <td>
                {{ post.title }}
              </td>
              <td>
                {{ post.status ? $t('status.active') : $t('status.inactive') }}
              </td>
              <td class="text-base">
                {{ post.createdAt | moment }}
              </td>
              <td>
                {{ $t('lang.' + post.lang) }}
              </td>
              <td class="ltr:text-right rtl:text-left">
                <a href="#" class="admin-link ltr:mr-2 rtl:ml-2">
                  {{ $t('site.view') }}
                </a>
                <nuxt-link
                  :to="{
                    name: `admin-blog-id-edit___${$i18n.locale}`,
                    params: { id: post._id },
                  }"
                  class="admin-link"
                >
                  {{ $t('site.edit') }}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import TopNav from '@/components/admin/blog/topNav'
export default {
  components: {
    TopNav,
  },
  filters: {
    moment(date) {
      return moment(date).format('L')
    },
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('posts')
    return {
      posts: response,
    }
  },
  data() {
    return {
      posts: [],
    }
  },
}
</script>
