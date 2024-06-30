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

const displaySuccess = (msg: string) => {
	toast.success(msg);
	return "";
};

export { displayError, displaySuccess };
