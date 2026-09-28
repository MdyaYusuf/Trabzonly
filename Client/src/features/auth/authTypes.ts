// Requests
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterUserRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  token: string
  newPassword: string
  confirmNewPassword: string
}
