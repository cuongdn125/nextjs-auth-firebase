import { Box } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  getCatergory,
  getListProduct,
  getProductByCategory,
  Product,
} from "../../api_client/productApi";
import MainLayout from "../../components/layouts/main";
import ListProduct from "../../components/ListProduct";
import Loading from "../../components/Loading";

export default function Category(props: { products: Array<Product> }) {
  const products = props.products;
  const router = useRouter();
  const categoryName = router.query.categoryName as string;
  if (router.isFallback) {
    return <Loading />;
  }
  return (
    <Box w={"100%"} p={4} bg="gray.50">
      <Box
        fontSize={{
          base: "1.4rem",
          md: "1.6rem",
        }}
        fontWeight="bold"
        mb={2}
      >
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </Box>
      <Box>
        <ListProduct products={products} />
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  const categories = await getCatergory();
  const paths = categories.map((category) => ({
    params: { categoryName: category },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const categoryName = context.params.categoryName as string;

  const products = await getProductByCategory(categoryName);
  return {
    props: {
      products,
    },
    revalidate: 30,
  };
}

Category.Layout = MainLayout;
