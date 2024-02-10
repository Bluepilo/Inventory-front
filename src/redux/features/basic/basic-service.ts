import axios from "axios";

import config from "../../../utils/config";

const getNotifications = async () => {
	const { data } = await axios.get(
		`${config.baseUrl}/notification/user-notification`
	);
	return data;
};

const basicService = {
	getNotifications,
};

export default basicService;
