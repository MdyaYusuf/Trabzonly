import { toast } from "react-toastify";
import type { ApiResponse } from "../types/ApiResponse";
import { store } from "../store/store";
import { logoutUser } from "../../features/auth/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const SESSION_EXPIRED_MESSAGE = "Oturum süresi doldu.";

let refreshPromise: Promise<boolean> | null = null;

function isPublicAuthPath(pathname: string = window.location.pathname): boolean {
  return (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/sifremi-unuttum" ||
    pathname === "/sifre-sifirla" ||
    pathname === "/eposta-dogrula"
  );
}

export type ApiClientOptions = RequestInit & {
  /** Skip success toast for mutating requests (errors still toast). */
  silentSuccess?: boolean;
  /** Skip 404 warning toast when the caller shows its own not-found UI. */
  silentNotFound?: boolean;
};

function isApiResponse<T>(error: unknown): error is ApiResponse<T> {
  return (
    error !== null &&
    typeof error === 'object' &&
    'success' in error &&
    'statusCode' in error
  )
}

/** Like apiClient, but returns failed ApiResponse instead of throwing. */
export const apiClientResult = async <T>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<ApiResponse<T>> => {
  try {
    return await apiClient<T>(endpoint, options)
  } catch (error: unknown) {
    if (isApiResponse<T>(error)) {
      return error
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'İstek başarısız.',
      data: null,
      statusCode: 0,
    }
  }
}

export const apiClient = async <T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<ApiResponse<T>> => {
  const { silentSuccess = false, silentNotFound = false, ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers);

  if (!headers.has("Content-Type") && !(requestOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("X-Client-Platform")) {
    headers.set("X-Client-Platform", "web");
  }

  const config: RequestInit = {
    ...requestOptions,
    headers,
    credentials: "include",
  };

  try {
    let response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401 && !endpoint.includes("/authentication/refresh-token")) {
      if (!refreshPromise) {
        refreshPromise = processRefreshToken();
      }

      const refreshSuccess = await refreshPromise;

      if (refreshSuccess) {
        response = await fetch(`${BASE_URL}${endpoint}`, config);
      } else {
        const wasAuthenticated = store.getState().auth.isAuthenticated;

        if (wasAuthenticated) {
          handleLogout();
        }

        throw new Error(SESSION_EXPIRED_MESSAGE);
      }
    }

    const responseText = await response.text();
    let result: ApiResponse<T>;

    try {
      result = responseText
        ? JSON.parse(responseText)
        : {
            success: response.ok,
            message: response.ok ? "" : "Sunucudan içerik dönmedi.",
            data: null as T,
            statusCode: response.status,
          };
    } catch {
      result = {
        success: false,
        message: "Sunucu yanıtı okunamadı (Geçersiz format).",
        data: null as T,
        statusCode: response.status,
      };
    }

    if (!response.ok) {
      const skipToast = silentNotFound && response.status === 404

      if (!skipToast) {
        handleApiError(result)
      }

      throw result
    }

    if (
      !silentSuccess &&
      requestOptions.method &&
      requestOptions.method !== "GET" &&
      result.message
    ) {
      toast.success(result.message);
    }

    return result;
  } catch (error: unknown) {
    if (isApiResponse<T>(error)) {
      if (!error.success) {
        throw error
      }
    }

    if (error instanceof Error && error.message === SESSION_EXPIRED_MESSAGE) {
      throw error;
    }

    const errorMessage = error instanceof Error ? error.message : "Sunucuya bağlanılamadı.";
    toast.error(errorMessage);
    throw error;
  }
};

const processRefreshToken = async (): Promise<boolean> => {
  try {
    const refreshResponse = await fetch(`${BASE_URL}/authentication/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Client-Platform": "web",
      },
    });

    return refreshResponse.ok;
  } catch {
    return false;
  } finally {
    refreshPromise = null;
  }
};

export const handleLogout = () => {
  store.dispatch(logoutUser());

  fetch(`${BASE_URL}/authentication/revoke-refresh-token`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-Client-Platform": "web",
    },
  }).finally(() => {
    if (!isPublicAuthPath()) {
      window.location.href = "/login";
    }
  });
};

const handleApiError = (errorResponse: ApiResponse<unknown>) => {
  const { statusCode, message, errors } = errorResponse;

  switch (statusCode) {
    case 401:
      break;
    case 403:
      toast.error("Bu işlem için yetkiniz bulunmamaktadır.");
      break;
    case 400:
      if (errors && errors.length > 0) {
        errors.forEach((err) => toast.error(err));
      } else {
        toast.error(message || "Hatalı istek.");
      }
      break;
    case 404:
      toast.warning(message || "Kayıt bulunamadı.");
      break;
    case 500:
      toast.error("Sunucu tarafında bir hata oluştu.");
      break;
    default:
      toast.error(message || "Bir hata oluştu.");
      break;
  }
};
