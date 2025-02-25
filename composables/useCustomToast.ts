export function useCustomToast() {
    const toast = useToast()

    function success(title: string, description?: string) {
        toast.add({
            title,
            description,
            icon: 'i-heroicons-check-circle',
            color: 'green',
            timeout: 3000
        })
    }

    function error(title: string, description?: string) {
        toast.add({
            title,
            description,
            icon: 'i-heroicons-x-circle',
            color: 'red',
            timeout: 5000
        })
    }

    function info(title: string, description?: string) {
        toast.add({
            title,
            description,
            icon: 'i-heroicons-information-circle',
            color: 'blue',
            timeout: 3000
        })
    }

    function warning(title: string, description?: string) {
        toast.add({
            title,
            description,
            icon: 'i-heroicons-exclamation-triangle',
            color: 'yellow',
            timeout: 4000
        })
    }

    return {
        toast,
        
        success,
        error,
        info,
        warning
    }
}