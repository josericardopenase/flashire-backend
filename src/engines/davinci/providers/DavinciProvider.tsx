import React from "react"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import queryClient from "../clients/queryClient"

interface props {
	children: React.ReactNode
}

export default function DavinciProvider({ children }: props) {
	const debug = false

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{debug ? <ReactQueryDevtools /> : null}
		</QueryClientProvider>
	)
}
