import { Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataWithCustomizedId } from "../service/service";

export default function LoginSuccess() {
  const { id } = useParams();

  useEffect(() => {
    const data = getDataWithCustomizedId(id)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container mt={6} textAlign={"center"}>
      <Heading>Login Success ! user with ID </Heading>
    </Container>
  );
}
