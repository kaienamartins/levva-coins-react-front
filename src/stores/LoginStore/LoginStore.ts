import { createStore } from "effector";

import { loadLogin, loadLoginDone, loadLoginFail } from "./LoginEvents";
import { LoginState } from "./LoginState";

const initialState: LoginState = {
  isLoading: false,
  id: "",
  name: "",
  email: "",
  token: "",
  hasError: false,
  errorMessage: "",
};

const LoginStore = createStore<LoginState>(initialState)
  .on(loadLogin, (state) => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadLoginDone, (_, data) => ({
    isLoading: false,
    id: data.id,
    name: data.name,
    email: data.email,
    token: data.token,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadLoginFail, (_, data) => ({
    hasError: true,
    errorMessage: data.message,
    isLoading: false,
    id: "",
    name: "",
    email: "",
    token: "",
  }));

export default LoginStore;
