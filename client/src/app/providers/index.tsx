"use client";

import { SocketProvider } from "@/widgets/socket";
import { ProfileProvider } from "@/entities/profile";
import { ChatsProvider } from "@/entities/chat";

import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ProfileProvider>
			<SocketProvider>
				<ChatsProvider>{children}</ChatsProvider>
			</SocketProvider>
		</ProfileProvider>
	);
};
