import { Text, Container, Heading } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function SentMailVerification() {
  return (
    <Container mt={6} textAlign={"center"}>
      <Heading>A Mail Verification was sent to your email adress</Heading>
      <Text mt={5}>
        Please verify your email! return to{" "}
        <NavLink to={"/"}>
          <Text fontWeight={"bold"}>Home Page</Text>
        </NavLink>
      </Text>
    </Container>
  );
}
