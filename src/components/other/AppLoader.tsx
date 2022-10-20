import { Center, Spinner, Stack } from "@chakra-ui/react";
import React from "react";

export default function AppLoader() {
  return (
    <Center h="100vh">
      {/* FIXME: TO USE THEME COLORS*/}
      <Stack alignItems={"center"}>
        <Spinner
          mt={3}
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="lg"
        />
      </Stack>
    </Center>
  );
}
