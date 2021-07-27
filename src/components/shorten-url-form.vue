<template>
  <h1 class="text-lg" id="form-heading">Enter url to shorten!</h1>
  <form class="flex flex-wrap py-5 space-x-8" @submit.prevent="handleFormSubmit">
    <input
      type="url"
      name="url"
      aria-labelledby="form-heading"
      v-model="longUrl"
      required
      class="
        rounded-r-md
        focus:ring-orange-light focus:border-orange-default
        sm:text-sm
        flex
        block
        w-full
        max-w-md
        min-w-0
        px-3
        py-2
        mt-1
        border-gray-300
        rounded-none rounded-md
        shadow-sm
        outline-none
      "
      placeholder="www.example.com"
    />

    <button
      type="submit"
      class="
        hover:bg-orange-dark
        focus:outline-none focus:ring focus:ring-orange-light
        sm:ml-3 sm:w-auto sm:text-sm
        bg-orange-default
        inline-flex
        items-center
        justify-center
        w-full
        h-10
        px-4
        py-2
        mt-1
        text-base
        font-medium
        text-white
        transition-colors
        border border-transparent
        rounded-md
        shadow-sm
      "
    >
      Shorten URL!
    </button>
  </form>
  <transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <Result v-if="shortenedUrlResult" :result="shortenedUrlResult" :newShortUrl="newShortUrl" />
  </transition>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue'
import Result from '@/components/result.vue'
import ShortUrlApi, { ShortUrl } from '../api/short-url'

export default defineComponent({
  name: 'ShortenUrlForm',
  components: { Result },
  setup() {
    const longUrl = ref('')
    const shortenedUrlResult: Ref<ShortUrl | undefined> = ref(undefined)
    const newShortUrl = ref(false)

    const handleFormSubmit = async () => {
      // reset on every form submit
      newShortUrl.value = false

      // check if url has already been shortened
      const alreadyShortened = await ShortUrlApi.getShortUrl(longUrl.value)

      if (alreadyShortened) {
        // show an error/message with already shortened information
        shortenedUrlResult.value = alreadyShortened
      } else {
        await ShortUrlApi.saveShortUrl(longUrl.value).then((response: ShortUrl) => {
          shortenedUrlResult.value = response
          newShortUrl.value = true
        })
      }
    }

    return {
      longUrl,
      handleFormSubmit,
      shortenedUrlResult,
      newShortUrl,
    }
  },
})
</script>
