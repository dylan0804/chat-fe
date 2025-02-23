<template>
    <!-- Chat Section Placeholder -->
    <div class="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900/50">
      <div class="text-center">
        <UIcon
          name="i-heroicons-chat-bubble-left-right"
          class="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"
        />
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Select a room to start chatting
        </h3>
      </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'sidebar'
})

</script>