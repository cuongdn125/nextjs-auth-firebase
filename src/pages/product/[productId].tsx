import { Box, Button, Divider, Flex, Heading, Image } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import {
  getListProduct,
  getProduct,
  Product,
} from "../../api_client/productApi";
import MainLayout from "../../components/layouts/main";
import Loading from "../../components/Loading";

const SpanStyled = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;
const BoxProductDetailInfo = styled(Box)`
  font-size: 16px;
  color: #1a202c;
`;
export default function ProductDetail(props: { product: Product }) {
  const product = props.product;
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }
  return (
    <Box
      p={1}
      mx={{
        base: "10px",
        xl: "80px",
      }}
      pb={8}
    >
      <Flex
        flexDirection={{
          base: "column",
          lg: "row",
        }}
      >
        <Box
          flex={1}
          //   p={3}
          mr={{
            base: "0",
            lg: "30px",
          }}
          display={{
            base: "flex",
            md: "block",
          }}
          justifyContent={"center"}
        >
          <Image
            alt="product"
            w={{
              base: "80%",
              md: "100%",
            }}
            objectFit={"contain"}
            borderRadius={8}
            src={product.image}
          />
        </Box>
        <Box
          flex={1}
          ml={{
            base: "0",
            lg: "30px",
          }}
          mt={{
            base: "20px",
            lg: "0px",
          }}
        >
          <Heading
            fontSize={{
              base: "24px",
              md: "36px",
              lg: "48px",
            }}
            color="#1A202C"
          >
            {product.title}
          </Heading>
          <Box fontSize="24px" mb={2}>
            ${product.price} USD
          </Box>
          <Flex alignItems="center">
            <StarRatings
              rating={product.rating.rate}
              starDimension="1.8rem"
              starSpacing="1px"
              starRatedColor="#ffc107"
              numberOfStars={5}
            />
            <Box fontSize="1.2rem" fontWeight="500" ml={4}>
              {product.rating.count} reviews
            </Box>
          </Flex>

          <Box fontSize="24px" color="#718096" mt={6}>
            <SpanStyled>Category:</SpanStyled> {product.category}
          </Box>
          <Box fontSize="18px" color="#1A202C" mt={4}>
            {product.description}
          </Box>
          <Divider mt={8} />
          <Box w={"100%"} mt={8}>
            <Box fontSize={"18px"} color="#D69E2E" fontWeight="500">
              FEATURES
            </Box>
            <Flex
              w={"100%"}
              mt={3}
              flexDirection={{
                base: "column",
                sm: "row",
              }}
            >
              <Box flex={1}>
                <Box>Chronograph</Box>
                <Box mt={2}>Master Chronometer Certified</Box>
                <Box mt={2}>Tachymeter</Box>
              </Box>
              <Box
                flex={1}
                mt={{
                  base: "30px",
                  sm: "0",
                }}
              >
                <Box>Anti-magnetic</Box>
                <Box mt={2}>Chronometer</Box>
                <Box mt={2}>Small seconds</Box>
              </Box>
            </Flex>
          </Box>
          <Divider mt={8} />
          <Box w={"100%"} mt={8}>
            <Box fontSize={"18px"} color="#D69E2E" fontWeight="500">
              PRODUCT DETAILS
            </Box>
            <BoxProductDetailInfo mt={4}>
              <SpanStyled>Between lugs:</SpanStyled>
              20 mm
            </BoxProductDetailInfo>
            <BoxProductDetailInfo mt={1}>
              <SpanStyled>Bracelet:</SpanStyled>
              leather strap
            </BoxProductDetailInfo>
            <BoxProductDetailInfo mt={1}>
              <SpanStyled>Case:</SpanStyled>
              Steel
            </BoxProductDetailInfo>
            <BoxProductDetailInfo mt={1}>
              <SpanStyled>Case diameter:</SpanStyled>
              42 mm
            </BoxProductDetailInfo>
            <BoxProductDetailInfo mt={1}>
              <SpanStyled>Dial color:</SpanStyled>
              Black
            </BoxProductDetailInfo>
            <BoxProductDetailInfo mt={1}>
              <SpanStyled>Crystal:</SpanStyled>
              Domed, scratch-resistant sapphire crystal with anti-reflective
              treatment inside
            </BoxProductDetailInfo>
            <BoxProductDetailInfo mt={1}>
              <SpanStyled>Water resistance:</SpanStyled>5 bar (50 metres / 167
              feet)
            </BoxProductDetailInfo>
            <Box w={"100%"} mt={8}>
              <Button w={"100%"} textTransform="uppercase" colorScheme="teal">
                Add to cart
              </Button>
              <Box w={"100%"} mt={4} textAlign="center">
                2-3 business days delivery
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export async function getStaticPaths() {
  const products = await getListProduct();
  const paths = products.map((product) => ({
    params: { productId: product.id.toString() },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const productId = context.params.productId as string;
  const product = await getProduct(productId);
  return {
    props: {
      product,
    },
    revalidate: 30,
  };
}

ProductDetail.Layout = MainLayout;
