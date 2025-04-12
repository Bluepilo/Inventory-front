import { toast } from "react-toastify";
import store from "../redux/store";
import { logout } from "../redux/features/auth/auth-slice";

const displayError = (error: any, display?: boolean) => {
	const message =
		(error.response &&
			error.response.data &&
			error.response.data.message) ||
		error.message?.toString() ||
		error.toString();
	if (message?.includes("Session expired")) {
		store.dispatch(logout());
	}
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
