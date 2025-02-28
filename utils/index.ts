// Utility functions
export function generateGradientClass(name: string) {
    const gradients = [
      'bg-gradient-to-br from-pink-500 to-rose-500',
      'bg-gradient-to-br from-blue-500 to-indigo-500',
      'bg-gradient-to-br from-green-500 to-emerald-500',
      'bg-gradient-to-br from-purple-500 to-violet-500',
      'bg-gradient-to-br from-orange-500 to-amber-500'
    ]
    
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return gradients[index % gradients.length]
}

export function formatChatDate(isoString: string): string {
    if (!isoString) return ''
    
    const date = new Date(isoString)
    const now = new Date()
    
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = (hours % 12 || 12).toString()
    const timeString = `${formattedHours}:${minutes} ${ampm}`
    
    if (date.toDateString() === now.toDateString()) {
      return timeString
    }
    
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${timeString}`
    }
    
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    return `${month} ${day}, ${timeString}`
}