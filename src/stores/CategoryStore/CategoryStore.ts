import { createStore } from "effector";

import {
  loadCategory,
  loadCreateCategoryDone,
  loadCategoryDone,
  loadCategoryFail,
} from "./CategoryEvents";

import { CategoryState } from "./CategoryState";

const initialState: CategoryState = {
  isLoading: false,

  categories: [],

  hasError: false,

  errorMessage: "",
};

const CategoryStore = createStore<CategoryState>(initialState)
  .on(loadCategory, (state) => ({
    ...state,

    isLoading: true,

    hasError: false,

    errorMessage: "",
  }))

  .on(loadCreateCategoryDone, (state, category) => ({
    ...state,

    isLoading: false,

    hasError: false,

    errorMessage: "",

    categories: [category, ...state.categories],
  }))

  .on(loadCategoryDone, (_, data) => ({
    isLoading: false,

    categories: data,

    hasError: false,

    errorMessage: "",
  }))

  .on(loadCategoryFail, (state, data) => ({
    ...state,

    hasError: data.hasError,

    errorMessage: data.message,

    isLoading: false,
  }));

export default CategoryStore;
