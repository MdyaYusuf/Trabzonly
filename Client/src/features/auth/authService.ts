import { apiClient, handleLogout } from "../../core/api/apiClient";
import type { LoginRequest, RegisterUserRequest } from "./authTypes";
import type { UserResponseDto, CreatedUserResponseDto } from "../users/userTypes";

export const authService = {
  login: async (credentials: LoginRequest) => {
    return await apiClient<UserResponseDto>("/Authentication/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: RegisterUserRequest) => {
    return await apiClient<CreatedUserResponseDto>("/Authentication/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  checkAuth: async () => {
    return await apiClient<UserResponseDto>("/Authentication/refresh-token", {
      method: "POST",
    });
  },

  logout: () => {
    handleLogout();
  },
};