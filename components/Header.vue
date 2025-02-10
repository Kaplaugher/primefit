<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    label: 'Docs',
    to: '/getting-started',
    active: route.path.startsWith('/getting-started')
  },
  {
    label: 'Components',
    to: '/components',
    active: route.path.startsWith('/components')
  },
  {
    label: 'Roadmap',
    to: '/roadmap'
  },
  {
    label: 'Figma',
    to: 'https://www.figma.com/community/file/1288455405058138934',
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank'
  }
])
</script>

<template>
  <UHeader>
    <template #title>
      <h1 class="text-2xl font-bold text-white">PrimeFit</h1>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="neutral" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
    </template>
  </UHeader>
</template>
