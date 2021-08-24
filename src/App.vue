<template>
  <main class="w-screen h-screen px-16 bg-gray-100 dark:bg-gray-800 overflow-hidden">
    <router-view></router-view>
  </main>
</template>

<script setup>

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