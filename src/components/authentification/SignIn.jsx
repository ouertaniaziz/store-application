import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { auth, db } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { getDataWithCustomizedId } from "../../service/service";

export default function SignIn() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const initialState = {
    email: "",
    password: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(" ");

  const setForm = (e) => {
    e.preventDefault();
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
    // console.log(inputForm, "this is my name input");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, inputForm.email, inputForm.password)
      .then((result) => {
        getDataWithCustomizedId(auth.currentUser.uid)
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res));
            console.log(res);
            if (localStorage.getItem("user")) {
              auth.currentUser.emailVerified
                ? navigate(`/${res.role}/${auth.currentUser.uid}`)
                : navigate("/mail-verif");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error.message);
        console.log(errorMessage);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign In
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" type="email" onChange={(e) => setForm(e)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setForm(e)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={(e) => {
                  handleSubmit(e);
                  toast({
                    title: "Error Found",
                    description: errorMessage,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
