import { CategoryService } from "../../services/CategoryService/CategoryService";

import {
  loadCategory,
  loadCreateCategoryDone,
  loadCategoryFail,
} from "../../stores/CategoryStore/CategoryEvents";

import { NewCategoryParams } from "../../domains/category";
import { RequestError } from "../../domains/requestError";

const execute = async ({ description }: NewCategoryParams): Promise<void> => {
  const errorCallback = ({ hasError, message }: RequestError) => {
    loadCategoryFail({ hasError, message });
    throw new Error();
  };

  loadCategory();

  return CategoryService.createCategory({
    description,
  })
    .then(() => {
      loadCreateCategoryDone();
    })
    .catch(errorCallback);
};

const NewCategoryUseCase = {
  execute,
};

export default NewCategoryUseCase;
