import { useLogoutUser } from "../../lib/useLogoutUser";

import { asideImagesDataArr } from "../../model/images";

import { SettingsMenuItem } from "../menu-item";

import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import cl from "./index.module.scss";

import { IconContext } from "react-icons";

export const ImagesList = () => {
	const logoutUser = useLogoutUser();

	return (
		<IconContext.Provider
			value={{
				color: "#a6abb7",
				size: "20px"
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
				</ul>
				<SettingsMenuItem
					Image={IoMdSettings}
					text="Settings"
					link="/settings"
				/>
			</nav>
		</IconContext.Provider>
	);
};
