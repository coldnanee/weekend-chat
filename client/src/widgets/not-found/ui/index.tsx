import cl from "./index.module.scss";

export const NotFound = () => {
	return (
		<section className={cl.root}>
			<div className={cl.root__body}>
				<h3 className={cl.root__body__title}>404, page not found.</h3>
			</div>
		</section>
	);
};
