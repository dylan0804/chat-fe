<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-primary-600 mb-2">
          Create Your Chat Room
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Set up a new space for real-time conversations
        </p>
      </div>

      <!-- Main Form Card -->
      <UCard
        class="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-0 shadow-xl"
      >
        <UForm
          :state="formState"
          @submit="createRoom"
          class="space-y-8"
        >
          <!-- Room Basic Info Section -->
          <div class="grid md:grid-cols-2 gap-6">
            <UFormGroup
              label="Room Name"
              name="roomName"
              class="md:col-span-2"
            >
              <UInput
                v-model="formState.roomName"
                placeholder="Enter an engaging room name"
                icon="i-heroicons-chat-bubble-left-right"
                size="lg"
                color="primary"
                variant="outline"
                class="transition-all duration-200 hover:ring-2 hover:ring-primary-500/20"
              />
            </UFormGroup>

            <UFormGroup
              label="Description"
              name="description"
              class="md:col-span-2"
            >
              <UTextarea
                v-model="formState.description"
                placeholder="Describe what this room is about..."
                :ui="{
                  wrapper: 'relative',
                  base: 'relative block w-full transition-all duration-200 focus:ring-2 focus:ring-primary-500/20',
                }"
                :rows="4"
              />
            </UFormGroup>
          </div>

          <!-- Room Settings Section -->
          <div class="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Room Settings
            </h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <UFormGroup label="Maximum Participants">
                <USelect
                  v-model="formState.maxParticipants"
                  :options="participantOptions"
                />
              </UFormGroup>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end">            
            <UButton
              type="submit"
              color="primary"
              :loading="isLoading"
            >
              <UIcon name="i-heroicons-plus-circle" class="mr-1" />
              Create Room
            </UButton>
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomFetch } from '~/composables/useCustomFetch'

interface FormState {
  roomName: string
  description: string
  maxParticipants: number
}

const toast = useToast()

const { session } = useUserSession()

// Form state
const formState = ref<FormState>({
  roomName: '',
  description: '',
  maxParticipants: 10
})

// UI state
const isLoading = ref(false)
const notification = reactive({
  show: false,
  title: '',
  description: '',
  color: 'green'
})

const participantOptions = [
  { label: '5 participants', value: 5 },
  { label: '10 participants', value: 10 },
  { label: '15 participants', value: 15 },
  { label: '20 participants', value: 20 }
]

// Form submission
async function createRoom() {
  if (!formState.value.roomName.trim()) {
    showNotification('Error', 'Room name is required', 'red')
    return
  }

  isLoading.value = true

  const payload = {
    params: {
      room: formState.value.maxParticipants
    },
    body: {
      name: formState.value.roomName.trim(),
      description: formState.value.description.trim(),
      max_participants: formState.value.maxParticipants,
      is_private: true
    }
  }

  try {
    await useCustomFetch<string>('rooms', {
      method: 'POST',
      ...payload,
    })
    
    toast.add({
      title: 'Success',
      description: 'Your chat room has been created!',
      color: 'green'
    })
    resetForm()
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to create room. Please try again.',
      color: 'red'
    })
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// Helper functions
function resetForm() {
  formState.value.roomName = ''
  formState.value.description = ''
  formState.value.maxParticipants = 10
}

function showNotification(title: string, description: string, color: string) {
  notification.title = title
  notification.description = description
  notification.color = color
  notification.show = true
}
</script>

