import cl from "./index.module.scss";

import { useFormContext } from "react-hook-form";

import type { TAuthForm, TAuthFormField } from "../../model/types";

import type { RegisterOptions } from "react-hook-form";

export const AuthInput = ({
	className,
	type,
	name,
	validation
}: {
	type: string;
	name: TAuthFormField;
	className?: string;
	validation: RegisterOptions<TAuthForm, TAuthFormField>;
}) => {
	const {
		register,
		formState: { errors }
	} = useFormContext<TAuthForm>();

	const error = errors[name];

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
			{error && <p className={cl.root__error}>{error.message}</p>}
			<label
				className={cl.root__label}
				htmlFor={`#${name}`}>
				{name}
			</label>
		</div>
	);
};
