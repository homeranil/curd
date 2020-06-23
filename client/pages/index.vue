<template>
  <div class="">
    <header class="container">
      <div class="mt-8 lg:mt-16">
        <h1 class="heading-1 text-center">
          {{ $t('index.first.title') }}
        </h1>
        <p class="heading-desc">
          {{ $t('index.first.desc') }}
        </p>
        <img
          src="~assets/images/avatar.png"
          alt=""
          class="h-64 mt-16 mx-auto"
        />
      </div>
    </header>
    <!-- Section On Me -->
    <section class="mt-32 lg:mt-56" data-aos="zoom-in">
      <img src="~assets/images/comp.svg" alt="" class="mx-auto" />
      <div class="bg-primary py-32">
        <div class="container text-center">
          <h1 class="heading-2 text-gray-800 font-normal font-header mb-8">
            {{ $t('index.welcome.title') }}
          </h1>
          <p class="heading-desc text-white mb-16">
            {{ $t('index.welcome.desc') }}
          </p>
        </div>
      </div>
      <div class="container bg-white -mt-32 shadow-lg">
        <div class="titels h-full">
          <div class="grid grid-flow-rows lg:grid-cols-3">
            <div v-for="x in 3" :key="x" class="col">
              <img src="https://mattfarley.ca/img/icons/designer.svg" alt="" />
              <h3>כותרת</h3>
              <p>
                הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש
                ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים
                תוק, הדש שנרא התידם הכייר וק.
              </p>
              <div>
                <h1>בלה דוקח מכחסוק:</h1>
                <p>UX, UI, Web, Mobile, Apps, Logos</p>
              </div>

              <div>
                <h1>דס איאקוליס וולופטה:</h1>
                <ul>
                  <li>abv</li>
                  <li>abv</li>
                  <li>abv</li>
                  <li>abv</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Projects -->
    <section class="container mt-32" data-aos="zoom-in-right">
      <h1 class="heading-2 text-gray-800 text-center">
        {{ $t('index.projects.title') }}
      </h1>
      <p class="heding-desc text-center">
        {{ $t('index.projects.desc') }}
        <a href="#" class="text-primary hover:text-primaryDark">
          {{ $t('index.projects.contact') }} </a
        >.
      </p>
      <div class="mt-10 grid grid-flow-rows lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project._id"
          class="flex relative justify-center m-4 rounded-lg"
        >
          <img
            :src="project.background"
            :alt="project.title"
            class="rounded-lg relative z-0"
          />
          <span class="project-data rounded-lg">
            <p>
              {{ project.description }}
            </p>
            <button class="btn">
              {{ $t('index.projects.more') }}
            </button>
          </span>
        </div>
      </div>
    </section>

    <!-- Section Blog -->
    <section class="mt-16 lg:mt-32" data-aos="zoom-in">
      <div class="bg-primary py-32">
        <div class="container text-center">
          <h1 class="heading-2 text-gray-800 font-normal font-header mb-8">
            {{ $t('index.blog.title') }}
          </h1>
          <p class="heading-desc text-white mb-16">
            {{ $t('index.blog.desc') }}
          </p>
        </div>
      </div>
      <div class="container -mt-48">
        <div class="mt-10 grid grid-flow-rows lg:grid-cols-3 gap-6">
          <div v-for="post in posts" :key="post.slug" class="blog-section">
            <h1>{{ post.title }}</h1>
            <p>
              {{ post.description }}
            </p>
            <div class="mt-10 mx-auto flex">
              <button class="btn px-4 text-sm">
                {{ $t('index.blog.button') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Footer -->
    <section class="w-full mt-32">
      <div class="flex relative justify-center">
        <div
          class="w-10/12 absolute bg-indigo-900 py-16 rounded-lg -mt-16 z-10 grid grid-flow-rows md:grid-cols-3 text-white text-center items-center shadow-2xl"
        >
          <div class="text-4xl">{{ $t('index.project.start') }}</div>
          <div class="text-lg font-light">
            {{ $t('index.project.desc') }}
          </div>
          <div class="">
            <button
              class="btn bg-transparent border-2 border-primaryDark hover:border-primaryLight shadow-lg hover:shadow-2xl rounded-full px-8 py-3 font-light focus:outline-none"
            >
              {{ $t('index.project.button') }}
            </button>
          </div>
        </div>
      </div>
      <div class="bg-primary pt-56 md:pt-48 lg:pt-32">
        <div class="container mt-10 text-white text-center">
          <p class="mt-6 text-xl font-light">
            Lorem ipsum dolor sit amet consectetur
          </p>
          <p class="mt-6 text-sm">Handcrafted by me © twentytwenty</p>
        </div>
        <div class="pb-6"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const response = await app.$axios.$get(`home?lang=${app.i18n.locale}`)
    return {
      projects: response.projects,
      posts: response.posts,
    }
  },
  data() {
    return {
      projects: [],
      posts: [],
    }
  },
  computed: {},
}
</script>

<style lang="sass" scoped>
.titels
  @apply flex items-start h-full
  .col
    @apply overflow-hidden border justify-center p-16 flex flex-col justify-center

    h3
      @apply mx-auto mt-4 text-2xl text-gray-900 leading-tight
    p
      @apply text-lg font-light text-center mt-4
    ul
      @apply mt-4
      li
        @apply text-lg font-light text-center
    div
      @apply mt-8
      h1
        @apply text-center mt-4 text-xl text-primaryDark leading-tight
      p
        @apply text-base leading-tight

.project-data
  @apply absolute bg-primaryDark inset-0 flex flex-col items-center justify-center opacity-0 transition duration-500 ease-in-out
  &:hover
    @apply opacity-100
  p
    @apply text-lg text-center px-12 text-white font-light
    @screen xl
      @apply text-2xl
  .btn
    @apply mt-4 bg-transparent border-2 border-primaryLight rounded-full text-white px-4 text-sm
    @screen xl
      @apply mt-8 px-8 text-base
    &:hover
      @apply bg-primaryLight text-primaryDark transition duration-200 ease-in-out

.blog-section
  @apply flex flex-col justify-between bg-white px-8 py-12 rounded-lg border shadow-lg
  h1
    @apply text-center text-2xl mb-4
  p
    @apply text-center font-light text-lg
</style>
