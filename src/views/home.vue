<template>
  <div>
    <ShortenUrlForm class="p-5" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShortenUrlForm from '../components/shorten-url-form.vue'

export default defineComponent({
  name: 'Home',
  components: { ShortenUrlForm },
  setup() {},
})
</script>
