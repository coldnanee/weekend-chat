"use client";

import { StoreProvider } from "../store/provider";
import { SocketProvider } from "@/widgets/socket";
import { ProfileProvider } from "@/entities/profile";
import { ReactQueryProvider } from "@/shared";

import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ReactQueryProvider>
			<StoreProvider>
				<ProfileProvider>
					<SocketProvider>{children}</SocketProvider>
				</ProfileProvider>
			</StoreProvider>
		</ReactQueryProvider>
	);
};
