import "../styles/globals.css";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";

import { initApp } from "@src/services/initApp";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initApp();
  }, [mounted]);

  return <Component {...pageProps} />;
}

export default MyApp;
