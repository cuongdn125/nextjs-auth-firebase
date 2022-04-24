import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getListProduct, Product } from "../api_client/productApi";
import MainLayout from "../components/layouts/main";
import ListProduct from "../components/ListProduct";
import Loading from "../components/Loading";
import { NextPageWithLayout } from "../models/common";

const Index: NextPageWithLayout = () => {
  const { data, isLoading, isError, error } = useQuery(
    "products",
    () => getListProduct(),
    {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <Box w={"100%"} p={4} bg="gray.50">
      <ListProduct products={data || []} />
    </Box>
  );
};

Index.Layout = MainLayout;

export async function getStaticProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("products", () => getListProduct(), {
    staleTime: 1000 * 30,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Index;
