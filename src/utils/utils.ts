import axios, { AxiosError } from "axios";

const BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    return (
      (error.response.data as ApiErrorResponse)?.message ||
      `Request failed with status code ${error.response.status}`
    );
  } else if (error.request) {
    console.error("API Request Error:", error.request);
    return "No response received from the server.";
  } else {
    console.error("API Setup Error:", error.message);
    return `An error occurred while setting up the request: ${error.message}`;
  }
};

export { api, handleApiError };
