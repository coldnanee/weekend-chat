import axios from "axios";
import { setCookie } from "cookies-next";

const refreshToken = async () => {
	try {
		await axios.post(
			`${process.env.API_URL}/token/refresh`,
			{},
			{
				withCredentials: true
			}
		);
		return true;
	} catch (e) {
		return null;
	}
};

const $axios = axios.create({
	withCredentials: true,
	baseURL: process.env.API_URL
});

$axios.interceptors.response.use(
	(response) => response,
	async (err) => {
		const origin = err.config;

		if (!err.response) {
			axios.post(`${process.env.API_URL}/logout`).then(() => {
				if (window) window.location.href = "/login";
			});
		}

		if (err.response && err.response.status == 401 && !origin._isRetry) {
			origin._isRetry = true;

			const isRefresh = await refreshToken();

			if (isRefresh) {
				return $axios(origin);
			}

			if (window) {
				location.href = "/login";
			}
		}

		throw err;
	}
);

export default $axios;
