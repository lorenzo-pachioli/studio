
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import UserProvider from "@/hooks/user-state";
import ProductsProvider from "@/hooks/products-state";
import ServicesProvider from "@/hooks/services-state";
import ShopingCartProvider from "@/hooks/shopingCart-state";
import PromotionsProvider from "@/hooks/promotions-state";
import { decrypt, verifySession } from "@/services/statelessSession";

export const metadata: Metadata = {
  title: "PawsomeMart - Your Pet Store",
  description: "All your pet needs in one place!",
  icons: {
    icon: "/favicon.ico", // Assuming a favicon might be added later
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const cookie = (await verifySession()).cookie;
  const session = await decrypt(cookie);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <UserProvider session={session ? session : { uid: '', expiresAt: new Date(), token: '' }}>
          <ProductsProvider>
            <ServicesProvider>
              <PromotionsProvider>
                <ShopingCartProvider>
                  <Header />
                  <main className="flex-grow container mx-auto px-4 py-8">
                    {children}
                  </main>
                  <Footer />
                  <Toaster />
                </ShopingCartProvider>
              </PromotionsProvider>
            </ServicesProvider>
          </ProductsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
