import axios from "axios";

export const refreshToken = async () => {
	try {
		await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/token/refresh`,
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
