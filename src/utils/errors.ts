import { toast } from "react-toastify";

const displayError = (error: any, display?: boolean) => {
	const message =
		(error.response &&
			error.response.data &&
			error.response.data.message) ||
		error.message?.toString() ||
		error.toString();
	if (display) {
		toast.error(message);
	}
	return message;
};

export { displayError };
