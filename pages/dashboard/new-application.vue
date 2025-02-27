<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

import { useApplications } from '~/composables/useApplications';
import type { NewApplication } from '~/server/database/schema';

const { addApplication, loading, error } = useApplications();
const router = useRouter();

const formData = reactive({
  email: '',
  status: 'pending',
  amount: '',
  notes: ''
});

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
  { label: 'Refunded', value: 'refunded' }
];

const submitForm = async () => {
  try {
    const result = await addApplication({
      email: formData.email,
      status: formData.status,
      amount: formData.amount,
      notes: formData.notes || null
    });

    if (result) {
      // Show success message
      useToast().add({
        title: 'Success',
        description: 'Application created successfully',
        color: 'success'
      });

      // Redirect to applications list
      router.push('/dashboard/applications');
    }
  } catch (err) {
    console.error('Error submitting form:', err);
  }
};
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">New Application</h2>
          <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-left" to="/dashboard/applications">
            Back to Applications
          </UButton>
        </div>
      </template>

      <form @submit.prevent="submitForm" class="space-y-6">
        <UFormGroup label="Email" name="email">
          <UInput v-model="formData.email" placeholder="Enter email address" type="email" required />
        </UFormGroup>

        <UFormGroup label="Status" name="status">
          <USelect v-model="formData.status" :options="statusOptions" />
        </UFormGroup>

        <UFormGroup label="Amount" name="amount">
          <UInput v-model="formData.amount" placeholder="Enter amount" type="number" step="0.01" min="0" required />
        </UFormGroup>

        <UFormGroup label="Notes" name="notes">
          <UTextarea v-model="formData.notes" placeholder="Enter notes (optional)" />
        </UFormGroup>

        <div v-if="error" class="text-red-500 mb-4">
          {{ error }}
        </div>

        <div class="flex justify-end">
          <UButton type="submit" color="primary" :loading="loading">
            Create Application
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>