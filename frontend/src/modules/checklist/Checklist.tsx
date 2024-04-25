import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { logout } from "../user/store/userSlice";
import { URLS } from "@/common/utils/urls";

const Checklist = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout =  () => {
    dispatch(logout());
    router.push(URLS.LOGIN);
  };

  return (
    <div>
      {/* // checklist here */}

      <Button
        borderRadius={0}
        variant={"solid"}
        colorScheme={"teal"}
        width={"24"}
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </div>
  );
};

export default Checklist;