import { apiClient, handleLogout } from '../../core/api/apiClient'
import { store } from '../../core/store/store'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterUserRequest,
  ResetPasswordRequest,
} from './authTypes'
import type { UserResponseDto, CreatedUserResponseDto } from '../users/userTypes'
import userService from '../users/userService'

/** Coalesce burst calls (feed + poll + comments) and skip repeats within the TTL. */
const ENSURE_TTL_MS = 45_000
let ensureInFlight: Promise<void> | null = null
let lastEnsuredAt = 0

/**
 * Public GETs do not 401 on an expired access cookie, so viewer fields
 * (ratings, reactions, poll votes, follow state) can be omitted. Call this
 * before those loads when Redux still thinks the user is signed in.
 */
async function ensureViewerSession(): Promise<void> {
  if (!store.getState().auth.isAuthenticated) {
    return
  }

  const now = Date.now()

  if (now - lastEnsuredAt < ENSURE_TTL_MS) {
    return
  }

  if (ensureInFlight) {
    await ensureInFlight
    return
  }

  ensureInFlight = (async () => {
    try {
      await userService.getMe()
      lastEnsuredAt = Date.now()
    } catch {
      // Session may have ended; callers still load the public payload.
    } finally {
      ensureInFlight = null
    }
  })()

  await ensureInFlight
}

export const authService = {
  login: async (credentials: LoginRequest) => {
    return await apiClient<UserResponseDto>('/Authentication/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  register: async (userData: RegisterUserRequest) => {
    return await apiClient<CreatedUserResponseDto>('/Authentication/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  forgotPassword: async (request: ForgotPasswordRequest) => {
    return await apiClient<null>('/Authentication/forgot-password', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },

  resetPassword: async (request: ResetPasswordRequest) => {
    return await apiClient<null>('/Authentication/reset-password', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },

  checkAuth: async () => {
    return await userService.getMe()
  },

  ensureViewerSession,

  logout: () => {
    handleLogout()
  },
}
