import React from "react";
import Header from "@/components/header/Header";

export default async function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <>
        <Header/>
        {children}
      </>
  );
}