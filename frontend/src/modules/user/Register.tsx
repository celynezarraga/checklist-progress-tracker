import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  InputGroup,
  InputRightElement,
  Link,
  Stack
} from "@chakra-ui/react";
import { AppDispatch, RootState } from "@/store/store";
import { registerUser } from "./store/userActions";
import { URLS } from "@/common/utils/urls";
import InputField from "@/common/components/InputField";
import { addToken } from "@/common/utils/session";
import { PASSWORD_HELPER_TEXT, RegisterFormInitialInvalidValues, RegisterFormInitialValues, RegisterFormInvalidValues, RegisterFormValues, getPasswordHelperText, isValidPassword, validateRegisterFormInput } from "./utils/registerForm";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, info, success, error } = useSelector(
    (state: RootState) => state.user
  );

  const [formValues, setFormValues] = useState<RegisterFormValues>(RegisterFormInitialValues);
  const [invalidValues, setInvalidValues] = useState<RegisterFormInvalidValues>(RegisterFormInitialInvalidValues);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isInvalidPassValue, setIsInvalidPassValue] = useState<boolean>(false);
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  useEffect(() => {
    if (!loading && success && info) {
      addToken(info.token);
      router.push(URLS.HOME);
    }
  },[router, info, success, loading]);

  useEffect(() => {
    if (!loading && error) {
      setInvalidValues({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true
      });
      setErrorMessage(error);
    }
  }, [error, loading]);

  useEffect(() => {
    validateRegisterFormInput(
      formValues,
      setInvalidValues,
      setErrorMessage
    );
  }, [formValues]);

  useEffect(() => {
    setIsInvalidPassValue(formValues.password.length > 0 && !isValidPassword(formValues.password));
    setPasswordHelperText(getPasswordHelperText(formValues.password));
  }, [formValues.password]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      dispatch(registerUser(formValues));
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      width={"100wh"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"gray.100"}
    >
      <Stack
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={"2"}
      >
        <Heading color={"teal.400"}>Create a new account</Heading>
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
                  placeholder="First Name"
                  updateValue={(value) => handleInputChange("firstName", value)}
                  value={formValues.firstName}
                  isInvalid={isSubmitted && invalidValues.firstName}
                />
              </FormControl>
              <FormControl>
                <InputField
                  placeholder="Last Name"
                  updateValue={(value) => handleInputChange("lastName", value)}
                  value={formValues.lastName}
                  isInvalid={isSubmitted && invalidValues.lastName}
                />
              </FormControl>
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
                    isInvalid={(isSubmitted || isInvalidPassValue) && invalidValues.password}
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button h={"1.5rem"} size={"sm"} onClick={toggleShowPassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                { isInvalidPassValue && <FormHelperText>{passwordHelperText}</FormHelperText> }
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputField
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    updateValue={(value) => handleInputChange("confirmPassword", value)}
                    value={formValues.confirmPassword ?? ""}
                    isInvalid={isSubmitted && invalidValues.confirmPassword}
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button h={"1.5rem"} size={"sm"} onClick={toggleShowConfirmPassword}>
                      {showConfirmPassword ? "Hide" : "Show"}
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
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already registered?{" "}
        <Link color="teal.500" onClick={() => router.push(URLS.LOGIN)}>
          Log in
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;