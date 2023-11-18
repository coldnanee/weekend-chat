import cl from "./index.module.scss";

import { useRouter } from "next/navigation";

import { SettingsButton } from "../button";

import { useIsProfileUpdate } from "../../lib/useIsProfileUpdate";

import { goBackFromSettings } from "../../lib/goBackFromSettings";

export const SettingsButtons = () => {
	const router = useRouter();

	const { isUpdated } = useIsProfileUpdate();

	return (
		<div className={cl.root}>
			<SettingsButton
				onClick={() => goBackFromSettings(router)}
				border={false}>
				BACK
			</SettingsButton>
			{isUpdated && (
				<SettingsButton
					type="submit"
					border={true}>
					SAVE
				</SettingsButton>
			)}
		</div>
	);
};
