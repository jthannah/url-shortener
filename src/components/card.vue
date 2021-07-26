<template>
  <div class="relative flex items-center justify-between w-full px-6 py-10">
    <button
      class="top-2 right-2 hover:text-white hover:bg-red-600 absolute p-1 text-red-600 transition-colors rounded-md"
      @click="$emit('delete', shortUrl.key)"
    >
      <TrashIcon class="w-5 h-5" />
      <span class="sr-only">Delete</span>
    </button>
    <div class="flex-1 space-y-3 truncate">
      <div class="flex items-center space-x-3">
        <LinkIcon class="text-orange-default w-5 h-5" />
        <a
          class="hover:text-blue-900 ml-5 text-lg font-medium text-gray-900 text-blue-700 truncate transition-colors"
          :href="shortUrl.url"
          target="_blank"
        >
          {{ shortUrl.url }}
        </a>
      </div>
      <p class="mt-1 text-sm text-gray-500 truncate" :title="shortUrl.original">Original: {{ shortUrl.original }}</p>
    </div>
    <span class="bottom-2 right-2 absolute text-xs text-gray-500">created: {{ formattedDate }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LinkIcon, TrashIcon } from '@heroicons/vue/outline'
import { ShortUrl } from '../api/short-url'

export default defineComponent({
  components: {
    LinkIcon,
    TrashIcon,
  },
  props: {
    shortUrl: {
      required: true,
      type: Object as PropType<ShortUrl>,
    },
  },
  emits: ['delete'],
  setup(props) {
    const createdDate = new Date((props.shortUrl as ShortUrl).created)
    const formattedDate = `${createdDate.toLocaleDateString('en-US')} (${createdDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })})`

    return {
      formattedDate,
    }
  },
})
</script>
