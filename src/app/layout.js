import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import AntDProvider from "@/components/Shared/AntDProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import SEOHead from "@/components/Shared/Sidebar/SEOHead";
import Head from "next/head";

export const metadata = {
  title: "Viscart",
  description: "Complete E-Commerce Site",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <SEOHead />
      <Head>
        <link
          href="https://fonts.cdnfonts.com/css/amazon-ember"
          rel="stylesheet"
        />
      </Head>
      <GoogleTagManager gtmId="GTM-KWXB5SSR" />
      <body className={`font-amazon`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KWXB5SSR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <AntDProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </AntDProvider>
      </body>
    </html>
  );
};

export default RootLayout;
