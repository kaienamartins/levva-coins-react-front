import { LoginService } from "../../services/LoginService/LoginService";

import { loadLogin, loadLoginDone, loadLoginFail } from "../../stores/LoginStore/LoginEvents";

import { router } from "../../Router";

import { LoginParams, LoginValues } from "../../domains/login";
import { RequestError } from "../../domains/requestError";

const execute = async ({ email, password }: LoginParams): Promise<void> => {
  const errorCallback = ({ hasError, message }: RequestError) => {
    loadLoginFail({ hasError, message });
  };

  loadLogin();

  return LoginService.authenticateUser({ email, password })
    .then((user: LoginValues) => {
      window.localStorage.setItem("user", JSON.stringify(user));

      loadLoginDone(user);

      router.navigate("/home");
    })
    .catch(errorCallback);
};

const LoginUseCase = {
  execute,
};

export default LoginUseCase;
