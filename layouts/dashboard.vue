<script setup>

import { ref } from 'vue'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'i-heroicons-home', current: true },
  { name: 'Applications', href: '/dashboard/applications', icon: 'i-heroicons-users', current: false },
  { name: 'Resume', href: '/dashboard/resume', icon: 'i-heroicons-document-duplicate', current: false },
  { name: 'Home', href: '/', icon: 'i-heroicons-home', current: false },
]


const sidebarOpen = ref(false)
</script>


<template>
  <div>
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border px-6">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg" alt="Your Company" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a :href="item.href"
                    :class="[item.current ? 'bg-neutral-50' : 'hover:bg-neutral-50', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold']">
                    <Icon :name="item.icon" :class="[item.current ? '' : 'group-hover:opacity-75', 'size-6 shrink-0']"
                      aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <UserButton />
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Icon name="i-heroicons-bars-3" class="size-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm/6 font-semibold">Dashboard</div>
      <UserButton />
    </div>

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <!-- Your content -->
        <slot />
      </div>
    </main>
  </div>
</template>
