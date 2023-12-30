import { Home } from "@/widgets/home";
import { Layout } from "@/layout"; // eslint-disable-line import/order

import "./HomePage.scss";

const HomePage = () => {
	return (
		<Layout className="home-page-layout">
			<Home />
		</Layout>
	);
};

export default HomePage;
