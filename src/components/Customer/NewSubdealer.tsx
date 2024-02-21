import { useState } from "react";
import { CheckBox, Form, JointDiv } from "../../styles/form.styles";
import { useAppSelector } from "../../redux/hooks";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import CurrencyInput from "react-currency-input-field";
import { FormCheck } from "react-bootstrap";
import { ButtonSubmit } from "../../styles/links.styles";
import AddIcon from "../../assets/icons/user-add.svg";
import basicService from "../../redux/features/basic/basic-service";
import { displayError } from "../../utils/errors";
import Loading from "../Loaders/Loading";
import { toast } from "react-toastify";

const NewSubdealer = ({
	editInfo,
	submit,
}: {
	editInfo: any;
	submit: (arg: any) => void;
}) => {
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
				balance:
					option === "Credit" ? balance : Math.abs(Number(balance)),
			};
			let res;
			if (editInfo?.id) {
				res = await basicService.editSubdealer(token, obj, editInfo.id);
			} else {
				res = await basicService.createSubdealer(token, obj);
			}
			setLoad(false);
			if (res) {
				handleSms(res?.data?.id || res?.id);
				submit({
					fullName: name,
					email,
					address,
					phoneNo: phone,
					creditLimit,
					balance,
					value: 9000000000,
				});
				toast.success("A new Subdealer has been created!");
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const handleSms = async (id: any) => {
		try {
			await basicService.enableSMS(token, {
				enableSms: true,
				subdealerId: id,
				businessId: details.businessId,
			});
		} catch (err) {}
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
						/>
					</div>
					<div className="col-lg-6">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={load}
						/>
					</div>
					<div className="col-lg-6">
						<label>Phone Number</label>
						<input
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
							disabled={load}
						/>
					</div>
					<div className="col-lg-6">
						<label>Address</label>
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							required
							disabled={load}
						/>
					</div>
					<div className="col-lg-6">
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
							decimalsLimit={2}
							onValueChange={(values) => {
								setCreditLimit(Number(values));
							}}
							prefix={"₦ "}
							value={creditLimit}
							disabled={load}
						/>
					</div>
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
						<JointDiv style={{ opacity: addBalance ? 1 : 0.4 }}>
							<select
								value={option}
								onChange={(e) => setOption(e.target.value)}
								disabled={!addBalance}
							>
								<option value="Credit">Credit</option>
								<option value="Debit">Debit</option>
							</select>
							<CurrencyInput
								id="input-example"
								name="input-name"
								decimalsLimit={2}
								onValueChange={(values) => {
									setBalance(Number(values));
								}}
								prefix={"₦ "}
								value={balance}
								disabled={!addBalance}
							/>
						</JointDiv>
					</div>
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
						<span>Add Subdealer</span>
						<img src={AddIcon} />
					</ButtonSubmit>
				)}
			</div>
		</>
	);
};

export default NewSubdealer;
