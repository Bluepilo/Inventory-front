import { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "../../styles/form.styles";
import authService from "../../redux/features/auth/auth-service";
import { displayError } from "../../utils/errors";
import { Link } from "react-router-dom";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";

const Forgot = ({
	email,
	setEmail,
	setConfirm,
}: {
	email: string;
	setConfirm: (arg: boolean) => void;
	setEmail: (arg: string) => void;
}) => {
	const [load, setLoad] = useState(false);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			let res = await authService.forgotPassword({ email });
			setLoad(false);
			if (res) {
				toast.success(res.message || "Token has been sent");
				setConfirm(true);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form style={{ marginTop: "30px" }} onSubmit={submitHandler}>
			<label>Enter Email</label>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				className="no-m height"
				disabled={load}
			/>
			<div className="forgot">
				<p>
					Remember Password? Click <Link to="/">here</Link>
				</p>
			</div>
			<div className="mt-5">
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit type="submit">Reset</ButtonSubmit>
				)}
			</div>
		</Form>
	);
};

export default Forgot;
