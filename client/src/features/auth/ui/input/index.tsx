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
		<div className={cl.root}>
			<input
				autoComplete="off"
				type={type}
				placeholder={name}
				{...register(name, validation)}
				className={[cl.root__input, className].join(" ")}
				required
			/>
			{error && <p className={cl.root__error}>{error.message}</p>}
		</div>
	);
};
