<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="max-w-7xl sm:px-6 lg:px-8 px-2 mx-auto">
      <div class="relative flex justify-between h-16">
        <div class="sm:hidden absolute inset-y-0 left-0 flex items-center">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="
              hover:text-gray-500 hover:bg-gray-100
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
              inline-flex
              items-center
              justify-center
              p-2
              text-gray-400
              rounded-md
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
            <XIcon v-else class="block w-6 h-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="sm:items-stretch sm:justify-start flex items-center justify-center flex-1">
          <div class="flex items-center flex-shrink-0">
            <span class="text-orange-default text-xl font-bold">{ } URL SHORTENER</span>
          </div>
          <div class="sm:ml-10 sm:flex sm:space-x-8 hidden">
            <router-link
              :to="{ name: 'Home' }"
              class="
                hover:border-gray-300 hover:text-gray-700
                inline-flex
                items-center
                px-1
                pt-1
                text-sm
                font-medium
                text-gray-500
                border-b-2 border-transparent
              "
              :class="isHome ? 'border-orange-default text-gray-900 font-medium' : ''"
            >
              Home
            </router-link>
            <router-link
              :to="{ name: 'MyUrls' }"
              class="
                hover:border-gray-300 hover:text-gray-700
                inline-flex
                items-center
                px-1
                pt-1
                text-sm
                font-medium
                text-gray-500
                border-b-2 border-transparent
              "
              :class="isMyUrls ? 'border-orange-default text-gray-900 font-medium' : ''"
            >
              My Urls
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-4 space-y-1">
        <router-link
          :to="{ name: 'Home' }"
          class="
            hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700
            block
            py-2
            pl-3
            pr-4
            text-base
            font-medium
            text-gray-500
            border-l-4 border-transparent
          "
          :class="isHome ? 'bg-orange-default bg-opacity-20 text-orange-default border-orange-default' : ''"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'MyUrls' }"
          class="
            hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700
            block
            py-2
            pl-3
            pr-4
            text-base
            font-medium
            text-gray-500
            border-l-4 border-transparent
          "
          :class="isMyUrls ? 'bg-orange-default bg-opacity-20 text-orange-default border-orange-default' : ''"
        >
          My Urls
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { computed, ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { useRoute } from 'vue-router'

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)
    const route = useRoute()

    const isHome = computed(() => {
      return route.name === 'Home'
    })

    const isMyUrls = computed(() => {
      return route.name === 'MyUrls'
    })

    return { isHome, isMyUrls, open }
  },
}
</script>
