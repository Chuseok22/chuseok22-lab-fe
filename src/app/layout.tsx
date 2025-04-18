import React from 'react';
import './globals.css'
import Header from "@/components/header/Header";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: 'Chuseok22 Lab',
  description: 'Chuseok22 Lab',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="ko">
      <body className="flex flex-col w-full max-w-screen mx-auto">
      <Header/>
      <main className="grow">
        {children}
        <ToastContainer position="top-right"
                        autoClose={3000}
                        theme="light"
        />
      </main>
      </body>
      </html>
  );
}
