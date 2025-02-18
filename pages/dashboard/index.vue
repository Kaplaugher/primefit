<script setup>
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div>
    <div class="md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h2>
      </div>
    </div>

    <div class="mt-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Summary cards can go here -->
        <div class="rounded-lg border bg-white p-6 shadow">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Active Applications</h3>
          <p class="mt-2 text-2xl font-bold tracking-tight text-gray-900">12</p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Interviews Scheduled</h3>
          <p class="mt-2 text-2xl font-bold tracking-tight text-gray-900">3</p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Resume Views</h3>
          <p class="mt-2 text-2xl font-bold tracking-tight text-gray-900">284</p>
        </div>
      </div>
    </div>
  </div>
</template>
