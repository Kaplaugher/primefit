<script setup>
definePageMeta({
  layout: 'dashboard'
})

const applications = [
  {
    company: 'Acme Inc',
    position: 'Senior Developer',
    status: 'In Review',
    date: '2024-03-15',
  },
  {
    company: 'TechCorp',
    position: 'Full Stack Engineer',
    status: 'Interview Scheduled',
    date: '2024-03-14',
  },
  // Add more sample applications as needed
]
</script>

<template>
  <div>
    <div class="md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Applications
        </h2>
      </div>
      <div class="mt-4 flex md:ml-4 md:mt-0">
        <button type="button"
          class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80">
          New Application
        </button>
      </div>
    </div>

    <div class="mt-6">
      <div class="overflow-hidden rounded-xl border">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Company
              </th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Position
              </th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Date
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="application in applications" :key="application.company">
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ application.company }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ application.position }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ application.status }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ application.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>