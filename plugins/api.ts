export default defineNuxtPlugin((nuxtApp) => {
    const api = $fetch.create({
        baseURL: 'http://localhost:8080/api/v1',
        onRequest({ request, options, error }) {
            console.log(request, options, error)
        },
        onResponseError({ response }) {
            console.log(response)
        }
    })

    return {
        provide: {
            api
        }
    }
})