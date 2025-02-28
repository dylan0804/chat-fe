<template>
    <div class="flex h-full bg-gray-50 dark:bg-gray-900 w-full">
        <div class="flex flex-col h-full w-96 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-blur-sm">
          <!-- Search and Create Section -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-2">
              <UInput
                v-model="searchQuery"
                placeholder="Search rooms..."
                icon="i-heroicons-magnifying-glass"
                color="gray"
                variant="outline"
                class="flex-grow"
              />
              <UButton
                icon="i-heroicons-plus"
                color="primary"
                variant="solid"
                to="/"
                class="flex-shrink-0"
              />
            </div>
          </div>

          <!-- Rooms List -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-2 space-y-2">
              <UCard
                v-for="room in filteredRooms"
                :key="room.id"
                :ui="{
                  body: {
                    padding: 'p-4',
                    base: 'relative transition-transform duration-200 hover:scale-[1.02] cursor-pointer'
                  }
                }"
                class="group"
                @click="selectRoom(room)"
              >
                <div class="flex items-start gap-4">
                  <!-- Room Avatar -->
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg"
                    :class="generateGradientClass(room.name)"
                  >
                    {{ room.name.charAt(0).toUpperCase() }}
                  </div>
                  <!-- Room Info -->
                  <div class="flex-grow min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-semibold text-gray-900 dark:text-white truncate">
                        {{ room.name }}
                      </h3>
                      <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {{ room.max_participants }} max
                      </span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {{ room.description || 'No description available' }}
                    </p>
                  </div>
                </div>
                <!-- Hover Effect Indicator -->
                <div class="absolute inset-y-0 right-0 w-1 bg-primary-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
              </UCard>
            </div>
          </div>

          <div class="p-4 mt-auto">
            <UDropdown class="w-full" :items="items" :popper="{ placement: 'bottom-start' }">
              <UButton :label="user.email" color="gray" block>
                <template #trailing>
                  <UIcon name="i-heroicons-chevron-up-20-solid" class="w-5 h-5" />
                </template>
              </UButton>
            </UDropdown>
          </div>
        </div>

        <slot />
    </div>
</template>

<script setup lang="ts">
import { generateGradientClass } from '~/utils'

interface Room {
  id: number
  name: string
  description: string
  max_participants: number
  is_private: boolean
}

const { $api } = useNuxtApp()
const { user, clear } = useUserSession()

// init
const { data } = useCustomFetch<Room[]>('/rooms')
const rooms = computed(() => data.value?.data)

const items = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }], [{
    label: 'Logout',
    class: 'text-red-500',
    click: () => logout()
  }]
]

// search func
const searchQuery = ref('')
const filteredRooms = computed(() => {
  if (!rooms.value) return []
  if (!searchQuery.value) return rooms.value
  
  const query = searchQuery.value.toLowerCase()
  return rooms.value.filter((room: Room) => 
    room.name.toLowerCase().includes(query) ||
    (room.description && room.description.toLowerCase().includes(query))
  )
})

// room selection
const selectedRoom = ref<Room | null>(null)
function selectRoom(room: Room) {
  selectedRoom.value = room
  navigateTo(`/rooms/${room.id}`)
}

async function logout() {
  try {
    await $api('/auth/logout', {
      method: 'POST'
    })

    await clear()
    navigateTo('/auth')
  } catch (error) {
    console.error(error)
  }
}

</script>