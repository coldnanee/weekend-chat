import cl from "./index.module.scss";

import { asideImagesDataArr } from "../../model/images";

import { useLogoutUser } from "../../lib/useLogoutUser";
import { useSettingsNavigate } from "../../lib/useSettingsNavigate";

import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

import { SettingsMenuItem } from "../menu-item";

import { IconContext } from "react-icons";

export const AdaptiveIconsList = () => {
	const { goToSettings } = useSettingsNavigate();

	const logoutUser = useLogoutUser();

	return (
		<IconContext.Provider
			value={{
				color: "#a6abb7",
				size: "25px"
			}}>
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
					<li>
						<SettingsMenuItem
							cb={goToSettings}
							Image={IoMdSettings}
							text="Settings"
						/>
					</li>
				</ul>
			</nav>
		</IconContext.Provider>
	);
};
