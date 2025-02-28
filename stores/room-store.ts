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
    content: string
    userId: string
    createdAt: string
}

export const useRoomStore = defineStore('room-store', () => {
    const { $api } = useNuxtApp()

    const roomDetails = ref<RoomDetails>()
    const messages = ref<Message[]>([])

    async function getRoom(id: string) {
        const { data } = await $api<BaseResponse<Room>>(`/rooms/${id}`)

        roomDetails.value = data.roomDetails
        messages.value = data.messages
    }

    return {
        roomDetails,
        messages,

        getRoom
    }
})