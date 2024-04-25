import { EMAIL_REGEX } from "@/common/utils/strings";

export interface LoginFormValues {
  email: string;
  password: string;
};

export const LoginFormInitialValues: LoginFormValues = {
  email: "",
  password: ""
};

export interface LoginFormInvalidValues {
  email: boolean;
  password: boolean;
};

export const LoginFormInitialInvalidValues: LoginFormInvalidValues = {
  email: false,
  password: false
};

export const validateLoginFormInput = (
  values: LoginFormValues,
  setInvalidValues: (invalidValues: LoginFormInvalidValues) => void,
  setErrorMessage: (error: string) => void,
) => {
  const { email, password } = values;
  const validEmail = EMAIL_REGEX.test(email);
  setInvalidValues({
    email: !validEmail || !(email.length > 0),
    password: !(password.length > 0),
  });
  setErrorMessage(validEmail ? "" : "Invalid email");
};