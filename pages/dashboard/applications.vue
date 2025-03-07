<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Import TableColumn type from @nuxt/ui
import type { TableColumn } from '#ui/types'
import * as z from 'zod'
// FormSubmitEvent is auto-imported in Nuxt

const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

// Define the Application type based on our database schema
type Application = {
  id: number
  companyName: string
  date: string
  status: string
  email: string
  amount: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

// Fetch applications from the API
const { data: apiResponse, refresh } = await useFetch<{ success: boolean, data: Application[] }>('/api/applications')
const applications = computed(() => apiResponse.value?.success ? apiResponse.value.data : [])

// Add a confirmation modal for delete
const deleteConfirmOpen = ref(false)
const applicationToDelete = ref<Application | null>(null)

// Function to delete an application
async function deleteApplication(application: Application) {
  try {
    const response = await $fetch<{ success: boolean; error?: string; message?: string }>(`/api/applications/${application.id}`, {
      method: 'DELETE'
    })

    if (response.success) {
      toast.add({
        title: 'Application Deleted',
        description: 'The application has been successfully deleted.',
        color: 'success'
      })

      // Refresh the applications list
      refresh()
    } else {
      throw new Error(response.error || 'Failed to delete application')
    }
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to delete application',
      color: 'error'
    })
    console.error(error)
  } finally {
    // Reset the application to delete
    applicationToDelete.value = null
    deleteConfirmOpen.value = false
  }
}

// Function to confirm deletion
function confirmDelete(application: Application) {
  applicationToDelete.value = application
  deleteConfirmOpen.value = true
}

const columns: TableColumn<Application>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'companyName',
    header: 'Company',
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
        pending: 'warning' as const,
        approved: 'success' as const,
        rejected: 'error' as const
      }[row.getValue('status') as string] || 'neutral' as const

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
  },
  {
    id: 'actions',
    header: '',
    enableHiding: false,
    cell: ({ row }) => {
      const application = row.original

      const items = [
        {
          type: 'label',
          label: 'Actions'
        },
        {
          label: 'View Details',
          icon: 'i-lucide-eye',
          onSelect() {
            // View details functionality can be added here
            console.log('View details for application:', application.id)
          }
        },
        {
          label: 'Edit',
          icon: 'i-lucide-pencil',
          onSelect() {
            // Edit functionality can be added here
            console.log('Edit application:', application.id)
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Delete',
          icon: 'i-lucide-trash-2',
          color: 'error' as const,
          onSelect() {
            confirmDelete(application)
          }
        }
      ]

      return h('div', { class: 'text-right' }, h(UDropdownMenu, {
        content: {
          align: 'end'
        },
        items
      }, () => h(UButton, {
        icon: 'i-lucide-ellipsis-vertical',
        color: 'neutral',
        variant: 'ghost',
        class: 'ml-auto'
      })))
    }
  }
]

const table = useTemplateRef('table')

const columnFilters = ref([])

// Add a ref to control the modal's open state
const open = ref(false)

// Application form schema based on the database schema
const applicationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['pending', 'approved', 'rejected'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }).default('pending'),
  amount: z.coerce.number()
    .positive('Amount must be a positive number')
    .min(0.01, 'Amount must be greater than 0'),
  notes: z.string().optional()
})

type ApplicationSchema = z.output<typeof applicationSchema>

const formState = reactive<Partial<ApplicationSchema>>({
  companyName: '',
  email: '',
  status: 'pending',
  amount: undefined,
  notes: ''
})

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
]

const toast = useToast()

async function onSubmit(event: any) {
  try {
    // Call the API to create a new application
    await $fetch('/api/applications', {
      method: 'POST',
      body: event.data
    })

    toast.add({
      title: 'Application Submitted',
      description: 'The application has been successfully added.',
      color: 'success'
    })

    // Reset form
    formState.companyName = ''
    formState.email = ''
    formState.status = 'pending'
    formState.amount = undefined
    formState.notes = ''

    // Close modal
    open.value = false

    // Refresh the applications list
    refresh()
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to submit application. Please try again.',
      color: 'error'
    })
    console.error(error)
  }
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

    <UTable ref="table" v-model:column-filters="columnFilters" :data="applications" :columns="columns" />

    <!-- Add Application Modal -->
    <UModal v-model:open="open" title="Add New Application"
      description="Fill out the form below to add a new application to the system.">
      <template #content>
        <div class="w-full max-w-2xl p-4">
          <UForm :schema="applicationSchema" :state="formState" class="space-y-6 w-full" @submit="onSubmit">

            <UFormField label="Company Name" name="companyName" help="Name of the company" class="w-full">
              <UInput v-model="formState.companyName" placeholder="e.g., Acme Corp" class="w-full" />
            </UFormField>

            <UFormField label="Email" name="email" help="Applicant's email address" class="w-full">
              <UInput v-model="formState.email" placeholder="email@example.com" class="w-full" />
            </UFormField>

            <UFormField label="Status" name="status" class="w-full">
              <USelect v-model="formState.status" :items="statusOptions" class="w-full" />
            </UFormField>

            <UFormField label="Amount" name="amount" help="Amount in EUR" class="w-full">
              <UInput v-model="formState.amount" type="number" min="0.01" step="0.01" placeholder="0.00"
                class="w-full" />
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

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="deleteConfirmOpen" title="Confirm Deletion"
      description="Are you sure you want to delete this application? This action cannot be undone.">
      <template #content>
        <div class="p-4">
          <div v-if="applicationToDelete" class="mb-6">
            <p class="mb-2"><strong>Company:</strong> {{ applicationToDelete.companyName }}</p>
            <p class="mb-2"><strong>Email:</strong> {{ applicationToDelete.email }}</p>
            <p><strong>Amount:</strong> {{ new Intl.NumberFormat('en-US', {
              style: 'currency', currency: 'EUR'
            }).format(Number(applicationToDelete.amount)) }}</p>
          </div>

          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="soft" @click="deleteConfirmOpen = false">
              Cancel
            </UButton>
            <UButton color="error" @click="applicationToDelete && deleteApplication(applicationToDelete)">
              Delete
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
