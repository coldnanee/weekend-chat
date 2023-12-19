import { Titillium_Web } from "next/font/google";

import type { ReactNode } from "react";

import { Providers } from "@/app/providers";

import { createMetadata } from "@/shared";

import "@/app/styles/index.scss";

export const metadata = createMetadata("Weekend-Chat", "Weekend Project");

const inter = Titillium_Web({
	subsets: ["latin"],
	weight: ["400", "600", "700", "900"]
});

export default async function RootLayout({
	children
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<link
					rel="icon"
					href="/icon.ico"
				/>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
