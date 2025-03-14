import { useEffect, useState } from "react";
import { CheckBox, Form, JointDiv } from "../../styles/form.styles";
import {
	DropDownSelect,
	OptionProp,
	PhoneNumberInput,
} from "../Filters/BasicInputs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CurrencyInput from "react-currency-input-field";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import AddIcon from "../../assets/icons/user-add.svg";
import customerService from "../../redux/features/customer/customer-services";
import { toast } from "react-toastify";
import { displayError } from "../../utils/errors";
import { updateOnboardingSteps } from "../../redux/features/basic/basic-slice";

const NewSupplier = ({
	editInfo,
	submit,
}: {
	editInfo: any;
	submit: (arg: any) => void;
}) => {
	const dispatch = useAppDispatch();

	const { states } = useAppSelector((state) => state.basic);
	const { details, currency } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [selectedState, setSelectedState] = useState<OptionProp | null>(null);
	const [balance, setBalance] = useState(0);
	const [addBalance, setAddBalance] = useState(false);
	const [option, setOption] = useState("Credit");

	const countryCode = details?.business?.country?.code;

	useEffect(() => {
		if (editInfo?.id) {
			setName(editInfo.fullName);
			setAddress(editInfo.address);
			setPhone(editInfo.phoneNo);
			setEmail(editInfo.email);
			setSelectedState(
				editInfo?.state
					? {
							value: editInfo?.state?.id,
							label: editInfo?.state?.name,
					  }
					: null
			);
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
			};

			let res;
			if (editInfo?.id) {
				res = await customerService.editSupplier(editInfo.id, obj);
			} else {
				res = await customerService.createSupplier({
					...obj,
					balance: option === "Credit" ? balance : -balance,
				});
			}
			setLoad(false);
			if (res) {
				saveTrialPick();
				submit({
					fullName: name,
					email,
					address,
					phoneNo: phone,
					balance,
					value: 9000000000,
					id: res.id,
				});
				toast.success(
					editInfo?.id
						? "Details has been updated"
						: "A new Supplier has been created!"
				);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.supplier !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						supplier: "completed",
					},
				})
			);
		}
	};

	return (
		<>
			<Form>
				<div className="row">
					<div className="col-lg-6">
						<label>Name of Supplier</label>
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
						<PhoneNumberInput
							value={phone}
							setValue={setPhone}
							countryCode={countryCode || "234"}
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
					<div className="col-lg-12">
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
										className="height"
										decimalsLimit={2}
										onValueChange={(values) => {
											setBalance(
												Math.abs(Number(values))
											);
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
			<div className="mt-4">
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit
						disabled={load}
						type="submit"
						onClick={submitHandler}
					>
						<span>{editInfo?.id ? "Update" : "Add"} Supplier</span>
						<img src={AddIcon} />
					</ButtonSubmit>
				)}
			</div>
		</>
	);
};

export default NewSupplier;
