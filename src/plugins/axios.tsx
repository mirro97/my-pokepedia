import axios from "axios";

// const BASE_URL

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
