import { QueryCache, QueryClient } from "react-query"

const queryCache = new QueryCache({})

const queryClient = new QueryClient({
	queryCache,
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
			getNextPageParam: (lastPage: any) => lastPage.next ?? false,
			getPreviousPageParam: (firstPage: any) => firstPage.previous ?? false,
		},
	},
})

export default queryClient
