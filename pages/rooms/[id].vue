<template>
  <div class="flex flex-col bg-gray-50 dark:bg-gray-900/50 w-full">
    <!-- Chat Header -->
    <div class="flex justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div class="flex items-center gap-4">
        <div 
          class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg"
          :class="generateGradientClass(room?.name || '')"
        >
          {{ room?.name?.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ room?.name }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ room?.description }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-users"
        >
          {{ room?.max_participants }} max
        </UButton>
        <UDropdown
          :items="menuItems"
          :popper="{ placement: 'bottom-end' }"
        >
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal"
          />
        </UDropdown>
      </div>
    </div>

    <!-- Chat Messages Area -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-if="loading" class="flex justify-center py-8">
        <USkeleton class="h-32 w-full max-w-lg rounded-xl" />
      </div>
      
      <template v-else>
        <div
          v-for="(message, i) in messages"
          :key="i"
          class="flex gap-4 mx-auto"
          :class="message.clientId === clientId ? 'justify-end' : 'justify-start'"
        >
          <!-- Message Bubble -->
          <div 
            class="flex flex-col max-w-[80%]"
            :class="message.clientId === clientId ? 'items-end' : 'items-start'"
          >
            <div 
              class="px-4 py-2 rounded-2xl text-sm break-words"
              :class="message.clientId === clientId ? 
                'bg-primary-500 text-white rounded-br-sm' : 
                'bg-white dark:bg-gray-800 rounded-bl-sm'"
            >
              <p>{{ message.content }}</p>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400 px-2 mt-1">
              {{ message.clientId === clientId ? 'You' : 'Other' }} • {{ message.timestamp }}
            </span>
          </div>
        </div>
      </template>
    </div>

    <!-- Chat Input Area -->
    <div class="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
      <div class="mx-auto">
        <form @submit.prevent="sendMessage" class="flex gap-2 items-center">
          <UTextarea
            v-model="messageText"
            :rows="1"
            placeholder="Type your message..."
            :ui="{
              wrapper: 'relative flex-1',
              base: 'relative block w-full transition-all duration-200 focus:ring-2 focus:ring-primary-500/20',
            }"
            class="resize-none"
            autofocus
            @keydown.enter.prevent="sendMessage"
          />
          <UButton
            type="submit"
            color="primary"
            class="h-[32px]"
            :loading="sending"
            :disabled="!messageText.trim()"
          >
            <UIcon name="i-heroicons-paper-airplane" />
          </UButton>
        </form>
      </div>
    </div>
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

interface Message {
  content: string
  clientId: string
  timestamp?: string
}

definePageMeta({
  layout: 'sidebar'
})

const route = useRoute()
const loading = ref(false)
const sending = ref(false)
const messageText = ref('')
const messages = ref<Message[]>([])
const { user } = useUserSession()

// Menu items for room options
const menuItems = [
  [{
    label: 'Room Info',
    icon: 'i-heroicons-information-circle',
    click: () => {}
  }],
  [{
    label: 'Invite Users',
    icon: 'i-heroicons-user-plus',
    click: () => {}
  }],
  [{
    label: 'Leave Room',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => {},
    color: 'red'
  }]
]

// Message handling
async function sendMessage() {
  if (!messageText.value.trim()) return
  
  sending.value = true
  try {
    ws.send(JSON.stringify({
      type: 'message',
      content: messageText.value,
      client_id: user.value.user_id
    }))
    console.log('message sent')
    messageText.value = ''
  } finally {
    sending.value = false
  }
}

// Utility function for consistent gradient colors
function generateGradientClass(name: string) {
  const gradients = [
    'bg-gradient-to-br from-pink-500 to-rose-500',
    'bg-gradient-to-br from-blue-500 to-indigo-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-purple-500 to-violet-500',
    'bg-gradient-to-br from-orange-500 to-amber-500'
  ]
  
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return gradients[index % gradients.length]
}

const { data: room } = useCustomFetch<Room>(`/rooms/${route.params.id}`, {
    server: true
})
const ws = 
  useWebSocket(`ws://localhost:8080/ws/rooms/${route.params.id}`, {
    onMessage: (ws, event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('data', data)
        if (data.type !== 'pong') {
          messages.value.push({
            content: data.content,
            clientId: data.client_id,
            timestamp: new Date().toLocaleTimeString()
          })
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    },
    heartbeat: {
      message: JSON.stringify({
        type: 'ping'
      }),
      interval: 60000
    }
  })

function init() {
}

init()
</script>