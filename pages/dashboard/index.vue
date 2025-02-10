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
            <li>
              <div class="text-xs/6 font-semibold opacity-75">Your teams</div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li v-for="team in teams" :key="team.name">
                  <a :href="team.href"
                    :class="[team.current ? 'bg-neutral-50' : 'hover:bg-neutral-50', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold']">
                    <span
                      :class="[team.current ? '' : 'group-hover:opacity-75', 'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium']">
                      {{ team.initial }}</span>
                    <span class="truncate">{{ team.name }}</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold hover:bg-neutral-50">
                <img class="size-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" />
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
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
      <a href="#">
        <span class="sr-only">Your profile</span>
        <img class="size-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="" />
      </a>
    </div>

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <!-- Your content -->
        <h1>Dashboard content</h1>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'



const navigation = [
  { name: 'Dashboard', href: '#', icon: 'i-heroicons-home', current: true },
  { name: 'Team', href: '#', icon: 'i-heroicons-users', current: false },
  { name: 'Projects', href: '#', icon: 'i-heroicons-folder', current: false },
  { name: 'Calendar', href: '#', icon: 'i-heroicons-calendar', current: false },
  { name: 'Documents', href: '#', icon: 'i-heroicons-document-duplicate', current: false },
  { name: 'Reports', href: '#', icon: 'i-heroicons-chart-pie', current: false },
]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

const sidebarOpen = ref(false)
</script>