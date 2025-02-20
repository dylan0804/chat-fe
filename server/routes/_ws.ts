
export default defineWebSocketHandler({
    open(peer) {
        console.log('open', peer)
    },
    message(peer, message) {
        console.log('message', peer, message)
    },
    close(peer) {
        console.log('close', peer)
    }
})