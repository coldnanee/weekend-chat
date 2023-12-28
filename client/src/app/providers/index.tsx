"use client";

import type { ReactNode } from "react";

import { Alert } from "@/features/alert";
import { I18nProvider } from "@/features/i18n";
import { ChatsProvider } from "@/entities/chat";

import { ProfileProvider } from "@/entities/profile";
import { ProfileSettingsProvider } from "@/entities/settings";
import { SocketProvider } from "@/shared";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ProfileProvider>
			<ProfileSettingsProvider>
				<I18nProvider>
					<SocketProvider>
						<ChatsProvider>
							<Alert />
							{children}
						</ChatsProvider>
					</SocketProvider>
				</I18nProvider>
			</ProfileSettingsProvider>
		</ProfileProvider>
	);
};
