import { useFormContext } from "react-hook-form";
import { SettingsAvatar } from "@/features/settings";
import { useProfileStore } from "@/entities/profile";
import type { TSettingsForm } from "@/entities/settings";
import { convertToBase64 } from "../../lib";
import { SettingsSaveButton } from "../button";
import { SettingsFieldsList } from "../fields-list";

import cl from "./index.module.scss";
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
			<div className={cl.root__body}>
				<SettingsAvatar />
				<SettingsFieldsList />
			</div>
			<SettingsSaveButton />
		</form>
	);
};
