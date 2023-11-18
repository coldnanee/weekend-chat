import { useRouter } from "next/navigation";

import { useLogoutUser } from "../../lib/useLogoutUser";

import { asideImagesDataArr } from "../../model/images";

import { SettingsMenuItem } from "../menu-item";

import { useSettingsNavigate } from "../../lib/useSettingsNavigate";

import { IoMdSettings } from "react-icons/io";

import cl from "./index.module.scss";

import { MdLogout } from "react-icons/md";

export const ImagesList = () => {
	const router = useRouter();

	const { goToSettings } = useSettingsNavigate();

	const logoutUser = useLogoutUser(router);

	return (
		<nav className={cl.root}>
			<ul className={cl.root__list}>
				{asideImagesDataArr.map((img) => (
					<li key={img.text}>
						<SettingsMenuItem {...img} />
					</li>
				))}
				<li>
					<SettingsMenuItem
						Image={MdLogout}
						text="Logout"
						cb={logoutUser}
					/>
				</li>
			</ul>
			<SettingsMenuItem
				cb={goToSettings}
				Image={IoMdSettings}
				text="Settings"
			/>
		</nav>
	);
};
