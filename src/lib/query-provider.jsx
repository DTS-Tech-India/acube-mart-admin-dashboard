"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react"

export default function Providers({ children }) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 30,
                    refetchInterval: 1000 * 30,
                    retryOnMount: true,
                    refetchOnReconnect: true,
            },
        },
        })
    )
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}