import React, { useState } from "react";
import AuthProgress from "../../components/Auth/AuthProgress";
import { displayError } from "../../utils/errors";
import { CheckBox, Form } from "../../styles/form.styles";
import {
	DropDownSelect,
	OptionProp,
} from "../../components/Filters/BasicInputs";
import { useAppSelector } from "../../redux/hooks";
import { FaArrowRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FlexBetween } from "../../styles/basic.styles";
import { WideButton } from "../../styles/links.styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../redux/features/auth/auth-service";
import Loading from "../../components/Loaders/Loading";

const Signup = () => {
	const navigate = useNavigate();

	const [load, setLoad] = useState(false);

	const { countries } = useAppSelector((state) => state.basic);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [countryCode, setCountryCode] = useState<OptionProp | null>(null);
	const [check, setCheck] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const passwordValidator = (pass: string) => {
		setPassword(pass);
		var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
		if (re.test(pass)) {
			setPasswordError(false);
		} else {
			setPasswordError(true);
		}
		return re.test(pass);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		if (!passwordError) {
			if (check) {
				try {
					setLoad(true);
					let data = {
						name,
						email,
						phone,
						ownerFirstName: firstName,
						ownerLastName: lastName,
						adminPassword: password,
						passwordConfirmation: passwordConfirm,
						acceptTerms: check,
						countryCode: countryCode?.value,
						address: "address",
						regNo: "",
					};
					let res = await authService.register(data);
					setLoad(false);
					if (res) {
						navigate("/verify-otp", {
							state: { email },
						});
					}
				} catch (err) {
					setLoad(false);
					displayError(err, true);
				}
			} else {
				toast.error("Please accept our terms to proceed");
			}
		}
	};

	return (
		<div style={{ padding: "0 2%" }}>
			<h5 className="text-center">Create new account</h5>
			<AuthProgress step={1} />
			<Form style={{ marginTop: "30px" }} onSubmit={submitHandler}>
				<div className="row">
					<div className="col-lg-6">
						<label>Organization Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							disabled={load}
						/>
					</div>
					<div className="col-lg-6">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={load}
						/>
					</div>
					<div className="col-lg-6">
						<label>Surname</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							disabled={load}
						/>
					</div>
					<div className="col-lg-6">
						<label>First Name</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							disabled={load}
						/>
					</div>
					<div className="col-lg-6 mb-4">
						<DropDownSelect
							label="Country"
							options={countries}
							value={countryCode}
							changeSelected={setCountryCode}
						/>
					</div>
					<div className="col-lg-6">
						<label>Phone</label>
						<input
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
							disabled={load}
						/>
					</div>
					<div className="col-lg-6">
						<label>Password</label>
						<div className="pos">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) =>
									passwordValidator(e.target.value)
								}
								required
								disabled={load}
							/>
							<button
								onClick={(e) => {
									e.preventDefault();
									setShowPassword(!showPassword);
								}}
								style={{ top: "8px" }}
							>
								{showPassword ? (
									<FaRegEyeSlash />
								) : (
									<FaRegEye />
								)}
							</button>
						</div>
						{passwordError && (
							<div className="error-check">
								<ul>
									<li>Minimum of 8 letters</li>
									<li>Must include a number</li>
									<li>Must include a Capital letter</li>
								</ul>
							</div>
						)}
					</div>
					<div className="col-lg-6">
						<label>Confirm Password</label>
						<div className="pos">
							<input
								type={showConfirm ? "text" : "password"}
								value={passwordConfirm}
								onChange={(e) =>
									setPasswordConfirm(e.target.value)
								}
								required
								disabled={load}
							/>
							<button
								onClick={(e) => {
									e.preventDefault();
									setShowConfirm(!showConfirm);
								}}
								style={{ top: "8px" }}
							>
								{showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
							</button>
						</div>
						{password &&
							passwordConfirm &&
							password !== passwordConfirm && (
								<div className="error-check">
									<p>Passwords must match</p>
								</div>
							)}
					</div>
					<div className="col-lg-12">
						<CheckBox>
							<input
								type="checkbox"
								checked={check}
								onChange={(e) => setCheck(e.target.checked)}
								disabled={load}
							/>
							<span>
								I accept Bluepilo's{" "}
								<a
									href="https://bluepilo.com/terms-condition/"
									target="_blank"
								>
									Terms and Conditions
								</a>
							</span>
						</CheckBox>
					</div>
					<div className="col-lg-12 mt-3">
						<FlexBetween>
							<WideButton
								style={{ width: "48%" }}
								bg="#f5f5f5"
								color="#505BDA"
								onClick={(e) => {
									e.preventDefault();
									navigate("/");
								}}
								disabled={load}
							>
								<span>Login to BluePilo</span>
							</WideButton>
							{load ? (
								<Loading />
							) : (
								<WideButton
									type="submit"
									style={{ width: "48%" }}
								>
									<span>Next</span>
									<FaArrowRight />
								</WideButton>
							)}
						</FlexBetween>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default Signup;
