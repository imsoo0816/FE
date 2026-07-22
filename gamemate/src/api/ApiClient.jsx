const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL is not configured.");
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const TOKEN_REFRESH_URL = `${API_BASE_URL}/api/auth/token/refresh/`;

let refreshRequest = null;

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const hasAuthTokens = () => Boolean(getAccessToken() || getRefreshToken());

export const saveAuthData = (authData = {}) => {
  if (authData.access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, authData.access);
  }

  if (authData.refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, authData.refresh);
  }

  if (authData.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
  }
};

export const clearAuthData = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("auth:logout"));
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearAuthData();
    throw new Error("Login is required.");
  }

  if (!refreshRequest) {
    refreshRequest = fetch(TOKEN_REFRESH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          clearAuthData();
          throw new Error("Login has expired.");
        }

        const authData = await response.json();

        if (!authData.access) {
          clearAuthData();
          throw new Error("Login has expired.");
        }

        saveAuthData(authData);

        return authData.access;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

const withAuthHeader = (options = {}, accessToken) => {
  const headers = new Headers(options.headers || {});

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return {
    ...options,
    headers,
  };
};

export const authFetch = async (url, options = {}, { requireAuth = true } = {}) => {
  let accessToken = getAccessToken();

  if (requireAuth && !accessToken) {
    accessToken = await refreshAccessToken();
  }

  let response = await fetch(url, withAuthHeader(options, accessToken));

  if (response.status !== 401) {
    return response;
  }

 try {
    const refreshedAccessToken = await refreshAccessToken();
    response = await fetch(url, withAuthHeader(options, refreshedAccessToken));
  } catch (error) {
    clearAuthData();
    throw error;
  }

  return response;
};
