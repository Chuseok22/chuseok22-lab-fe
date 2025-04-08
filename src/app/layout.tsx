import React from 'react';
import './globals.css'

export const metadata = {
  title: 'Home | Next Movies',
  description: 'The best movies on the best framework',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="ko">
        <body>
        {children}
        </body>
      </html>
  );
}
