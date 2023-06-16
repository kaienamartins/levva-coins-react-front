import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { CategoryValues, NewCategoryParams } from "../../domains/category";
import { RequestError } from "../../domains/requestError";

const createCategory = async ({ description }: NewCategoryParams): Promise<CategoryValues> => {
  return Api.post({
    url: "/category",
    body: {
      description,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const getCategories = async (): Promise<CategoryValues[]> => {
  return Api.get({
    url: "/category",
  })
    .then((response) => {
      const categories = response.data;
      return categories.sort((a: any, b: any) => b.id - a.id);
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const CategoryService = {
  createCategory,
  getCategories,
};
