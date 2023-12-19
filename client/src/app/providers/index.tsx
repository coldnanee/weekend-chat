"use client";

import type { ReactNode } from "react";

import { ChatsProvider } from "@/entities/chat";

import { ProfileProvider } from "@/entities/profile";
import { SocketProvider } from "@/layout"; // eslint-disable-line import/order

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ProfileProvider>
			<SocketProvider>
				<ChatsProvider>{children}</ChatsProvider>
			</SocketProvider>
		</ProfileProvider>
	);
};
