import { Alert, ComingSoon } from "../styles/basic.styles";

const PermissionDenied = () => {
	return (
		<div>
			<ComingSoon>
				<Alert>
					You don't have permission to view this page. Please Contact
					Admin.
				</Alert>
			</ComingSoon>
		</div>
	);
};

export default PermissionDenied;
