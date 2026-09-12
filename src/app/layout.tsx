import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5th Grade US States Explorer",
  description: "Learn US states shapes, spelling, and geography on an interactive map!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
