import { CategoryService } from "../../services/CategoryService/CategoryService";

import {
  loadCategory,
  loadCategoryDone,
  loadCategoryFail,
} from "../../stores/CategoryStore/CategoryEvents";

import { RequestError } from "../../domains/requestError";
import { CategoryValues } from "../../domains/category";

const execute = async (): Promise<void> => {
  const errorCallback = ({ hasError, message }: RequestError) => {
    loadCategoryFail({ hasError, message });
  };

  loadCategory();

  return CategoryService.getCategories()
    .then((categories: CategoryValues[]) => {
      loadCategoryDone(categories);
    })
    .catch(errorCallback);
};

const GetCategoriesUseCase = {
  execute,
};

export default GetCategoriesUseCase;
