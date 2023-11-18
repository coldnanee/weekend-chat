import { fieldsSettingsArr } from "../../model/fields";

import cl from "./index.module.scss";

import { SettingsInput } from "../input";

export const SettingsFieldsList = () => {
	return (
		<div className={cl.root}>
			{fieldsSettingsArr.map((field) => (
				<SettingsInput
					key={field.name}
					{...field}
				/>
			))}
		</div>
	);
};
