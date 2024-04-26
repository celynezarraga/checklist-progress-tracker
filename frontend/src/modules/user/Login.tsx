import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Stack
} from "@chakra-ui/react";
import { URLS } from "@/common/utils/urls";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "./store/userActions";
import InputField from "@/common/components/InputField";
import { addToken } from "@/common/utils/session";
import { LoginFormInitialInvalidValues, LoginFormInitialValues, LoginFormInvalidValues, LoginFormValues, validateLoginFormInput } from "./utils/loginForm";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, info, success, error } = useSelector(
    (state: RootState) => state.user
  );

  const [formValues, setFormValues] = useState<LoginFormValues>(LoginFormInitialValues);
  const [invalidValues, setInvalidValues] = useState<LoginFormInvalidValues>(LoginFormInitialInvalidValues);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && success && info) {
      addToken(info.token);
      router.push(URLS.HOME);
    }
  },[router, info, success, loading]);

  useEffect(() => {
    if (!loading && error) {
      setInvalidValues({
        email: true,
        password: true
      });
      setErrorMessage(error);
    }
  }, [error, loading]);

  useEffect(() => {
    validateLoginFormInput(
      formValues,
      setInvalidValues,
      setErrorMessage
    );
  }, [formValues]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value
    });
    setIsSubmitted(false);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.values(invalidValues).every(item => !item)) {
      dispatch(loginUser(formValues));
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      width={"100wh"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      background={"gray.100"}
    >
      <Stack
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={"2"}
      >
        <Heading color={"teal.400"}>Log In</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputField
                  type="email"
                  placeholder="Email Address"
                  updateValue={(value) => handleInputChange("email", value)}
                  value={formValues.email}
                  isInvalid={isSubmitted && invalidValues.email}
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    updateValue={(value) => handleInputChange("password", value)}
                    value={formValues.password}
                    isInvalid={isSubmitted && invalidValues.password}
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button h={"1.5rem"} size={"sm"} onClick={toggleShowPassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {
                isSubmitted && errorMessage.length > 0 &&
                <FormControl
                  isInvalid={Object.values(invalidValues).some(item => item)}
                >
                  <FormErrorMessage>{errorMessage}</FormErrorMessage>
                </FormControl> 
              }
              <Button
                borderRadius={0}
                type={"submit"}
                variant={"solid"}
                colorScheme={"teal"}
                width={"full"}
              >
                { loading ? <Spinner colorScheme="teal"/> : "Login" }
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Not yet registered?{" "}
        <Link color="teal.500" onClick={() => router.push(URLS.REGISTER)}>
          Create an account
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;