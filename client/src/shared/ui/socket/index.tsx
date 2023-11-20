"use client";

import { useEffect } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { useSocket } from "@/shared";

import type { ReactNode } from "react";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { profile } = useAppSelector((state) => state.profile);

	const { socket } = useSocket();

	useEffect(() => {
		if (profile) {
			console.log(profile);
			socket.connect();
		}
	}, [profile]);

	socket.on("new-online-user", (data) => {
		console.log(data);
	});

	useEffect(() => {
		if (profile && profile._id !== "655bafaf2ad9164eaeab8017") {
			socket.emit("send-message", {
				recipientId: "655bafaf2ad9164eaeab8017",
				message: "Привет, пользователь!"
			});
		}
	}, [profile]);

	socket.on("get-message", (data: { user: string; message: string }) => {
		console.log(data);
	});

	return <>{children}</>;
};
