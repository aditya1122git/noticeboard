import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NoticeBoard — Manage Announcements</title>
      </Head>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "toast-custom",
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-text)",
            border: "1px solid var(--glass-border)",
            borderRadius: "0.75rem",
            backdropFilter: "blur(12px)",
          },
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
