<template>
  <div class="p-5 text-center">
    <span v-if="lookingForKeyMatch">Hang on! We'll redirect you momentarily!</span>
    <div v-else class="flex flex-col items-center space-y-5">
      <EmojiSadIcon class="text-orange-default w-12 h-12" />
      <p>Sorry! We didn't find an entry matching this short url.</p>
      <router-link
        :to="{ name: 'Home' }"
        class="bg-orange-default hover:bg-orange-dark px-5 py-3 text-white transition-colors rounded-md"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import ShortUrlApi, { ShortUrl } from '../api/short-url'
import Card from '@/components/card.vue'
import { EmojiSadIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'MyUrls',
  components: { Card, EmojiSadIcon },
  props: {
    userId: {
      required: true,
      type: Number,
    },
    shortUrl: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const lookingForKeyMatch = ref(true)

    ShortUrlApi.getLongUrl(props.shortUrl)
      .then((response: ShortUrl) => {
        window.location.href = response.original
      })
      .catch(() => {lookingForKeyMatch.value = false})

    return { lookingForKeyMatch }
  },
})
</script>
