import { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import basicService from "../../redux/features/basic/basic-service";
import { toast } from "react-toastify";
import {
	allShops,
	updateOnboardingSteps,
} from "../../redux/features/basic/basic-slice";

const ShopForm = ({
	detail,
	onComplete,
}: {
	detail: any;
	onComplete: () => void;
}) => {
	const dispatch = useAppDispatch();

	const { states } = useAppSelector((state) => state.basic);
	const { token, details } = useAppSelector((state) => state.auth);

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [stateId, setStateId] = useState<OptionProp | null>(null);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (detail?.id) {
			setName(detail?.name);
			setAddress(detail?.address);
			setPhoneNo(detail?.phoneNo);
			setStateId({ label: detail.state?.name, value: detail.state?.id });
		}
	}, [detail]);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			let payload = {
				name,
				address,
				phone: phoneNo,
				stateId: stateId?.value,
			};
			setLoad(true);
			let res;
			if (detail?.id) {
				res = await basicService.editShop(token, payload, detail.id);
			} else {
				res = await basicService.createShop(token, payload);
				saveTrialPick();
			}
			dispatch(allShops());
			if (res) {
				toast.success(
					`Shop has been ${detail?.id ? "Updated" : "Created"}`
				);
				onComplete();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.shop !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						shop: "completed",
					},
				})
			);
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<label>Name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
				disabled={load}
				className="height"
			/>
			<label>Address</label>
			<input
				type="text"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				required
				disabled={load}
				className="height"
			/>
			<label>Phone Number</label>
			<input
				type="tel"
				value={phoneNo}
				onChange={(e) => setPhoneNo(e.target.value)}
				disabled={load}
				className="height"
			/>
			{(!details.business.country ||
				details.business.country?.name == "Nigeria") && (
				<>
					<label>State</label>
					<DropDownSelect
						options={states}
						value={stateId}
						changeSelected={setStateId}
					/>
				</>
			)}
			<div className="mt-4">
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit type="submit">
						{detail?.id ? "Update" : "Create"}
					</ButtonSubmit>
				)}
			</div>
		</Form>
	);
};

export default ShopForm;
