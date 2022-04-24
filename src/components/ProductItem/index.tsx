import { Box, Center, Flex, Image, Spacer } from "@chakra-ui/react";
import React from "react";
import { Product } from "../../api_client/productApi";
import StarRatings from "react-star-ratings";
import Loading from "../Loading";

const ProductItem = (props: { product: Product }) => {
  const product = props.product;
  if (!product) return <Loading />;
  return (
    <Box
      w={"100%"}
      boxShadow="md"
      rounded="lg"
      bg="white"
      pt={1}
      position="relative"
      _hover={{
        cursor: "pointer",
        "& .bg-image": {
          opacity: 0.4,
        },
        "& .info_product": {
          bg: "gray.100",
        },
      }}
    >
      <Flex
        position="absolute"
        rounded="lg"
        justify="center"
        bgGradient="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))"
        top={"0"}
        left={"0"}
        right={"0"}
        bottom={"0"}
        // display="none"
        opacity={0}
        className="bg-image"
        transition="all 0.3s ease-in-out"
      ></Flex>
      <Center h={"280px"}>
        <Image
          src={product.image}
          h={"100%"}
          objectFit="contain"
          alt="product item"
        />
      </Center>
      <Box p={6} className="info_product">
        <Box display="flex" justifyContent="space-between">
          <Box fontSize={"0.8rem"}>
            <Box>{product.rating.count} reviews</Box>
            <Flex flexDirection="column">
              <StarRatings
                rating={product.rating.rate}
                starDimension="12px"
                starSpacing="1px"
                starRatedColor="#ffc107"
                numberOfStars={5}
              />
            </Flex>
          </Box>
          <Center
            fontSize={{
              base: "0.9rem",
              lg: "1.4rem",
            }}
            fontWeight={500}
          >
            ${product.price}
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
