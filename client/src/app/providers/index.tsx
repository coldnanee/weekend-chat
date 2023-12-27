"use client";

import type { ReactNode } from "react";

import { Alert } from "@/features/alert";
import { ChatsProvider } from "@/entities/chat";

import { ProfileProvider } from "@/entities/profile";

import { SocketProvider } from "@/shared";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ProfileProvider>
			<SocketProvider>
				<ChatsProvider>
					<Alert />
					{children}
				</ChatsProvider>
			</SocketProvider>
		</ProfileProvider>
	);
};
