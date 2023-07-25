import React, { ReactNode } from "react";
import { QueryClientProvider as ReactQueryClientProvider } from "react-query";
import queryClient from "../client";

interface QueryClientProviderProps {
  children: ReactNode;
}

const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children,
}) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
