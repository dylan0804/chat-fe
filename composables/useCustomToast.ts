export function useCustomToast() {
    const toast = useToast()

    function successToast(title: string, description?: string) {
        toast.add({
            title,
            description,
            icon: 'i-heroicons-check-circle',
            color: 'green',
            timeout: 3000
        })
    }

    function errorToast(title: string, description?: string) {
        toast.add({
            title,
            description,
            icon: 'i-heroicons-x-circle',
            color: 'red',
            timeout: 5000
        })
    }

    function infoToast(title: string, description?: string) {
        toast.add({
            title,
            description,
            icon: 'i-heroicons-information-circle',
            color: 'blue',
            timeout: 3000
        })
    }

    function warningToast(title: string, description?: string) {
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

        successToast,
        errorToast,
        infoToast,
        warningToast
    }
}