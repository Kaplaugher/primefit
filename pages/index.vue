<script setup lang="ts">
const links = ref([
  {
    label: 'Get started',
    to: '/getting-started',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'Learn more',
    to: '/getting-started/theme',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
const features = ref([
  {
    title: 'Icons',
    description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.',
    icon: 'i-lucide-smile',
    to: '/getting-started/icons'
  },
  {
    title: 'Fonts',
    description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.',
    icon: 'i-lucide-type',
    to: '/getting-started/fonts'
  },
  {
    title: 'Color Mode',
    description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.',
    icon: 'i-lucide-moon',
    to: '/getting-started/color-mode'
  }
])
const plans = ref([
  {
    title: 'Free',
    description: 'Tailored for indie hackers.',
    price: '$0',
    features: [
      'Application Tracking',
      'Lifetime access'
    ],
    button: {
      label: 'Buy now'
    }
  },
  {
    title: 'Pro',
    description: 'Best suited for small teams.',
    price: '$10/month',
    features: [
      'Browser Extension',
      'AI Resume Review',
      'Ghost Job Analysis',
    ],
    button: {
      label: 'Buy now'
    }
  },

])
</script>

<template>
  <UPage>
    <UPageHero title="Ultimate Vue UI library"
      description="A Nuxt/Vue-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications."
      headline="New release" orientation="horizontal" :links="links">
      <img src="https://ui.nuxt.com/templates/dashboard1.png" alt="App screenshot"
        class="rounded-lg shadow-2xl ring ring-(--ui-border)" />
    </UPageHero>
    <UPageSection title="Beautiful Vue UI components"
      description="Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt."
      :features="features" />
    <UPricingPlans :plans="plans" />
  </UPage>
</template>
