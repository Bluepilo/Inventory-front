import { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import customerService from "../../redux/features/customer/customer-services";
import { useAppSelector } from "../../redux/hooks";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import basicService from "../../redux/features/basic/basic-service";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import { toast } from "react-toastify";
import { FormCheck } from "react-bootstrap";

const AddToBusiness = ({
	detail,
	close,
}: {
	detail: any;
	close: () => void;
}) => {
	const { details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [roles, setRoles] = useState<OptionProp[]>([]);
	const [business, setBusiness] = useState<OptionProp[]>([]);
	const [shops, setShops] = useState<OptionProp[]>([]);
	const [roleId, setRoleId] = useState<OptionProp | null>(null);
	const [businessId, setBusinessId] = useState<OptionProp | null>(null);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [manageWithdrawal, setManageWithdrawal] = useState(false);
	const [manageTransfer, setManageTransfer] = useState(false);
	const [makePurchase, setMakePurchase] = useState(false);

	useEffect(() => {
		listRoles();
		listBusiness();
	}, []);

	useEffect(() => {
		if (businessId?.value) {
			getBusiness();
		}
	}, [businessId?.value]);

	const listRoles = async () => {
		try {
			let res = await customerService.listRoles();
			let arr = res
				?.filter((f: any) => f.name !== "Staff")
				.map((a: any) => {
					return { label: a.name, value: a.id };
				});
			setRoles(arr || []);
		} catch (err) {}
	};

	const listBusiness = async () => {
		let arr = details.allowedBusinesses?.map((a: any) => {
			return { label: a.business?.name, value: a.business?.id };
		});
		setBusiness(arr || []);
	};

	const getBusiness = async () => {
		try {
			let res = await basicService.businessDetails(businessId?.value);
			let arr = res?.data?.shops
				?.filter((a: any) => a.isActive)
				.map((s: any) => {
					return { label: s.name, value: s.id };
				});

			setShops(arr || []);
		} catch (err) {
			console.log(err);
		}
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			let payload = {
				roleId: roleId?.value,
				shopId: shopId?.value,
				makePurchase,
				manageTransfer,
				manageWithdrawal,
			};
			setLoad(true);
			await customerService.addUserToBusiness(
				businessId?.value,
				detail?.id,
				payload
			);
			setLoad(false);
			toast.success(`Details has been updated`);
			close();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<div className="mb-3">
				<label>Select Business</label>
				<DropDownSelect
					options={business}
					value={businessId}
					changeSelected={(arg) => {
						setShopId(null);
						setBusinessId(arg);
					}}
				/>
			</div>
			<div className="mb-3">
				<label>Select Role</label>
				<DropDownSelect
					options={roles}
					value={roleId}
					changeSelected={setRoleId}
				/>
			</div>
			{roleId?.label?.includes("Shop") && (
				<div className="mb-3">
					<label>Select Shop</label>
					<DropDownSelect
						options={shops}
						value={shopId}
						changeSelected={setShopId}
					/>
				</div>
			)}
			{roleId?.label === "Business Admin" && (
				<>
					<div className="mb-3">
						<FormCheck
							type="switch"
							id={`withdrawal2`}
							label="Manage Withdrawals"
							checked={manageWithdrawal}
							onChange={(e) => {
								setManageWithdrawal(e.target.checked);
							}}
						/>
					</div>
					<div className="mb-3">
						<FormCheck
							type="switch"
							id={`withdrawal2`}
							label="Manage Transfers"
							checked={manageTransfer}
							onChange={(e) => {
								setManageTransfer(e.target.checked);
							}}
						/>
					</div>
				</>
			)}
			{roleId?.label === "Shop Admin" && (
				<div className="mb-3">
					<FormCheck
						type="switch"
						id={`withdrawal2`}
						label="Make Purchase"
						checked={makePurchase}
						onChange={(e) => {
							setMakePurchase(e.target.checked);
						}}
					/>
				</div>
			)}
			<div className="col-lg-12">
				{load ? <Loading /> : <ButtonSubmit>Submit</ButtonSubmit>}
			</div>
		</Form>
	);
};

export default AddToBusiness;
