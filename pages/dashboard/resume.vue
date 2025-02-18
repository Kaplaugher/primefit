<script setup>
definePageMeta({
  layout: 'dashboard'
})

const resume = {
  experience: [
    {
      company: 'Previous Company',
      position: 'Senior Developer',
      period: '2020 - Present',
      description: 'Led development of key features and mentored junior developers.',
    },
    {
      company: 'Past Company',
      position: 'Software Engineer',
      period: '2018 - 2020',
      description: 'Developed and maintained web applications using Vue.js and Node.js.',
    },
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Computer Science',
      year: '2018',
    },
  ],
}
</script>

<template>
  <div>
    <div class="md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Resume
        </h2>
      </div>
      <div class="mt-4 flex md:ml-4 md:mt-0">
        <button type="button"
          class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80">
          Edit Resume
        </button>
      </div>
    </div>

    <div class="mt-6 space-y-8">
      <!-- Experience Section -->
      <section>
        <h3 class="text-lg font-semibold text-gray-900">Experience</h3>
        <div class="mt-4 space-y-6">
          <div v-for="job in resume.experience" :key="job.company" class="border-b pb-6">
            <div class="flex justify-between">
              <div>
                <h4 class="text-base font-medium text-gray-900">{{ job.position }}</h4>
                <p class="mt-1 text-sm text-gray-600">{{ job.company }}</p>
              </div>
              <p class="text-sm text-gray-600">{{ job.period }}</p>
            </div>
            <p class="mt-3 text-sm text-gray-600">{{ job.description }}</p>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section>
        <h3 class="text-lg font-semibold text-gray-900">Education</h3>
        <div class="mt-4 space-y-6">
          <div v-for="edu in resume.education" :key="edu.school" class="border-b pb-6">
            <div class="flex justify-between">
              <div>
                <h4 class="text-base font-medium text-gray-900">{{ edu.school }}</h4>
                <p class="mt-1 text-sm text-gray-600">{{ edu.degree }}</p>
              </div>
              <p class="text-sm text-gray-600">{{ edu.year }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>