import { useFormContext } from "react-hook-form";

import type { RegisterOptions } from "react-hook-form";
import type { TAuthForm, TAuthFormField } from "@/entities/auth";

import cl from "./index.module.scss";

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
		formState: { errors },
		watch
	} = useFormContext<TAuthForm>();

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
