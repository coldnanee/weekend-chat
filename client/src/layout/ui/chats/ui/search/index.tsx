import { type ChangeEvent, useState, useCallback } from "react";
import cl from "./index.module.scss";

import debounce from "lodash.debounce";

import { CiSearch } from "react-icons/ci";

export const ChatsSearch = ({
	setLogin
}: {
	setLogin: (login: string) => void;
}) => {
	const [value, setValue] = useState<string>("");

	const changeSearchQuery = useCallback(
		debounce((value) => {
			setLogin(value);
		}, 500),
		[]
	);

	const handler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		changeSearchQuery(e.target.value);
	};

	return (
		<div className={cl.root}>
			<input
				value={value}
				onChange={handler}
				className={cl.root__input}
				placeholder="Search"
			/>
			<CiSearch
				className={cl.root__image}
				color="#a9aeba"
				size="25px"
			/>
		</div>
	);
};
