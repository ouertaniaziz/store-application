import { Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getDataWithCustomizedId } from "../service/service";

export default function LoginSuccess() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container mt={6} textAlign={"center"}>
      <Heading>Welcome {user.firstName + " " + user.lastName} </Heading>
      <Outlet />
    </Container>
  );
}
