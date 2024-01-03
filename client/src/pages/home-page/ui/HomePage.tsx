import { Home } from "@/widgets/home";
import { Layout } from "@/layout"; // eslint-disable-line import/order

import "./HomePage.scss";

const HomePage = () => {
	return (
		<div data-testid="home-page">
			<Layout className="home-page-layout">
				<Home />
			</Layout>
		</div>
	);
};

export default HomePage;
