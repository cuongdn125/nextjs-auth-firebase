import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Sidebar from "../Sidebar";

const MainLayout = ({ children }) => {
  const router = useRouter();
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [router, accessToken]);

  if (!accessToken) {
    return null;
  }

  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
};

export default MainLayout;
