import { ref } from 'vue'

import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat-store', () => {
    const rooms = ref<string[]>([])

    return {
        rooms
    }
})