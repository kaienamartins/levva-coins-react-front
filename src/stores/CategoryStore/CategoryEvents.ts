import { createEvent } from "effector";

import { RequestError } from "../../domains/requestError";
import { CategoryValues } from "../../domains/category";

export const loadCategory = createEvent("loadCategory");
export const loadCreateCategoryDone = createEvent("loadCreateCategoryDone");
export const loadCategoryDone =
  createEvent<CategoryValues[]>("loadCategoryDone");
export const loadCategoryFail = createEvent<RequestError>("loadCategoryFail");
