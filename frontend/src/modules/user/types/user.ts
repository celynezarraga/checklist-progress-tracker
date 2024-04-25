export type User = {
  id?: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
};

export type UserRegisterRequest = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
};

export type UserApiResponse = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  token: string,
};

export type UserLoginRequest = {
  email: string,
  password: string,
};