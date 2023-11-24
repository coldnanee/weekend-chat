import cl from "./index.module.scss";

export const UserNotFound = () => {
	return (
		<section className={cl.root}>
			<p className={cl.root__text}>User not found!</p>
		</section>
	);
};
