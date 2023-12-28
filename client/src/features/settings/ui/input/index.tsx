"use client";

import { useEffect, useRef } from "react";

import type { RegisterOptions } from "react-hook-form";

import { useFormContext } from "react-hook-form";
import { useI18nStore } from "@/features/i18n";
import { useProfileStore } from "@/entities/profile";
import type { TSettingsForm, TSettingsFormField } from "@/entities/settings";

import cl from "./index.module.scss";

export const SettingsInput = ({
	type,
	name,
	validation,
	required,
	label
}: {
	type: string;
	name: TSettingsFormField;
	validation: RegisterOptions<TSettingsForm, TSettingsFormField>;
	required: boolean;
	label: string;
}) => {
	const {
		register,
		formState: { errors },
		watch
	} = useFormContext<TSettingsForm>();

	const { translate } = useI18nStore();

	const { profile } = useProfileStore();

	const error = errors[name];

	const isChanged = useRef<boolean>(false);
	const isMounted = useRef<boolean>(false);

	const inputValue = watch(name);

	const wrapperInputValue = isChanged.current
		? inputValue
		: name !== "password" && profile && profile[name];

	useEffect(() => {
		if (isMounted.current) {
			isChanged.current = true;
		}
	}, [inputValue]);

	useEffect(() => {
		isMounted.current = true;
	}, []);

	return (
		<div className={cl.root}>
			<input
				className={cl.root__input}
				type={type}
				required={required}
				{...register(name, validation)}
				autoComplete="false"
				defaultValue={
					name !== "avatar" && name !== "password" && profile
						? profile[name]
						: ""
				}
				id={`#${name}`}
			/>
			{error && <p className={cl.root__error}>{error.message}</p>}
			<label
				className={
					wrapperInputValue
						? [cl.root__label, cl.root__label_hidden].join(" ")
						: cl.root__label
				}
				htmlFor={`#${name}`}>
				{translate(label)}
			</label>
		</div>
	);
};
