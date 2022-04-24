import { Box, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Product } from "../../api_client/productApi";
import ProductItem from "../ProductItem";

const ListProduct = (props: { products: Array<Product> }) => {
  const products = props.products;

  return (
    <Box>
      <SimpleGrid spacing={4} columns={{ base: 1, sm: 2, md: 3, xl: 4 }}>
        {products.map((product) => (
          <Link href={`/product/${product.id.toString()}`} key={product.id}>
            <a>
              <ProductItem product={product} />
            </a>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ListProduct;
