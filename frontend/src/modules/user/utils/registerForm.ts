import { EMAIL_REGEX, LOWERCASE_REGEX, NUMERIC_REGEX, PASSWORD_REGEX, SPECIAL_CHARACTER_REGEX, UPPERCASE_REGEX } from "@/common/utils/strings";

export const PASSWORD_HELPER_TEXT = "Must be at least 8 characters";
export const PASSWORD_HELPER_TEXT_2 = "with lower case, upper case, number and special character (#?!@$%^&*-)";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export const RegisterFormInitialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export interface RegisterFormInvalidValues {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

export const RegisterFormInitialInvalidValues: RegisterFormInvalidValues = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false
};

export const validateRegisterFormInput = (
  values: RegisterFormValues,
  setInvalidValues: (invalidValues: RegisterFormInvalidValues) => void,
  setErrorMessage: (error: string) => void,
) => {
  const { firstName, lastName, email, password, confirmPassword = "" } = values;
  const validEmail = EMAIL_REGEX.test(email);
  const passwordsMatch = (password.length > 0) && (confirmPassword.length > 0) && (password === confirmPassword);
  setInvalidValues({
    firstName: !(firstName.length > 0),
    lastName: !(lastName.length > 0),
    email: !validEmail || !(email.length > 0),
    password: !(password.length > 0) || !passwordsMatch || !isValidPassword(password),
    confirmPassword: !(confirmPassword.length > 0) && !passwordsMatch || !isValidPassword(confirmPassword),
  });
  setErrorMessage(`
    ${validEmail ? "" : "Invalid email. "}
    ${passwordsMatch ? "" : "Passwords do not match. "}
    ${(isValidPassword(password) && passwordsMatch) ? "" : "Invalid password. "}
  `);
};

export const isValidPassword = (password: string):boolean => {
  return PASSWORD_REGEX.test(password);
};

export const getPasswordHelperText = (password: string):string => {
  if (password.length < 8) {
    return "Must be at least 8 characters";
  }
  if (!UPPERCASE_REGEX.test(password)) {
    return "Must have an upper case letter";
  }
  if (!LOWERCASE_REGEX.test(password)) {
    return "Must have a lower case letter";
  }
  if (!NUMERIC_REGEX.test(password)) {
    return "Must have a number (0-9)";
  }
  if (!SPECIAL_CHARACTER_REGEX.test(password)) {
    return "Must have a special character (#?!@$%^&*-)";
  }
  return "";
};