import cl from "./index.module.scss";

import type { RegisterOptions } from "react-hook-form";

import type { TSettingsForm, TSettingsFormField } from "../../model/types";

import { useProfileStore } from "@/entities/profile";

import { useFormContext } from "react-hook-form";

export const SettingsInput = ({
	type,
	name,
	validation,
	required
}: {
	type: string;
	name: TSettingsFormField;
	validation: RegisterOptions<TSettingsForm, TSettingsFormField>;
	required: boolean;
}) => {
	const {
		register,
		formState: { errors }
	} = useFormContext<TSettingsForm>();

	const { profile } = useProfileStore();

	const error = errors[name];

	return (
		<div className={cl.root}>
			<input
				className={cl.root__input}
				type={type}
				placeholder={name}
				required={required}
				{...register(name, validation)}
				defaultValue={name === "login" ? profile?.login : ""}
			/>
			{error && <p className={cl.root__error}>{error.message}</p>}
		</div>
	);
};
