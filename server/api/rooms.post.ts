import { useCustomFetch } from '~/composables/useCustomFetch'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  useCustomFetch<BaseResponse>('/rooms', {
    method: 'POST',
    body
  })
})