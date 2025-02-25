
export default defineNuxtPlugin((nuxtApp) => {
    const { user } = useUserSession()

    const api = $fetch.create({
        baseURL: 'http://localhost:8080/api/v1',
        onRequest({ request, options, error }) {
            if (user.value?.token) {
                options.headers.set('Authorization', `Bearer ${user.value?.token}`)
            }
        },
    })

    return {
        provide: {
            api
        }
    }
})