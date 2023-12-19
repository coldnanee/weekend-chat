import { IconContext } from "react-icons";
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import { useLogoutUser } from "../../lib";
import { asideImagesDataArr } from "../../model";
import { SettingsMenuItem } from "../menu-item";

import cl from "./index.module.scss";

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
							Picture={MdLogout}
							text="Logout"
							cb={logoutUser}
						/>
					</li>
				</ul>
				<SettingsMenuItem
					Picture={IoMdSettings}
					text="Settings"
					link="/settings"
				/>
			</nav>
		</IconContext.Provider>
	);
};
