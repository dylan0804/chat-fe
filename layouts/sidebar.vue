<template>
    <div class="flex bg-gray-50 dark:bg-gray-900">
        <div class="w-96 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-blur-sm">
          <!-- Search and Create Section -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-2 mb-4">
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
          <div class="overflow-y-auto h-[calc(100vh-5rem)]">
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
                        {{ formatParticipants(room.max_participants) }}
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
        </div>

        <slot />
    </div>
</template>

<script setup lang="ts">
interface Room {
  id: number
  name: string
  description: string
  max_participants: number
  is_private: boolean
}

// Search functionality
const searchQuery = ref('')
const filteredRooms = computed(() => {
  if (!rooms.value) return []
  if (!searchQuery.value) return rooms.value
  
  const query = searchQuery.value.toLowerCase()
  return rooms.value.filter(room => 
    room.name.toLowerCase().includes(query) ||
    (room.description && room.description.toLowerCase().includes(query))
  )
})

// Room selection
const selectedRoom = ref<Room | null>(null)
function selectRoom(room: Room) {
  selectedRoom.value = room
  navigateTo(`/rooms/${room.id}`)
}

// Utility functions
function generateGradientClass(name: string) {
  const gradients = [
    'bg-gradient-to-br from-pink-500 to-rose-500',
    'bg-gradient-to-br from-blue-500 to-indigo-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-purple-500 to-violet-500',
    'bg-gradient-to-br from-orange-500 to-amber-500'
  ]
  
  // Generate a consistent index based on the room name
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return gradients[index % gradients.length]
}

function formatParticipants(max: number) {
  return `${max} max`
}

// Fetch rooms
const { data: rooms } = useCustomFetch<Room[]>('/rooms', {
    server: true
})
</script>