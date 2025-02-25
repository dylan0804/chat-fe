import { ref } from 'vue'

import { defineStore } from 'pinia'

interface Room {
    roomDetails: RoomDetails
    messages: Message[]
}

interface RoomDetails {
    name: string,
    description: string
}

interface Message {
    id?: string
    content: string
    userId?: string
    createdAt?: string
}

export const useRoomStore = defineStore('room-store', () => {
    const { $api } = useNuxtApp()

    const roomDetails = ref<RoomDetails>()
    const messages = ref<Message[]>([])

    async function getRoom(id: string) {
        return await $api<BaseResponse<Room>>(`/rooms/${id}`)
    }

    return {
        roomDetails,
        messages,

        getRoom
    }
})