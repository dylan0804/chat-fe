# Chat

A modern chat application built with Nuxt 3 that allows users to chat inrooms for real-time conversations.

## Features

- 🔐 Session management with nuxt-auth-utils
- 💬 Real-time messaging using VueUse's useWebSocket
- 🎨 Modern UI with Nuxt UI
- 📦 State management with Pinia

## Tech Stack

- Nuxt 3
- Nuxt UI
- VueUse
- Pinia
- TypeScript
- Tailwind CSS

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file:
```env
API_URL=http://localhost:8080/api
```

3. Start development server:
```bash
pnpm dev
```

## Project Structure

- `pages/` - Application routes
- `components/` - Reusable Vue components
- `composables/` - Shared composable functions
- `stores/` - Pinia stores for state management
- `layouts/` - Page layouts including sidebar
