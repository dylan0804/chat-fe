
import { ref } from 'vue'

import { defineStore } from 'pinia'
import type { UseWebSocketReturn } from '@vueuse/core'


interface MessagePayload {
    type: 'message',
    content: string
    createdAt: string
}

const wsUrl = 'ws://localhost:8080/ws/rooms'

export const useWebsocketStore = defineStore('websocket-store', () => {
    const ws = ref<UseWebSocketReturn<any>>()

    const { messages } = storeToRefs(useRoomStore())

    function connect(roomId: string, token: string) {
        ws.value = useWebSocket(`${wsUrl}/${roomId}?token=${token}`, {
            onMessage: (ws, event) => {
                handleMessage(ws, event)
            },
            
            heartbeat: {
                message: JSON.stringify({
                    type: 'ping'
                }),
                interval: 60000
            }
        })
    }

    function send(message: MessagePayload) {
        ws.value?.send(JSON.stringify(message))
    }

    function handleMessage(ws: WebSocket, event: MessageEvent<any>) {
        const data = JSON.parse(event.data)

        if (data.type === 'pong') return

        messages.value.push({
            userId: data.userId,
            content: data.content,
            createdAt: data.createdAt,
        })
    }
    
    return {
        connect,
        send,
        
        ws
    }
})