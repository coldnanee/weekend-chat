"use client";

import type { ReactNode } from "react";

import { ChatsProvider } from "@/entities/chat";

import { ProfileProvider } from "@/entities/profile";
import { ProfileSettingsProvider } from "@/entities/settings";
import { Alert } from "@/shared";
import { I18nProvider } from "@/shared";
import { SocketProvider } from "@/shared";

import { SocketHandlers } from "@/shared";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Alert />
			<ProfileProvider>
				<ProfileSettingsProvider>
					<I18nProvider>
						<ChatsProvider>
							<SocketProvider>
								<SocketHandlers />
								{children}
							</SocketProvider>
						</ChatsProvider>
					</I18nProvider>
				</ProfileSettingsProvider>
			</ProfileProvider>
		</>
	);
};
