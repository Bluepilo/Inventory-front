import { FormCheck, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AccountBox } from "../../../styles/profile.styles";
import { useEffect, useState } from "react";
import { MainButton } from "../../../styles/links.styles";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { getSettings } from "../../../redux/features/basic/basic-slice";
import { toast } from "react-toastify";
import { Flex } from "../../../styles/basic.styles";
import CurrencyInput from "react-currency-input-field";
import { userProfile } from "../../../redux/features/auth/auth-slice";
import { FaTrash } from "react-icons/fa6";
import productService from "../../../redux/features/product/product-service";
import ProductCategories from "../../../components/Settings/ProductCategories";

const Account = () => {
	const dispatch = useAppDispatch();

	const { settings } = useAppSelector((state) => state.basic);
	const { token, details, currency } = useAppSelector((state) => state.auth);

	const [waitingPeriod, setWaitingPeriod] = useState<any>(
		settings?.waitingPeriod
	);

	const [loadWaiting, setLoadWaiting] = useState(false);
	const [loadCredit, setLoadCredit] = useState(false);
	const [loadSms, setLoadSms] = useState(false);
	const [loadInventory, setLoadInventory] = useState(false);
	const [listPcats, setListPCats] = useState([]);

	const [creditLimit, setCreditLimit] = useState(settings?.creditLimit);
	const [sms, setSms] = useState(settings?.salesSms);
	const [inventory, setInventory] = useState(details.business.canOnboard);

	useEffect(() => {
		productCategories();
	}, []);

	const productCategories = async () => {
		try {
			let res = await productService.productCategories(token);
			let arr = res?.filter(
				(r: any) => r.businessId === details.businessId
			);
			setListPCats(arr || []);
		} catch (err) {
			displayError(err, false);
		}
	};

	const changeLimit = async (val: any) => {
		try {
			setLoadWaiting(true);
			setWaitingPeriod(val);
			await basicService.setWaitingPeriod(token, {
				waitingPeriod: val || null,
			});
			setLoadWaiting(false);
			dispatch(getSettings());
			toast.success(`Settings has been changed.`);
		} catch (err) {
			setLoadWaiting(false);
			displayError(err, true);
		}
	};

	const changeCreditLimit = async () => {
		try {
			setLoadCredit(true);
			await basicService.setCreditLimit(token, {
				amount: creditLimit,
			});
			setLoadCredit(false);
			dispatch(getSettings());
			toast.success(`Credit Limit has been updated.`);
		} catch (err) {
			setLoadCredit(false);
			displayError(err, true);
		}
	};

	const changeSms = async (val: boolean) => {
		try {
			setLoadSms(true);
			setSms(val);
			await basicService.enableSmsBusiness(token, {
				enableSms: val,
			});
			setLoadSms(false);
			dispatch(getSettings());
			toast.success(`SMS settings updated.`);
		} catch (err) {
			setLoadSms(false);
			displayError(err, true);
		}
	};

	const changeInventory = async (val: boolean) => {
		try {
			setLoadInventory(true);
			setInventory(val);
			await basicService.importPermit(token, val, details.businessId);
			setLoadInventory(false);
			dispatch(userProfile(details.id));
			toast.success(`Import Inventory Settings Updated`);
		} catch (err) {
			setLoadInventory(false);
			displayError(err, true);
		}
	};

	return (
		<div className="mt-3">
			<AccountBox>
				<div className="waiting">
					<div>
						<h6>Set Waiting Time</h6>
						<p>
							Secure completed transactions within a time limit
							and require your approval for withdrawals
							afterwards.
						</p>
					</div>

					{loadWaiting ? (
						<Spinner variant="primary" />
					) : (
						<FormCheck
							type="switch"
							id="custom-switch"
							checked={waitingPeriod ? true : false}
							onChange={(e) =>
								changeLimit(e.target.checked ? 5 : null)
							}
						/>
					)}
				</div>
				{waitingPeriod && (
					<div className="waiting mt-3">
						<div>
							<p>
								Set-up the duration during which employees can
								freely withdraw completed transactions
							</p>
						</div>
						<div className="input">
							<select
								disabled={loadWaiting}
								value={waitingPeriod}
								onChange={(e) =>
									setWaitingPeriod(e.target.value)
								}
							>
								<option value={"1"}>1 minute</option>
								<option value={"5"}>5 minutes</option>
								<option value={"10"}>10 minutes</option>
								<option value={"15"}>15 minutes</option>
								<option value={"30"}>30 minutes</option>
								<option value={"60"}>60 minutes</option>
								<option value={"120"}>120 minutes</option>
							</select>
						</div>

						<MainButton
							disabled={loadWaiting}
							onClick={() => changeLimit(waitingPeriod)}
						>
							<span>Set</span>
						</MainButton>
					</div>
				)}
			</AccountBox>
			<AccountBox>
				<h6>Set-up Credit Limit for Walk in Customers</h6>
				<Flex className="mt-4">
					<div className="input me-4 mb-2">
						<CurrencyInput
							id="input-example"
							name="input-name"
							decimalsLimit={2}
							onValueChange={(values) => {
								setCreditLimit(values ? Number(values) : 0);
							}}
							prefix={`${currency} `}
							value={creditLimit}
							disabled={loadCredit}
						/>
					</div>
					{loadCredit ? (
						<Spinner variant="primary" />
					) : (
						<MainButton
							disabled={loadCredit}
							onClick={() => changeCreditLimit()}
							className="mb-2"
						>
							<span>Set</span>
						</MainButton>
					)}
				</Flex>
			</AccountBox>
			<AccountBox>
				<h6 className="mb-3">Set-up SMS for Walk in Customers</h6>
				{loadSms ? (
					<Spinner variant="primary" />
				) : (
					<FormCheck
						type="switch"
						id="custom-switch"
						checked={sms}
						onChange={(e) => changeSms(e.target.checked)}
						label="Enable SMS"
					/>
				)}
			</AccountBox>
			<AccountBox>
				<h6 className="mb-3">Import Inventories</h6>

				{loadInventory ? (
					<Spinner variant="primary" />
				) : (
					<FormCheck
						type="switch"
						id="custom-switch"
						checked={inventory}
						onChange={(e) => changeInventory(e.target.checked)}
						label="Allow Import Inventories"
					/>
				)}
			</AccountBox>
			<ProductCategories
				list={listPcats}
				onRefresh={() => productCategories()}
			/>
		</div>
	);
};

export default Account;
