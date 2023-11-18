"use client";

import { StoreProvider } from "../store/provider";
import { ProfileProvider } from "@/entities/profile";

import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<StoreProvider>
			<ProfileProvider>{children}</ProfileProvider>
		</StoreProvider>
	);
};
