import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:4000",
	withCredentials: true,
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response.status === 401 ||
			(error.response.status === 403 && !originalRequest._retry)
		) {
			originalRequest._retry = true;

			try {
				const response = await axios.post(
					`http://localhost:4000/auth/refresh-token`,
					{},
					{
						withCredentials: true,
					}
				);

				if (response.status === 200) {
					return instance(originalRequest);
				}
			} catch (err) {
				console.error("Token refresh failed:", err);
			}
		}

		return Promise.reject(error);
	}
);

export default instance;
