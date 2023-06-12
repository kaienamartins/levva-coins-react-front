import { createEvent } from "effector";

import { LoginValues } from "../../domains/login";
import { RequestError } from "../../domains/requestError";

export const loadLogin = createEvent("loadLogin");
export const loadLoginDone = createEvent<LoginValues>("loadLoginDone");
export const loadLoginFail = createEvent<RequestError>("loadLoginFail");
