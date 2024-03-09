import React, { useEffect, useState } from "react";
import AuthProgress from "../../components/Auth/AuthProgress";
import BusinessForm from "../../components/Business/BusinessForm";
import Success from "./Success";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

const NewBusiness = () => {
	const navigate = useNavigate();

	const [successful, setSuccessful] = useState(false);

	const { token } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
	}, [token]);

	return (
		<div style={{ padding: "0 5%" }}>
			<h5 className="text-center">Add your Business</h5>
			<AuthProgress step={successful ? 4 : 3} />
			{successful ? (
				<Success />
			) : (
				<BusinessForm onComplete={() => setSuccessful(true)} />
			)}
		</div>
	);
};

export default NewBusiness;
