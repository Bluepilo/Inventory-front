import { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { BasicLink, ButtonSubmit } from "../../styles/links.styles";
import Terms from "../../components/Terms";
import Loading from "../../components/Loaders/Loading";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearLoad, login } from "../../redux/features/auth/auth-slice";

const Login = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { loading, error } = useAppSelector((state) => state.auth);

	useEffect(() => {
		dispatch(clearLoad());
	}, []);

	useEffect(() => {
		if (error?.startsWith("Please verify your organization")) {
			navigate("/verify-otp", { state: { email } });
		}
	}, [error]);

	const submitHandler = (e: any) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	return (
		<div style={{ padding: "0 8%" }}>
			<h5 className="text-center">Login</h5>
			<Form style={{ marginTop: "30px" }} onSubmit={submitHandler}>
				<label>Email/Username</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					disabled={loading}
					autoComplete="email"
					className="height"
				/>
				<label>Enter Password</label>
				<div className="pos">
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="no-m height"
						required
						disabled={loading}
						autoComplete="password"
					/>
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setShowPassword(!showPassword);
						}}
					>
						{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
					</a>
				</div>
				<div className="forgot">
					<p>
						Forgot your Password? Click{" "}
						<Link to="/forgot-password">here</Link>
					</p>
				</div>
				<div className="mt-5">
					{loading ? (
						<Loading />
					) : (
						<ButtonSubmit type="submit">Login</ButtonSubmit>
					)}
				</div>
				<div className="text-center mt-3">
					<BasicLink to="/sign-up">
						Create a new Account for free
					</BasicLink>
				</div>
				<div className="mt-5">
					<Terms />
				</div>
			</Form>
		</div>
	);
};

export default Login;
