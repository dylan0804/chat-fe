interface LoginResponse {
  token: string,
  user_id: string
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  try {
    const { data } = await $fetch<BaseResponse<LoginResponse>>('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        body: {
            email,
            password
        }
    })

    await setUserSession(event, {
        user: {
            token: data.token,
            user_id: data.user_id,
            email
        },
    })
    
  } catch (error: any) {
    throw createError({
      statusMessage: error.data.message
    })
  }
})
