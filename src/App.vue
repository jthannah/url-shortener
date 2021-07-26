<template>
  <div class="h-full min-h-screen z-1 relative bg-pattern">
    <AppNav />
    <main class="max-w-6xl pb-10 mt-5 m-auto text-center">
      <div class="p-10 text-left bg-white rounded-md shadow-lg bg-opacity-80">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppNav from './components/app-nav.vue'

export default defineComponent({
  name: 'App',
  components: { AppNav },
})
</script>
