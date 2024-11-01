import { ILoginErrors, ILoginProps } from "@/interfaces/ILogin";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/IRegister";

export function validateLoginForm(values: ILoginProps) {
  const errors: ILoginErrors = {};

  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email es not valid";
  }
  return errors;
}

export function validateRegisterForm(values: IRegisterProps) {
  const errors: IRegisterErrors = {};

  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email es not valid";
  }
  return errors;
}
