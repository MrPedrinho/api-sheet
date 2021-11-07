import '../utils/globals.css'
import type { AppProps } from 'next/app'
import {UserProvider} from "@auth0/nextjs-auth0";
import React from "react";
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
    <UserProvider>
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    </UserProvider>
  )
}

export default MyApp