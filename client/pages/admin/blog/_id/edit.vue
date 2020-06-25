<template>
  <section class="admin-card">
    <!-- Delete Confirm Modal -->
    <div
      v-if="deleteModal"
      class="absolute inset-0 flex items-center justify-center h-screen"
    >
      <div
        class="bg-black bg-opacity-25 absolute h-screen w-full z-0 cursor-pointer"
        @click="deleteModal = false"
      />
      <div
        class="z-10 bg-white flex flex-col font-bold rounded-lg border shadow-lg p-5 m-4 md:p-10"
      >
        <p class="text-xl">{{ $t('site.deleteModal.areYouSure') }}</p>
        <p class="text-center">"{{ post.title }}"</p>
        <div
          class="mt-10 -mb-4 flex items-center justify-between flex-row-reverse"
        >
          <button
            class="text-lg bg-red-600 hover:bg-red-800 transition-sm text-white rounded px-3 py-2 shadow-lg"
            @click="Remove"
          >
            {{ $t('site.deleteModal.yes') }}
          </button>
          <button
            class="text-lg bg-blue-600 hover:bg-blue-800 transition-sm text-white rounded px-3 py-2 shadow-lg"
            @click="deleteModal = false"
          >
            {{ $t('site.deleteModal.no') }}
          </button>
        </div>
      </div>
    </div>
    <!--Statrt Edit Card -->
    <div class="flex justify-between items-center">
      <h2>{{ $t('blog.edit.title') }}</h2>
      <div>
        <button
          class="text-xl bg-red-600 hover:bg-red-800 transition-sm text-white rounded px-3 py-2 shadow-lg"
          @click="deleteModal = true"
        >
          {{ $t('site.delete') }}
        </button>
      </div>
    </div>
    <div>
      <form action="#" @submit.prevent="update">
        <div class="admin-form-input">
          <label for="lang" class="">{{ $t('lang.lang') }}</label>
          <radioSelect
            v-model="post.lang"
            :options="[
              { value: 'he', name: 'lang.he' },
              { value: 'en', name: 'lang.en' },
            ]"
          />
        </div>

        <div class="admin-form-input">
          <label for="title" class="">{{ $t('blog.title') }}</label>
          <input id="title" v-model="post.title" type="text" name="title" />
        </div>

        <div class="admin-form-input">
          <label for="status" class="">{{ $t('blog.status') }}</label>
          <radioSelect
            v-model="post.status"
            :options="[
              { value: true, name: 'status.active' },
              { value: false, name: 'status.inactive' },
            ]"
          />
        </div>

        <div class="admin-form-input">
          <label for="header_image" class="">{{
            $t('blog.header_image')
          }}</label>
          <input
            id="header_image"
            v-model="post.background"
            type="text"
            name="header_image"
          />
        </div>

        <div class="admin-form-input">
          <label for="description" class="">{{ $t('blog.description') }}</label>
          <input
            id="description"
            v-model="post.description"
            type="text"
            name="description"
          />
        </div>

        <div class="admin-form-input">
          <label for="content" class="">{{ $t('blog.content') }}</label>
          <textarea
            id="content"
            v-model="post.content"
            name="content"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="admin-form-input mb-8">
          <label for="tags">{{ $t('blog.tags') }}</label>
          <multiselect
            v-model="post.tags"
            :options="tags"
            :placeholder="$t('site.multiselect.placeholder')"
            :select-label="$t('site.multiselect.selectLabel')"
            :selected-label="$t('site.multiselect.selectedLabel')"
            :deselect-label="$t('site.multiselect.deselectLabel')"
            open-direction="top"
            label="title"
            track-by="_id"
            :multiple="true"
            :clear-on-select="true"
          >
            <template slot="noResult">
              {{ $t('site.multiselect.noResult') }}
            </template>
          </multiselect>
        </div>

        <div class="flex justify-between items-center flex-row-reverse">
          <button
            type="submit"
            class="text-xl bg-blue-600 hover:bg-blue-800 transition-sm text-white rounded px-3 py-2 shadow-lg"
          >
            {{ $t('site.save') }}
          </button>
          <a
            href="#"
            class="admin-link text-xl text-red-600 hover:text-red-800"
            >{{ $t('site.cancel') }}</a
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import radioSelect from '@/components/global/radioSelect'

export default {
  components: { Multiselect, radioSelect },

  async asyncData({ app, params }) {
    const post = await app.$axios.$get(`posts/${params.id}`)
    const tags = await app.$axios.$get(`tags`)
    return {
      post,
      tags,
    }
  },
  data() {
    return {
      deleteModal: false,
      post: [],
      tags: [],
    }
  },
  methods: {
    async Remove() {
      try {
        await this.$axios.$delete(`posts/${this.post._id}`)
        this.$router.push({
          name: `admin-blog___${this.$i18n.locale}`,
        })
      } catch (e) {}
    },
    async update() {
      try {
        const response = await this.$axios.$patch(
          `posts/${this.post._id}`,
          this.post
        )
        this.$router.push({
          params: {
            id: response.data._id,
          },
        })
        this.post = response
      } catch (e) {
        //
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
