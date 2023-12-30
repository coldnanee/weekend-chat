import debounce from "lodash.debounce";
import { type ChangeEvent, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useI18nStore } from "@/features/i18n";
import cl from "./index.module.scss";

export const ChatsSearch = ({
	setLogin
}: {
	setLogin: (login: string) => void; // eslint-disable-line no-unused-vars
}) => {
	const [value, setValue] = useState<string>("");

	// prettier-ignore

	const changeSearchQuery = useCallback( // eslint-disable-line
		debounce((value) => {
			setLogin(value);
		}, 500),
		[]
	);

	const handler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		changeSearchQuery(e.target.value);
	};

	const clear = () => {
		setLogin("");
		setValue("");
	};

	const { translate } = useI18nStore();

	return (
		<div className={cl.root}>
			<input
				value={value}
				onChange={handler}
				className={cl.root__input}
				placeholder={translate("chats_search_placeholder")}
			/>
			<CiSearch
				className={cl.root__search}
				color="#a9aeba"
				size="25px"
			/>
			{value && (
				<RxCross2
					className={cl.root__clear}
					color="#a9aeba"
					size="20px"
					onClick={clear}
				/>
			)}
		</div>
	);
};
