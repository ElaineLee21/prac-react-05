import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const productAxios = {
  getAllProduct: () => api.get("/products"),
};
