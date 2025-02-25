// Utility functions
export function generateGradientClass(name: string) {
    const gradients = [
      'bg-gradient-to-br from-pink-500 to-rose-500',
      'bg-gradient-to-br from-blue-500 to-indigo-500',
      'bg-gradient-to-br from-green-500 to-emerald-500',
      'bg-gradient-to-br from-purple-500 to-violet-500',
      'bg-gradient-to-br from-orange-500 to-amber-500'
    ]
    
    // Generate a consistent index based on the room name
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return gradients[index % gradients.length]
}
  