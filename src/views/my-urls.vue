<template>
  <div class="p-5">
    <ul v-if="shortUrls.length" class="sm:grid-cols-2 grid grid-cols-1 gap-6">
      <li
        v-for="shortUrl in shortUrls"
        :key="shortUrls.url"
        class="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow"
      >
        <Card :shortUrl="shortUrl" @delete="deleteShortenedUrl" />
      </li>
    </ul>
    <div v-else class="flex flex-col items-center space-y-5">
      <p>You haven't shortened any URL's yet! to get started click the button below!</p>
      <router-link
        :to="{ name: 'Home' }"
        class="bg-orange-default hover:bg-orange-dark px-5 py-3 text-white transition-colors rounded-md"
      >
        Start Shortening!
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ShortUrl from '@/api/short-url'
import Card from '@/components/card.vue'

export default defineComponent({
  name: 'MyUrls',
  components: { Card },
  setup() {
    const shortUrls = ref<ShortUrl[]>([])

    ShortUrl.getAllShortUrls().then((response: ShortUrl[]) => {
      shortUrls.value = response
    })

    const deleteShortenedUrl = (shortUrlKey: string) => {
      ShortUrl.deleteShortUrl(shortUrlKey).then((response: ShortUrl[]) => {
        shortUrls.value = response
      })
    }

    return {
      shortUrls,
      deleteShortenedUrl
    }
  },
})
</script>
