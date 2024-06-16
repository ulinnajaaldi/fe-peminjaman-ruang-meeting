"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "../ui/sonner";
import "react-quill/dist/quill.snow.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader showSpinner={false} />

      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default Providers;
