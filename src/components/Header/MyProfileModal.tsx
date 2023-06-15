import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignOutButton, UserAvatar } from "./styles";

import { Modal } from "../Modal";
import { Form, FormButton, FormError, FormInput } from "../../styles/global";
import { useRef, useState } from "react";
import { router } from "../../Router";
import { LoginValues } from "../../domains/login";
import UpdateProfileUseCase from "../../useCases/UpdateProfileUseCase/UpdateProfileUseCase";
import { useStore } from "effector-react";
import ProfileStore from "../../stores/ProfileStore/ProfileStore";

interface FormProps {
  name: string;
}

const formSchema = yup
  .object({
    name: yup.string().required("O nome é obrigatório."),
  })
  .required();

export function MyProfileModal() {
  const [user, setUser] = useState<LoginValues | null>(() => {
    const storageUser = JSON.parse(window.localStorage.getItem("user") ?? "{}") as LoginValues;

    if (!storageUser) return null;

    return storageUser;
  });

  const closeModalRef = useRef<HTMLButtonElement>(null);

  const { isLoading, hasError, errorMessage } = useStore(ProfileStore);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
  });

  async function handleUpdateProfile({ name }: FormProps) {
    if (user?.id)
      UpdateProfileUseCase.execute({ id: user.id, name }).then(() =>
        closeModalRef.current?.click()
      );

    setUser(
      (oldUser) =>
        ({
          ...oldUser,
          name: name,
        } as LoginValues)
    );
  }

  function handleSignOut() {
    window.localStorage.removeItem("user");
    router.navigate("/login");
  }

  return (
    <Modal
      title="Meu perfil"
      closeModalRef={closeModalRef}
      trigger={
        <UserAvatar
          src="https://assets.papelpop.com/wp-content/uploads/2021/10/hayden-christensen.jpg"
          alt={user?.name}
        />
      }
    >
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <UserAvatar
          src="https://assets.papelpop.com/wp-content/uploads/2021/10/hayden-christensen.jpg"
          alt={user?.name}
          variant="large"
        />

        <FormInput {...register("name")} type="name" defaultValue={user?.name} />

        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormInput type="email" placeholder={user?.email} disabled />

        {hasError && <FormError>{errorMessage}</FormError>}

        <FormButton type="submit">{isLoading ? "Carregando..." : "Atualizar"}</FormButton>
        
        <SignOutButton type="button" onClick={handleSignOut}>
          Sair
        </SignOutButton>
      </Form>
    </Modal>
  );
}
