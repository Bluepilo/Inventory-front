import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const User = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!details?.id) {
			navigate("/");
		}
	}, [details]);

	let check = details.businessId || details.allowedBusinesses?.length > 0;

	return check ? <DashboardLayout /> : <></>;
};

export default User;
