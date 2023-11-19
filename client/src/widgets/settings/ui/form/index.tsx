import cl from "./index.module.scss";

import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import type { TSettingsForm } from "../../model/types";

import { SettingsButtons } from "../buttons";

import { SettingsWrapper } from "../wrapper";
import { SettingsSwitch } from "../switch";

import { goBackFromSettings } from "../../lib/goBackFromSettings";

import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { updateMyProfile } from "@/entities/profile";

import { convertToBase64 } from "../../lib/convertToBase64";

import { SettingsContextProvider } from "../chapter-provider";

export const SettingsForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { handleSubmit } = useFormContext<TSettingsForm>();

	const onSubmit = async (data: TSettingsForm) => {
		const avatar = data.avatar
			? data.avatar.length > 0
				? await convertToBase64(data.avatar[0])
				: ""
			: "null";
		dispatch(updateMyProfile({ user: { ...data, avatar } }));
	};

	return (
		<SettingsContextProvider>
			<div
				onClick={() => goBackFromSettings(router)}
				className={cl.root}>
				<div
					onClick={(e) => e.stopPropagation()}
					className={cl.root__wrapper}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={cl.root__body}>
						<SettingsSwitch />
						<SettingsWrapper />
						<SettingsButtons />
					</form>
				</div>
			</div>
		</SettingsContextProvider>
	);
};
