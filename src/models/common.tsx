import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (page: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface User {
  accessToken: string;
  displayName: string;
  email: string;
  photoURL: string;
}
