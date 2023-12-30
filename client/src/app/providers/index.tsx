"use client";

import type { ReactNode } from "react";

import { Alert } from "@/features/alert";
import { I18nProvider } from "@/features/i18n";
import { ChatsProvider } from "@/entities/chat";

import { ProfileProvider } from "@/entities/profile";
import { ProfileSettingsProvider } from "@/entities/settings";
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
