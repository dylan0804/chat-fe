<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-2">
    <div class="flex flex-col w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome to ChatRooms</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Join conversations that matter</p>
      </div>

      <UCard class="backdrop-blur-sm bg-white/50 flex-1 dark:bg-gray-800/50 border-0 shadow-xl">
        <!-- Auth Tabs -->
        <UTabs :items="tabs" class="mb-6">
          <template #login="{ tab }">
              <UForm class="flex flex-col gap-3" :schema="schema" :state="loginForm" @submit="handleLogin">
                  <UFormGroup label="Email" name="email">
                    <UInput
                      v-model="loginForm.email"
                      type="email"
                      placeholder="your@email.com"
                      icon="i-heroicons-envelope"
                      autocomplete="email"
                    />
                  </UFormGroup>

                  <UFormGroup label="Password" name="password">
                    <UInput
                      v-model="loginForm.password"
                      type="password"
                      placeholder="••••••••"
                      icon="i-heroicons-lock-closed"
                      autocomplete="current-password"
                    />
                  </UFormGroup>

                  <UButton
                    type="submit"
                    color="primary"
                    block
                    :loading="isLoading"
                  >
                    Sign In
                  </UButton>
                </UForm>
            </template>

            <template #register="{ tab }">
                <UForm class="flex flex-col gap-3" :schema="schema" :state="registerForm" @submit="handleRegister">
                  <UFormGroup label="Email" name="email">
                    <UInput
                      v-model="registerForm.email"
                      type="email"
                      placeholder="your@email.com"
                      icon="i-heroicons-envelope"
                      autocomplete="email"
                    />
                  </UFormGroup>

                  <UFormGroup label="Password" name="password">
                    <UInput
                      v-model="registerForm.password"
                      type="password"
                      placeholder="••••••••"
                      icon="i-heroicons-lock-closed"
                      autocomplete="new-password"
                    />
                  </UFormGroup>

                  <UButton
                    type="submit"
                    color="primary"
                    class="mt-auto"
                    block
                    :loading="isLoading"
                  >
                    Create Account
                  </UButton>
                </UForm>
          </template>
        </UTabs>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

type Schema = z.output<typeof schema>

const router = useRouter()
const toast = useToast()

const isLoading = ref(false)

const tabs = [
  {
    slot: 'login',
    label: 'Sign In',
    icon: 'i-heroicons-arrow-right-on-rectangle'
  },
  {
    slot: 'register',
    label: 'Create Account',
    icon: 'i-heroicons-user-plus'
  }
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  email: '',
  password: '',
})

async function handleRegister(event: FormSubmitEvent<Schema>) {
  const payload = {
    body: {
      email: event.data.email,
      password: event.data.password
    }
  }

  try {
    await $fetch('/api/login', {
      method: 'POST',
      ...payload
    })

    navigateTo('/rooms')
  } catch (error) {
    console.error(error)
  }
}

function handleLogin() {
  
}
</script> 