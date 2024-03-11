import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const Admin = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!details?.role.isAdmin) {
			navigate("/");
		}
	}, [details]);

	return details?.id ? <DashboardLayout /> : <></>;
};

export default Admin;
