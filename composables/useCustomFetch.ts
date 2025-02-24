import type { UseFetchOptions } from 'nuxt/app';

export interface BaseResponse<T> {
    success: string,
    message: string,
    data: T
}

export function useCustomFetch<T>(
    url: string | (() => string),
    options: UseFetchOptions<BaseResponse<T>> = {}
) {
    const { user } = useUserSession()

    const { method = 'GET', server = true } = options    
    options.headers = user.value ? {
        'Authorization': `Bearer ${user.value.token}`
    } : {}
    
    return useFetch(url, {
        method,
        server,
        $fetch: useNuxtApp().$api,
        transform: (response: any) => response.data,
        ...options,
    })
}