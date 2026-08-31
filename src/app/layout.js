
import "./globals.css";

import Header from "@components/Header/header";
import Footer from "@components/Footer/footer";
import StoreProvider from "./storeProvider";

export const metadata = {
  title: "Shoe Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  data-scroll-behavior="smooth">
      <body>
        <StoreProvider>
        <Header />
          {children}
          <Footer/>
          </StoreProvider>
      </body>
    </html>
  );
}
