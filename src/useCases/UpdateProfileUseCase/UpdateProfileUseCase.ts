import { router } from "../../Router";
import { LoginValues } from "../../domains/login";
import { ProfileParams } from "../../domains/profile";
import { RequestError } from "../../domains/requestError";
import { ProfileService } from "../../services/ProfileService/ProfileService";
import { loadProfile, loadProfileDone, loadProfileFail } from "../../stores/ProfileStore/ProfileEvents";

const execute = async ({ id, name }: ProfileParams): Promise<void> => {
  loadProfile();
  return ProfileService.updateUser({ id, name }).then(() => {
    const user = JSON.parse(window.localStorage.getItem("user") ?? "{}") as LoginValues;

    user.name = name;

    window.localStorage.setItem("user", JSON.stringify(user));

    loadProfileDone();

    router.navigate("/home");
  })
  .catch(({hasError, message}: RequestError) => {
    loadProfileFail({hasError, message});
  });
};

const UpdateProfileUseCase = {
  execute,
};

export default UpdateProfileUseCase;
