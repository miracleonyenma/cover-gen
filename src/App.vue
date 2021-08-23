<template>
  <main class="w-screen h-screen px-16 bg-gray-100 overflow-hidden">
    <section class="w-full h-full bg-gray-100 dark:bg-gray-800">
      <div class="wrapper relative h-full w-full grid grid-cols-5">
        <header class="h-full w-full col-span-3 flex items-center justify-center">
          <div class="hero-header">
            <h1 class="font-black font-header text-left text-7xl dark:text-gray-100">
              This is an article title
            </h1>
            <p class="dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              sapiente.
            </p>
          </div>
        </header>
        <div class="logo-cont col-span-2">
          <logo class="giant-logo" />
        </div>
        <footer class="absolute bottom-16 left-0 dark:text-gray-100 text-lg">
          <span class="mr-4">Miracleio</span>
          <span>August 23, 2021</span>
        </footer>
      </div>
    </section>
  </main>
</template>

<script setup>
  import Logo from './components/Logo.vue'

  // This starter template is using Vue 3 experimental <script setup> SFCs
  // Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md

  import {
    defineProps,
    reactive
  } from 'vue'

  defineProps({
    msg: String
  })

  const state = reactive({
    count: 0
  })
</script>

<style scoped>
/* .giant-logo >>> svg {
  @apply w-134 h-134 transform origin-top -rotate-12 filter drop-shadow-2xl;
} */

.giant-logo:deep() svg{
  @apply w-134 h-134 transform origin-top -rotate-12 filter drop-shadow-2xl;
}

</style>