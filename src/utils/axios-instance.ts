import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('authToken'); // Replace with your token retrieval method

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error('API error:', error.response ? error.response.data : error.message);

        // Handle specific error statuses (optional)
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                console.warn('Unauthorized! Redirecting to login...');
                // Optionally, you can trigger a logout or redirect here
            }
            // Other status handling logic can be added here
        }

        return Promise.reject(error);
    }
);

// Generic methods for API calls
const api = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.get<T>(url, config);
    },

    post: <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.post<T>(url, data, config);
    },

    put: <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.put<T>(url, data, config);
    },

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.delete<T>(url, config);
    },
};

export { api, axiosInstance };

