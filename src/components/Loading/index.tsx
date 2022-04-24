import { Box, Center, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import loading from "../../assets/images/loading.svg";

export default function Loading() {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      h={"100vh"}
      overflowY="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt="-60px"
    >
      <Box>
        <Image src={loading} alt="Loading" />
      </Box>
    </Box>
  );
}
