import Cookies from "js-cookie";

export const addToken = (value: string) => {
  Cookies.set("token", value, { expires: 1 });
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const deleteToken = () => {
  Cookies.remove("token");
};