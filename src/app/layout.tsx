import React from 'react';
import './globals.css'
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: 'Chuseok22 Lab',
  description: 'Chuseok22 Lab',
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="ko">
      <body className="flex flex-col min-h-screen max-w-screen mx-auto">
      {children}
      <ToastContainer position="top-right"
                      autoClose={3000}
                      theme="light"
      />
      </body>
      </html>
  );
}
