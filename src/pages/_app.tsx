import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import EmptyLayout from "../components/layouts/empty";
import MainLayout from "../components/layouts/main";
import { AppPropsWithLayout } from "../models/common";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();

  const Layout = Component.Layout || EmptyLayout;

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
