const displayError = (error: any, display?: boolean) => {
	const message =
		(error.response &&
			error.response.data &&
			error.response.data.response_message) ||
		error.message ||
		error.toString();
	if (display) {
		console.log("Display");
	}
	return message;
};

export { displayError };
