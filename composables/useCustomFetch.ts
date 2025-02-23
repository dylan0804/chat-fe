import type { UseFetchOptions } from 'nuxt/app';

export function useCustomFetch<T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {}
) {
    const { method = 'GET', server = true } = options

    return useFetch(url, {
        method,
        server,
        $fetch: useNuxtApp().$api,
        transform: (response: any) => response.data,
        ...options,
    })
}