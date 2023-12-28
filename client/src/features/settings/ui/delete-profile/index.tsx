"use client";

import { useState } from "react";
import { useI18nStore } from "@/features/i18n"; // eslint-disable-line boundaries/element-types
import cl from "./index.module.scss";

export const SettingsDeleteProfile = () => {
	const [password, setPassword] = useState<string>("");
	const [isShow, setIsShow] = useState<boolean>(false);

	const { translate } = useI18nStore();

	const deleteProfile = async () => {
		// const { status } = await $axios.post("/profile/delete", { password });
	};

	return (
		<div className={cl.root}>
			<button
				onClick={() => setIsShow(!isShow)}
				className={cl.root__button}>
				{translate("general_delete_profile")}
			</button>
			{isShow && (
				<div className={cl.root__input}>
					<input
						placeholder={translate("general_delete_placeholder")}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={cl.root__input__body}
						type="password"
						id="#delete-profile"
					/>
					<button
						className={cl.root__input__button}
						onClick={deleteProfile}>
						{translate("general_delete_button")}
					</button>
				</div>
			)}
		</div>
	);
};
