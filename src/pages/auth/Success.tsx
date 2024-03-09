import React from "react";
import { ResendBox } from "../../styles/auth.styles";
import Loading from "../../components/Loaders/Loading";

const Success = () => {
	return (
		<div className="mt-4">
			<ResendBox>
				<p>Welcome! Your account is ready!</p>
				<p>You will be redirected...</p>
				<Loading />
			</ResendBox>
		</div>
	);
};

export default Success;
