import cl from "./index.module.scss";

import type { TSettingsForm, TSettingFormField } from "../../model/types";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { useFormContext } from "react-hook-form";

export const SettingsInput = ({
	type,
	name
}: {
	type: string;
	name: TSettingFormField;
}) => {
	const { register } = useFormContext<TSettingsForm>();

	const { profile } = useAppSelector((store) => store.profile);

	return (
		<input
			className={cl.root}
			type={type}
			placeholder={name}
			{...register(name)}
			defaultValue={name === "login" ? profile?.login : ""}
		/>
	);
};
