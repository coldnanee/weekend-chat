import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";

import "./index.scss";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	});

	return (
		<div data-testid="react-query-provider">
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</div>
	);
};
