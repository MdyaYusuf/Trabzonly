import { apiClient, handleLogout } from '../../core/api/apiClient'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterUserRequest,
  ResetPasswordRequest,
} from './authTypes'
import type { UserResponseDto, CreatedUserResponseDto } from '../users/userTypes'
import userService from '../users/userService'

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

  logout: () => {
    handleLogout()
  },
}
