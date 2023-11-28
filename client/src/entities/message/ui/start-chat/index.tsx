import cl from "./index.module.scss";

export const StartChat = ({ name }: { name: string }) => {
	return (
		<section className={cl.root}>
			<p className={cl.root__text}>Say hi to {name}!</p>
		</section>
	);
};
