import { useEffect, useState } from "react";
import { CheckBox, Form, JointDiv } from "../../styles/form.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	DropDownSelect,
	OptionProp,
	PhoneNumberInput,
} from "../Filters/BasicInputs";
import CurrencyInput from "react-currency-input-field";
import { FormCheck } from "react-bootstrap";
import { ButtonSubmit } from "../../styles/links.styles";
import AddIcon from "../../assets/icons/user-add.svg";
import basicService from "../../redux/features/basic/basic-service";
import { displayError } from "../../utils/errors";
import Loading from "../Loaders/Loading";
import { toast } from "react-toastify";
import { updateOnboardingSteps } from "../../redux/features/basic/basic-slice";

const NewSubdealer = ({
	editInfo,
	submit,
}: {
	editInfo: any;
	submit: (arg: any) => void;
}) => {
	const dispatch = useAppDispatch();

	const [load, setLoad] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [selectedState, setSelectedState] = useState<OptionProp | null>(null);
	const [creditLimit, setCreditLimit] = useState(0);
	const [balance, setBalance] = useState(0);
	const [addBalance, setAddBalance] = useState(false);
	const [option, setOption] = useState("Credit");
	const [sms, setSms] = useState(false);

	const { states } = useAppSelector((state) => state.basic);
	const { token, details } = useAppSelector((state) => state.auth);

	const currency =
		details.business?.currency?.symbol || details.business?.currencyCode;

	useEffect(() => {
		if (editInfo?.id) {
			setName(editInfo.fullName);
			setAddress(editInfo.address);
			setPhone(editInfo.phoneNo);
			setEmail(editInfo.email);
			setCreditLimit(editInfo.creditLimit);
			setSelectedState(
				editInfo?.state
					? {
							value: editInfo?.state?.id,
							label: editInfo?.state?.name,
					  }
					: null
			);
			setSms(editInfo.salesSms);
		}
	}, [editInfo]);

	const submitHandler = async () => {
		try {
			setLoad(true);
			let obj = {
				name,
				address,
				phone,
				email,
				stateId: selectedState?.value,
				creditLimit,
			};
			let res;
			if (editInfo?.id) {
				res = await basicService.editSubdealer(token, obj, editInfo.id);
			} else {
				res = await basicService.createSubdealer(token, {
					...obj,
					balance: option === "Credit" ? balance : -balance,
				});
			}
			setLoad(false);
			if (res) {
				handleSms(res?.data?.id || res?.id);
				saveTrialPick();
				submit({
					fullName: name,
					email,
					address,
					phoneNo: phone,
					creditLimit,
					balance,
					value: 9000000000,
				});
				toast.success(
					editInfo?.id
						? "Details has been updated"
						: "A new Subdealer has been created!"
				);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const handleSms = async (id: any) => {
		try {
			await basicService.enableSMS(token, {
				enableSms: sms,
				subdealerId: id,
				businessId: details.businessId,
			});
		} catch (err) {}
	};

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.subdealer !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						subdealer: "completed",
					},
				})
			);
		}
	};

	return (
		<>
			<h5>Subdealer</h5>
			<Form style={{ marginTop: "30px" }}>
				<div className="row">
					<div className="col-lg-6">
						<label>Name of Subdealer</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							disabled={load}
							className="height"
						/>
					</div>
					<div className="col-lg-6">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={load}
							className="height"
						/>
					</div>
					<div className="col-lg-6">
						<label>Phone Number</label>
						<PhoneNumberInput value={phone} setValue={setPhone} />
					</div>
					<div className="col-lg-6">
						<label>Address</label>
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							required
							disabled={load}
							className="height"
						/>
					</div>
					<div className="col-lg-6 mb-3">
						<label>State</label>
						<DropDownSelect
							options={states}
							value={selectedState}
							changeSelected={setSelectedState}
						/>
					</div>
					<div className="col-lg-6">
						<label>Credit Limit</label>
						<CurrencyInput
							id="input-example"
							name="input-name"
							className="height"
							decimalsLimit={2}
							onValueChange={(values) => {
								setCreditLimit(Number(values));
							}}
							prefix={`${currency} `}
							value={creditLimit}
							disabled={load}
						/>
					</div>
					{!editInfo?.id && (
						<>
							<div className="col-lg-6">
								<CheckBox>
									<input
										type="checkbox"
										checked={addBalance}
										onChange={(e) =>
											setAddBalance(e.target.checked)
										}
										disabled={load}
									/>
									<span>Add Balance brought forward</span>
								</CheckBox>
							</div>
							<div className="col-lg-6">
								<JointDiv
									style={{ opacity: addBalance ? 1 : 0.4 }}
								>
									<select
										value={option}
										onChange={(e) =>
											setOption(e.target.value)
										}
										disabled={!addBalance}
										className="height"
									>
										<option value="Credit">Credit</option>
										<option value="Debit">Debit</option>
									</select>
									<CurrencyInput
										id="input-example"
										name="input-name"
										decimalsLimit={2}
										className="height"
										onValueChange={(values) => {
											setBalance(Number(values));
										}}
										prefix={`${
											option === "Debit" ? "- " : ""
										}${currency} `}
										value={balance}
										disabled={!addBalance}
										style={{
											color:
												option === "Debit"
													? "#F31B1B"
													: "#333",
										}}
									/>
								</JointDiv>
							</div>
						</>
					)}
				</div>
			</Form>
			<FormCheck
				type="switch"
				id="custom-switch"
				label="Enable SMS"
				checked={sms}
				onChange={(e) => setSms(e.target.checked)}
			/>
			<div className="mt-4">
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit
						disabled={load}
						type="submit"
						onClick={submitHandler}
					>
						<span>{editInfo?.id ? "Update" : "Add"} Subdealer</span>
						<img src={AddIcon} />
					</ButtonSubmit>
				)}
			</div>
		</>
	);
};

export default NewSubdealer;
