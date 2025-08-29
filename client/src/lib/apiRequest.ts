import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiRequest: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

let accessToken: string | null = null;
let isRefreshing: boolean = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (token) {
    apiRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiRequest.defaults.headers.common["Authorization"];
  }
};

apiRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

const fetchNewAccessToken = async () => {
  const { data } = await apiRequest.post("/auth/refresh");
  return data.accessToken;
};

apiRequest.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as CustomAxiosRequestConfig;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token: string) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(apiRequest(original));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await fetchNewAccessToken();
        setAccessToken(newToken);

        refreshQueue.forEach((p) => p.resolve(newToken));
        refreshQueue = [];
        isRefreshing = false;

        original.headers.Authorization = `Bearer ${newToken}`;
        return apiRequest(original);
      } catch (error) {
        refreshQueue.forEach((p) => p.reject(error));
        refreshQueue = [];
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiRequest;
