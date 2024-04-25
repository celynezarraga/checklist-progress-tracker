import Cookies from "js-cookie";
import { BACKEND_URL } from "./urls";
import { UserVerificationApiResponse } from "@/modules/user/types/user";

export const addToken = (value: string) => {
  // localStorage.setItem("token", value);
  Cookies.set("token", value, { expires: 1 });
};

export const getToken = (): string | undefined => {
  // return localStorage.getItem("token") ?? undefined;
  return Cookies.get("token");
};

export const deleteToken = () => {
  // localStorage.removeItem("token");
  Cookies.remove("token");
};

export const getVerifiedUser = async (token: string): Promise<UserVerificationApiResponse> => {
  const res = await fetch(`${BACKEND_URL}/api/user/verify`, {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({ token })
  });
  const user = await res.json();
  return user;
};