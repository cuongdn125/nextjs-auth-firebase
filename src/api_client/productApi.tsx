import axiosClient from "./apiClient";

export interface Product {
  category: string;
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    count: number | 0;
    rate: number | 0;
  };
}

export interface AddProduct {
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

export const getListProduct = async (): Promise<Array<Product>> => {
  const response: Array<Product> = await axiosClient.get("/");

  return response;
};

export const getProduct = async (productId: string): Promise<Product> => {
  const response: Product = await axiosClient.get(`/${productId}`);
  return response;
};

export const addProduct = async (product: AddProduct): Promise<Product> => {
  const response: Product = await axiosClient.post("/", product);
  return response;
};

export const getCatergory = async (): Promise<Array<string>> => {
  const response: Array<string> = await axiosClient.get("/categories");
  // console.log(response);
  return response;
};

export const getProductByCategory = async (
  category: string
): Promise<Array<Product>> => {
  const response: Array<Product> = await axiosClient.get(
    `/category/${category}`
  );
  return response;
};
