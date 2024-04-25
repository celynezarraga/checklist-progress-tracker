import React, { ReactElement, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import NavBar from "./NavBar";
import { logout } from "@/modules/user/store/userSlice";
import { URLS } from "@/common/utils/urls";

const PageComponent = ({ children }: { children: ReactNode }): ReactElement => {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout =  () => {
    dispatch(logout());
    router.push(URLS.LOGIN);
  };

  return (
    <>
      <NavBar userLogout={handleLogout}/>
      <Box p={4}>{ children }</Box>
    </>
  );
};

export default PageComponent;