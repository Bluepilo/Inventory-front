import { useEffect, useState } from "react";
import Reset from "../../components/ResetAuth/Reset";
import Forgot from "../../components/ResetAuth/Forgot";

const ForgotPassword = () => {
	const [confirm, setConfirm] = useState(false);
	const [email, setEmail] = useState("");

	useEffect(() => {
		setConfirm(false);
	}, []);

	return (
		<div style={{ padding: "0 8%" }}>
			<h5 className="text-center">
				{confirm ? "Reset" : "Forgot"} Password
			</h5>
			{!confirm ? (
				<Forgot
					setConfirm={setConfirm}
					email={email}
					setEmail={setEmail}
				/>
			) : (
				<Reset email={email} setConfirm={setConfirm} />
			)}
		</div>
	);
};

export default ForgotPassword;
