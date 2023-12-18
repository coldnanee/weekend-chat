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
		formState: { errors },
		watch
	} = useFormContext<TSettingsForm>();

	const { profile } = useProfileStore();

	const error = errors[name];

	const inputValue = watch(name);

	return (
		<div className={cl.root}>
			<input
				className={cl.root__input}
				type={type}
				required={required}
				{...register(name, validation)}
				autoComplete="false"
				defaultValue={name === "login" ? profile?.login : ""}
				id={`#${name}`}
			/>
			{error && <p className={cl.root__error}>{error.message}</p>}
			<label
				className={
					inputValue
						? [cl.root__label, cl.root__label_hidden].join(" ")
						: cl.root__label
				}
				htmlFor={`#${name}`}>
				{name}
			</label>
		</div>
	);
};
