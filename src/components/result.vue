<template>
  <div class="py-6">
    <h2 v-if="!newShortUrl" class="text-orange-dark py-2 text-xl">
      This url was already shortened! We went ahead and found it for you. <EmojiHappyIcon class="inline w-5 h-5" />
    </h2>
    <h3>
      Here is your short url:
      <a class="hover:text-blue-900 ml-5 text-blue-700 transition-colors" :href="result.url" target="_blank">
        {{ result.url }}
      </a>
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { EmojiHappyIcon } from '@heroicons/vue/outline'
import { ShortUrl } from '@/api/short-url'

export default defineComponent({
  name: 'Result',
  components: { EmojiHappyIcon },
  props: {
    result: {
      required: true,
      type: Object as PropType<ShortUrl>,
    },
    newShortUrl: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
