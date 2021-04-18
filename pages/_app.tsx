import React from "react";
import { Header } from "../components/shared/Header";
import { ThemeProvider } from "../lib/context/ThemeContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
