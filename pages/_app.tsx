import React from "react";
import { Provider } from "next-auth/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Header } from "../components/shared/Header";
import { InvoiceProvider } from "../lib/context/InvoiceContext";
import { ScreenProvider } from "../lib/context/ScreenContext";
import { ThemeProvider } from "../lib/context/ThemeContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider>
        <ScreenProvider>
          <InvoiceProvider>
            <Header />
            <Component {...pageProps} />
          </InvoiceProvider>
        </ScreenProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
