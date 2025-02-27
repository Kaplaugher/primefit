<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Import TableColumn type from @nuxt/ui
import type { TableColumn } from '#ui/types'
import * as z from 'zod'
// FormSubmitEvent is auto-imported in Nuxt

const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]

const table = useTemplateRef('table')

const columnFilters = ref([
  {
    id: 'email',
    value: 'james'
  }
])

// Add a ref to control the modal's open state
const open = ref(false)

// Application form schema based on the database schema
const applicationSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['pending', 'approved', 'rejected'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }).default('pending'),
  amount: z.string().min(1, 'Amount is required')
    .refine((val: string) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Amount must be a positive number'
    }),
  notes: z.string().optional()
})

type ApplicationSchema = z.output<typeof applicationSchema>

const formState = reactive<Partial<ApplicationSchema>>({
  applicationId: undefined,
  email: undefined,
  status: 'pending',
  amount: undefined,
  notes: undefined
})

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
]

const toast = useToast()

async function onSubmit(event: any) {
  toast.add({
    title: 'Application Submitted',
    description: 'The application has been successfully added.',
    color: 'success'
  })
  console.log(event.data)
  // Here you would typically save the data to the database
  open.value = false
}
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex px-4 py-3.5 border-b border-(--ui-border-accented) justify-between">
      <UInput :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string" class="max-w-sm"
        placeholder="Filter emails..."
        @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)" />

      <UButton label="Add Application" color="primary" @click="open = true" />
    </div>

    <UTable ref="table" v-model:column-filters="columnFilters" :data="data" :columns="columns" />

    <UModal v-model:open="open" title="Add New Application"
      description="Fill out the form below to add a new application to the system.">
      <template #content>
        <div class="w-full max-w-2xl p-4">
          <UForm :schema="applicationSchema" :state="formState" class="space-y-6 w-full" @submit="onSubmit">

            <UFormField label="Application ID" name="applicationId" help="Unique identifier for this application"
              class="w-full">
              <UInput v-model="formState.applicationId" placeholder="e.g., APP12345" class="w-full" />
            </UFormField>

            <UFormField label="Email" name="email" help="Applicant's email address" class="w-full">
              <UInput v-model="formState.email" placeholder="email@example.com" class="w-full" />
            </UFormField>

            <UFormField label="Status" name="status" class="w-full">
              <USelect v-model="formState.status" :items="statusOptions" class="w-full" />
            </UFormField>

            <UFormField label="Amount" name="amount" help="Amount in EUR" class="w-full">
              <UInput v-model="formState.amount" placeholder="0.00" type="number" step="0.01" min="0" class="w-full" />
            </UFormField>

            <UFormField label="Notes" name="notes" help="Additional information (optional)" class="w-full">
              <UTextarea v-model="formState.notes" placeholder="Enter any additional notes here..." class="w-full"
                :rows="4" />
            </UFormField>

            <div class="flex justify-end gap-2 mt-8">
              <UButton color="neutral" variant="soft" @click="open = false">
                Cancel
              </UButton>
              <UButton type="submit" color="primary">
                Submit Application
              </UButton>
            </div>
          </UForm>
        </div>
      </template>
    </UModal>
  </div>
</template>
