import { useFormContext } from "react-hook-form";

import type { RegisterOptions } from "react-hook-form";
import { useI18nStore } from "@/features/i18n"; // eslint-disable-line boundaries/element-types
import type { TAuthForm, TAuthFormField } from "@/entities/auth";

import cl from "./index.module.scss";

export const AuthInput = ({
	className,
	type,
	name,
	validation,
	label
}: {
	type: string;
	name: TAuthFormField;
	className?: string;
	validation: RegisterOptions<TAuthForm, TAuthFormField>;
	label: string;
}) => {
	const {
		register,
		formState: { errors },
		watch
	} = useFormContext<TAuthForm>();

	const { translate } = useI18nStore();

	const error = errors[name];

	const inputValue = watch(name);

	return (
		<div className={[cl.root, className].join(" ")}>
			<input
				autoComplete="off"
				type={type}
				{...register(name, validation)}
				className={cl.root__input}
				required
				id={`#${name}`}
			/>
			{error && error.message && (
				<p className={cl.root__error}>{translate(error.message)}</p>
			)}
			<label
				className={
					inputValue
						? [cl.root__label, cl.root__label_hidden].join(" ")
						: cl.root__label
				}
				htmlFor={`#${name}`}>
				{translate(label)}
			</label>
		</div>
	);
};
