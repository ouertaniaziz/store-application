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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { addData, addDataWithCustomizedId } from "../../service/service";
export default function SignupCard() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    role: "",
    email: "",
    password: "",
  };

  const [inputForm, setInputForm] = useState(initialState);

  const setForm = (e) => {
    e.preventDefault();
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
    console.log(inputForm, "this is my name input");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, inputForm.email, inputForm.password)
      .then((result) => {
        // addData(inputForm, "user");
        const userInfo = {
          firstName: inputForm.firstName,
          lastName: inputForm.lastName,
          phoneNumber: inputForm.phoneNumber,
          birthDate: inputForm.birthDate,
          role: inputForm.role,
        };
        addDataWithCustomizedId(result.user.uid, userInfo);
        sendEmailVerification(auth.currentUser);

        navigate("/mail-verif");
      })
      .catch((error) => console.log(error));
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
            Sign up
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
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    type="text"
                    onChange={(e) => setForm(e)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    type="text"
                    onChange={(e) => setForm(e)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="phoneNumber" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phoneNumber"
                    type="number"
                    onChange={(e) => setForm(e)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="birthDate">
                  <FormLabel>Date of birth</FormLabel>
                  <Input
                    name="birthDate"
                    type="Date"
                    onChange={(e) => setForm(e)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="role" isRequired>
              <Box>
                <FormLabel>User Role</FormLabel>
                <Select
                  name="role"
                  placeholder="Select option"
                  onChange={(e) => setForm(e)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Client">Client</option>
                  <option value="Seller">Seller</option>
                </Select>
              </Box>
            </FormControl>
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
                onClick={(e) => handleSubmit(e)}
              >
                Sign up
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
