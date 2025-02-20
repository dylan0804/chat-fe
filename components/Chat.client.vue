<template>
    <button @click="sendMessage">Send</button>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core';

const { status, data, send, open, close } = useWebSocket('ws://localhost:8080/ws')

function sendMessage() {
    send('bitch aa')
}

</script>