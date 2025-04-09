import React from 'react';
import './globals.css'

export const metadata = {
  title: 'Chuseok22 Lab',
  description: 'Chuseok22 Lab',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="ko">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Chuseok22 Lab</title>
        </head>
        <body>
        {children}
        </body>
      </html>
  );
}
