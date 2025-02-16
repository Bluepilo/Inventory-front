import { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import {
	DropDownSelect,
	OptionProp,
	PhoneNumberInput,
} from "../Filters/BasicInputs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ButtonSubmit, WideButton } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import basicService from "../../redux/features/basic/basic-service";
import Loading from "../Loaders/Loading";
import { useLocation } from "react-router-dom";
import { logout, userProfile } from "../../redux/features/auth/auth-slice";

const BusinessForm = ({
	onComplete,
	dashboard,
	editDetail,
}: {
	onComplete: () => void;
	dashboard?: boolean;
	editDetail?: any;
}) => {
	const dispatch = useAppDispatch();

	const id = useLocation().state?.id;

	const { countries, states } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [name, setName] = useState("");
	const [regNo, setRegNo] = useState("");
	const [countryCode, setCountryCode] = useState<OptionProp | null | any>(
		null
	);
	const [currency, setCurrency] = useState<OptionProp | null>(null);
	const [currencyList, setCurrencyList] = useState<OptionProp[]>([]);
	const [stateId, setStateId] = useState<OptionProp | null>(null);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		loadCurrency();
	}, []);

	useEffect(() => {
		if (editDetail?.id) {
			setName(editDetail.name);
			setRegNo(editDetail.regNo);
			setEmail(editDetail.email);
			setPhone(editDetail.phone);
			setCurrency({
				label: `${editDetail.currency?.name} ${editDetail.currency?.symbol}`,
				value: editDetail.currency?.id,
			});
			setAddress(editDetail.address);
			setCountryCode(
				editDetail?.country
					? {
							value: editDetail.countryCode,
							label: editDetail.country.name,
							code: editDetail.country.code,
					  }
					: null
			);
			setStateId(
				editDetail?.state
					? {
							value: editDetail.state.id,
							label: editDetail.state.name,
					  }
					: null
			);
		}
	}, [editDetail]);

	const loadCurrency = async () => {
		try {
			let res = await basicService.currencyList();
			let arr = res?.map((r: any) => {
				return { label: `${r.name} ${r.symbol}`, value: r.code };
			});
			setCurrencyList(arr);
		} catch (err) {}
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			let data = {
				name,
				regNo,
				email,
				address,
				phone,
				acceptTerms: true,
				stateId: stateId?.value,
				countryCode: countryCode?.value,
				currencyCode: currency?.value,
			};
			let res;
			if (editDetail?.id) {
				res = await basicService.updateBusiness(data, editDetail.id);
			} else {
				res = await basicService.createBusiness(data);
			}
			setLoad(false);
			if (res) {
				onComplete();
				dispatch(userProfile());
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form
			style={{ marginTop: dashboard ? "10px" : "30px" }}
			onSubmit={submitHandler}
		>
			<div className="row">
				<div className="col-lg-12">
					<label>Name of Business</label>
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

				<div className="col-lg-6 mb-4">
					<label>Country</label>
					<DropDownSelect
						options={countries}
						value={countryCode}
						changeSelected={setCountryCode}
					/>
				</div>
				{countryCode?.value === "NG" && (
					<div className="col-lg-6 mb-4">
						<label>State</label>
						<DropDownSelect
							options={states}
							value={stateId}
							changeSelected={setStateId}
						/>
					</div>
				)}
				<div className="col-lg-6 mb-4">
					<label>Currency</label>
					<DropDownSelect
						options={currencyList}
						value={currency}
						changeSelected={setCurrency}
					/>
				</div>
				<div className="col-lg-6">
					<label>Phone</label>
					<PhoneNumberInput
						value={phone}
						setValue={setPhone}
						countryCode={countryCode?.code}
					/>
				</div>
				<div className="col-lg-6 mb-4">
					<label>Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						disabled={load}
						required
						className="height"
					/>
				</div>
				<div className="col-lg-12 mt-3">
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit type="submit">
							{editDetail?.id ? "Update" : "Create"} Business
						</ButtonSubmit>
					)}
				</div>
				{!dashboard && (
					<div className="mt-4">
						<WideButton
							bg="#EDEEF0"
							color="#505BDA"
							onClick={(e) => {
								e.preventDefault();
								dispatch(logout());
							}}
						>
							<span>Logout</span>
						</WideButton>
					</div>
				)}
			</div>
		</Form>
	);
};

export default BusinessForm;
