<template>
  <section class="w-full h-full bg-gray-100 dark:bg-gray-800">
    <div id="form-cont"
      class=" form absolute invisible flex flex-wrap gap-2 top-16 left-16 w-96 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md z-20"
      :class="{formShow: formActive}"
    >
      <div class="input-cont flex items-center w-full gap-2">
        <label for="title" class="font-header font-semibold">Title</label>
        <input
          type="text"
          id="title"
          class="p-1 pl-2 w-full bg-gray-200 dark:bg-gray-600 text-white rounded-md"
          v-model="articleData.title"
        />
      </div>
      <div class="input-cont flex items-center w-full gap-2">
        <label for="description" class="font-header font-semibold"
          >Description</label
        >
        <input
          type="text"
          id="description"
          class="p-1 pl-2 w-full bg-gray-200 dark:bg-gray-600 text-white rounded-md"
          v-model="articleData.description"
        />
      </div>
      <div class="input-cont flex items-center w-full gap-2">
        <label for="updatedAt" class="font-header font-semibold"
          >updatedAt</label
        >
        <input
          type="text"
          id="updatedAt"
          class="p-1 pl-2 w-full bg-gray-200 dark:bg-gray-600 text-white rounded-md"
          v-model="articleData.updatedAt"
        />
      </div>
    </div>
    <div id="content" class="wrapper relative h-full w-full grid grid-cols-5">
      <header class="h-full w-full col-span-3 flex items-center justify-start">
        <div class="hero-header">
          <h1 id="title-text"
            class="
              font-black font-header
              text-left text-7xl
              dark:text-gray-100
              cursor-pointer
            "
            @click="toggleDisplayReset()"
          >
            {{ articleData.title }}
          </h1>
          <p id="description-text" class="dark:text-gray-200">
            {{ articleData.description }}
          </p>
        </div>
      </header>
      <div class="logo-cont col-span-2">
        <logo class="giant-logo" />
      </div>
      <footer class="absolute bottom-16 left-0 dark:text-gray-100 text-lg">
        <span id="author-text" class="mr-4">{{ articleData.author }}</span>
        <span>{{ formatDate(articleData.updatedAt) }}</span>
      </footer>
    </div>
  </section>
</template>

<script>
import Logo from "./Logo.vue";
import { ref } from "vue";

export default {
  name: "coverView",
  components: { Logo },
  setup() {
    const articleData = ref({
      title: "This is an article title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, sapiente",
      author: "Miracleio",
      updatedAt: "2021-08-20T14:34:42.000Z"
    });

    const formActive = ref(false);

    const toggleDisplayReset = () => {
        formActive.value = !formActive.value

        if (formActive.value){
            articleData.value.title = ""
            articleData.value.description = ""
            articleData.value.updatedAt = ""
        }
        // articleData.value.title = ""
    }

    const formatDate = (date) => {
      // format the date to be displayed in a readable format
      return new Date(date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    return { articleData, formActive, toggleDisplayReset, formatDate };
  },
};
</script>

<style scoped>
.giant-logo:deep() svg {
  @apply w-134 h-134 transform origin-top -rotate-12 filter drop-shadow-2xl;
}
.formShow{
    visibility: visible!important;
}
</style>