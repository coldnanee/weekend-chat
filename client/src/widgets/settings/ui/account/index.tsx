import cl from "./index.module.scss";

import { SettingsAvatar } from "../avatar";
import { SettingsFieldsList } from "../fields-list";

import type { TSettingsForm } from "../..";
import { useProfileStore } from "@/entities/profile";
import { useFormContext } from "react-hook-form";

import { convertToBase64 } from "../../lib/convertToBase64";
export const SettingsAccount = () => {
	const { updateProfile } = useProfileStore();

	const { handleSubmit } = useFormContext<TSettingsForm>();

	const onSubmit = async (data: TSettingsForm) => {
		const avatar = data.avatar
			? data.avatar.length > 0
				? await convertToBase64(data.avatar[0])
				: ""
			: "null";
		updateProfile({ ...data, avatar });
	};

	return (
		<form
			className={cl.root}
			onSubmit={handleSubmit(onSubmit)}>
			<SettingsAvatar />
			<SettingsFieldsList />
		</form>
	);
};
