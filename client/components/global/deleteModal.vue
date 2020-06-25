<template>
  <div
    v-if="view"
    class="absolute inset-0 flex items-center justify-center h-screen"
  >
    <!-- Opacity Backgound clickable -->
    <span
      class="bg-black bg-opacity-25 absolute h-screen w-full z-0 cursor-pointer"
      @click="view = false"
    />

    <!-- Content -->
    <div
      class="z-10 bg-white flex flex-col font-bold rounded-lg border shadow-lg p-5 m-4 md:p-10"
    >
      <p class="text-xl">{{ $t('site.deleteModal.areYouSure') }}</p>
      <p class="text-center">{{ title }}</p>
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
          @click="view = false"
        >
          {{ $t('site.deleteModal.no') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    view: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    Remove() {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="scss" scoped></style>
