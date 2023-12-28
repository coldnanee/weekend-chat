import type { TUser } from "@/entities/user";
import { DefaultAvatar } from "@/shared";
import { useBlacklistStore } from "../../model";
import cl from "./index.module.scss";

export const BlacklistItem = ({ user }: { user: TUser }) => {
	const { unblockUser } = useBlacklistStore();

	return (
		<li className={cl.root}>
			<div className={cl.root__body}>
				<DefaultAvatar
					src={user.avatar}
					width={45}
					height={45}
					alt={user.login}
					className={cl.root__body__avatar}
				/>
				<p className={cl.root__body__login}>{user.login}</p>
			</div>
			<button
				onClick={() => unblockUser(user._id)}
				className={cl.root__delete}>
				Unblock
			</button>
		</li>
	);
};
