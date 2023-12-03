"use client";

import { SocketProvider } from "@/widgets/socket";
import { ProfileProvider } from "@/entities/profile";

import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ProfileProvider>
			<SocketProvider>{children}</SocketProvider>
		</ProfileProvider>
	);
};
