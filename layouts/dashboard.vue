<script setup lang="ts">
import { UDashboardGroup } from '#components';

const links = [[{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/dashboard',
  active: true
}, {
  label: 'Applications',
  icon: 'i-lucide-inbox',
  to: '/dashboard/applications'
}, {
  label: 'Resume',
  icon: 'i-lucide-users',
  to: '/dashboard/resume'
}, {
  label: 'Settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  to: '/dashboard/settings',
}],]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-(--ui-border)' }">
      <template #header="{ collapsed }">
        Logo
      </template>

      <template #default="{ collapsed }">
        <UButton :label="collapsed ? undefined : 'Search...'" icon="i-lucide-search" color="neutral" variant="outline"
          block :square="collapsed">
          <template v-if="!collapsed" #trailing>
            <div class="flex items-center gap-0.5 ms-auto">
              <UKbd value="meta" variant="subtle" />
              <UKbd value="K" variant="subtle" />
            </div>
          </template>
        </UButton>

        <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" />

        <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" class="mt-auto" />
      </template>

      <template #footer="{ collapsed }">
        <UserButton />
      </template>
    </UDashboardSidebar>
    <UContainer class="w-full">
      <slot />
    </UContainer>
  </UDashboardGroup>
</template>
