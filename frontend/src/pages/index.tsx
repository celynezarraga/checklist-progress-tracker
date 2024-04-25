import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import cookie from "cookie";
import PageComponent from "@/common/components/layout/PageComponent";
import Checklist from "@/modules/checklist/Checklist";
import { UserApiResponse, UserVerificationApiResponse } from "@/modules/user/types/user";
import { AppDispatch, RootState } from "@/store/store";
import { setUser } from "@/modules/user/store/userSlice";
import { getVerifiedUser } from "@/common/utils/session";

type HomepageProps = {
  user: UserApiResponse;
}

const Homepage: NextPage<HomepageProps> = ({ user }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { info } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!info) {
      dispatch(setUser(user));
    }
  }, [dispatch, info, user]);

  return (
    <PageComponent>
      <Checklist />
    </PageComponent>
  );
};

// @ts-ignore
export const getServerSideProps = (async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie);
  const user: UserVerificationApiResponse = await getVerifiedUser(cookies.token);
  return {
    props: {
      user: user.data
    }
  };
});

export default Homepage;