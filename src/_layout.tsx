import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/shared/layout/Footer";
import { Header } from "@/shared/layout/Header";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <Suspense fallback="잠시만요">
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
