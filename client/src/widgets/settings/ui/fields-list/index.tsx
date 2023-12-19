import { SettingsInput } from "@/features/settings";
import { fieldsSettingsArr } from "./fields";

import cl from "./index.module.scss";

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
