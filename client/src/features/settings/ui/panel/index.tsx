import { IoMdArrowDropdown } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { useSettingsSessionStore } from "@/entities/session";
import { useI18nStore } from "@/shared";
import cl from "./index.module.scss";

export const SettingsSessionsPanel = () => {
	const {
		toggleAllSession,
		selectedSessions,
		sessions,
		killSessions,
		fetchSessions
	} = useSettingsSessionStore();

	const { translate } = useI18nStore();

	const isAllSelected = selectedSessions.length === sessions.length;

	const rootClChecked = [cl.root__body__checkbox__body];

	if (isAllSelected) {
		rootClChecked.push(cl.root__body__checkbox__body_checked);
	}

	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<label className={cl.root__body__checkbox}>
					<input
						type="text"
						id="#settings-session-all"
						checked={isAllSelected}
						onChange={() => {}}
						onClick={toggleAllSession}
					/>
					<div className={rootClChecked.join(" ")}>
						{isAllSelected && (
							<span>
								<TiTick
									size="18px"
									color="#676768"
								/>
							</span>
						)}
					</div>
					<IoMdArrowDropdown
						className={cl.root__body__arrow}
						color="#676768"
						size="30px"
					/>
				</label>
				{selectedSessions.length > 0 && (
					<button
						className={cl.root__body__delete}
						onClick={killSessions}>
						{translate("settings", "sessions_delete")}
					</button>
				)}
			</div>
			<TbReload
				color="#a9aeba"
				className={cl.root__reload}
				size="25px"
				onClick={fetchSessions}
			/>
		</div>
	);
};
