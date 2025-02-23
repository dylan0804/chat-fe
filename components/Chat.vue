<template>
    <div>
        <input type="text" v-model="textMsg">
        <button @click="sendMessage">Send</button>
        <p>Chat: {{ messages }}</p>
        <button @click="close()">close</button>
    </div>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core';

const textMsg = ref<string>('')
const messages = ref<string[]>([])

const { status, data, send, open, close } = useWebSocket('ws://localhost:8080/ws?room=2')

function sendMessage() {
    send(textMsg.value)
    textMsg.value = ''
}

watch(data, (newVal) => {
    console.log(newVal)
    messages.value.push(newVal)
})

</script>