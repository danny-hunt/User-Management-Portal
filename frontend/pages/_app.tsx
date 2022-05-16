import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
