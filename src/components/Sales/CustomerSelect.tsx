import { useEffect, useState } from "react";
import {
	PaymentSummaryBox,
	UserBox,
	UserInfoBox,
} from "../../styles/sale.styles";
import { MainButton } from "../../styles/links.styles";
import AddIcon from "../../assets/icons/user-add.svg";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import basicService from "../../redux/features/basic/basic-service";
import { useAppSelector } from "../../redux/hooks";
import { FaTimes } from "react-icons/fa";
import { formatCurrency } from "../../utils/currency";
import CurrencyInput from "react-currency-input-field";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import PayIcon from "../../assets/icons/pay.svg";
import DepositIcon from "../../assets/icons/deposit.svg";
import ModalComponent from "../ModalComponent";
import CommentBox from "./CommentBox";
import NewCustomer from "../Customer/NewCustomer";
import NewSubdealer from "../Customer/NewSubdealer";

interface Props {
	type: string;
	onPrev: () => void;
	discountApplied: number;
	totalAmount: number;
	complete: (arg: any) => void;
}

const CustomerSelect = ({
	type,
	onPrev,
	totalAmount,
	discountApplied,
	complete,
}: Props) => {
	const { token } = useAppSelector((state) => state.auth);
	const { methods, settings } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
	const [selectedPayment, setSelectedPayment] = useState<OptionProp | null>(
		null
	);
	const [list, setList] = useState<OptionProp[]>([]);
	const [amountReceived, setAmountReceived] = useState(0);
	const [minAmount, setMinAmount] = useState(0);

	const [errorAmount, setErrorAmount] = useState(false);
	const [isDeposit, setIsDeposit] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	useEffect(() => {
		fetchCustomer();
	}, [type]);

	useEffect(() => {
		if (selectedCustomer?.value) {
			getMinAmountDue();
		}
	}, [selectedCustomer]);

	const fetchCustomer = async () => {
		try {
			setLoad(true);
			let res;
			if (type === "walkin") {
				res = await basicService.listWalkIns(token, "?all=true");
			} else {
				res = await basicService.listSubDealers(token, "?all=true");
			}
			setLoad(false);
			let response = res?.data?.length > 0;
			if (response) {
				let filter = res.data.filter((r: any) => r.isActive);

				let arr = filter.map((r: any) => {
					return {
						...r,
						label: `${r.fullName} - ${r.phoneNo}`,
						value: r.id,
					};
				});
				setList(arr);
			}
		} catch (err) {
			setLoad(false);
		}
	};

	const getInitials = (string: any) => {
		let names = string.split(" "),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	};

	const getMinAmountDue = () => {
		const minimumAmountDue =
			totalAmount -
			(Number(selectedCustomer?.balance) +
				Number(
					selectedCustomer?.creditLimit ||
						Number(settings?.creditLimit)
				));

		setMinAmount(minimumAmountDue);
	};

	const getDeficit = (paid: number) => {
		let amount = minAmount - Number(amountReceived);

		let val = isNaN(amount) || !errorAmount ? 0 : amount;
		return val > paid ? `₦0.00` : `₦${formatCurrency(Math.abs(val))}`;
	};

	const validateAmount = (val: number) => {
		if (minAmount > val) {
			setErrorAmount(true);
		} else {
			setErrorAmount(false);
		}
		setAmountReceived(val);
	};

	const openComment = (deposit: boolean) => {
		if (!selectedCustomer?.value) {
			alert(`Please select a ${type} to proceed`);
			return;
		}

		if (!selectedPayment?.value) {
			alert(`Please select a payment method to proceed.`);
			return;
		}
		setIsDeposit(deposit);
		setOpenModal(true);
	};

	const payHandler = (comment: string) => {
		setOpenModal(false);
		let data = {
			customerId: type === "walkin" ? selectedCustomer.id : "",
			customerName: selectedCustomer.fullName,
			customerEmail: selectedCustomer.email,
			customerAddress: selectedCustomer.address,
			customerPhoneNo: selectedCustomer.phoneNo,
			isDeposit,
			comment,
			amountPaid: amountReceived,
			subdealerId: type === "subdealer" ? selectedCustomer.id : "",
			paymentMethodId: selectedPayment?.value,
		};
		complete(data);
	};

	return (
		<div className="row mt-3">
			<div className="col-lg-6 mb-3">
				<UserBox>
					<h5 className="title">
						<button onClick={() => onPrev()}>
							<IoArrowBackCircleOutline size={22} />
						</button>
						<span>
							{type == "subdealer" ? "Subdealer" : "Customer"}{" "}
							Details
						</span>
					</h5>
					<div className="mt-3 head">
						<div className="input">
							<DropDownSelect
								placeholder="Search Name or Phone Number"
								value={selectedCustomer}
								options={list}
								changeSelected={setSelectedCustomer}
								loading={load}
							/>
						</div>
						<MainButton onClick={() => setOpenCreate(true)}>
							<img src={AddIcon} />
							<span>
								New{" "}
								{type == "subdealer" ? "Subdealer" : "Customer"}
							</span>
						</MainButton>
					</div>
					{selectedCustomer?.value && (
						<UserInfoBox>
							<div className="info">
								<span className="initials">
									{getInitials(selectedCustomer.fullName)}
								</span>
								<p>{selectedCustomer.fullName}</p>
							</div>
							<p>{selectedCustomer.phoneNo}</p>
							<p>{selectedCustomer.email}</p>
							<div className="balance">
								<div>
									<h6>Wallet Balance</h6>
									<h4>
										₦
										{formatCurrency(
											selectedCustomer.balance
										)}
									</h4>
								</div>
								<div>
									<h6>Credit Limit</h6>
									<h4>
										₦{" "}
										{formatCurrency(
											selectedCustomer.creditLimit ||
												settings.creditLimit
										)}
									</h4>
								</div>
							</div>
							<button
								className="cancel"
								onClick={() => setSelectedCustomer(null)}
							>
								<FaTimes />
							</button>
						</UserInfoBox>
					)}
				</UserBox>
			</div>
			<div className="col-lg-6 mb-3">
				<PaymentSummaryBox>
					<div className="line">
						<h6>Total Payment Due</h6>
						<h6>
							₦ {formatCurrency(totalAmount - discountApplied)}
						</h6>
					</div>
					<div className="line">
						<div>
							<h6>Minimum Amount Due</h6>
							<p>
								total payment due - (wallet balance + credit
								limit)
							</p>
						</div>
						<h6>
							₦ {formatCurrency(minAmount > 0 ? minAmount : 0)}
						</h6>
					</div>
					<div className="line">
						<h6>Amount Received</h6>
						<div className="flx">
							<CurrencyInput
								id="input-example"
								name="input-name"
								decimalsLimit={2}
								onValueChange={(values) => {
									validateAmount(values ? Number(values) : 0);
								}}
								prefix={`₦`}
								value={amountReceived}
								style={{
									border: `1px solid ${
										errorAmount ? "#F44336" : "#d9dbeb"
									}`,
								}}
							/>
							{errorAmount && (
								<div className="error">
									Amount Received must be up to Minimum Amount
									Due
								</div>
							)}
						</div>
					</div>
					<div className="line">
						<h6>Deficit</h6>
						<h6>{getDeficit(totalAmount - discountApplied)}</h6>
					</div>
					<div className="mt-3">
						<DropDownSelect
							placeholder="Preferred Payment Method"
							value={selectedPayment}
							options={methods}
							changeSelected={setSelectedPayment}
						/>
					</div>
					<div className="buttons">
						<MainButton
							right="true"
							onClick={() => openComment(false)}
						>
							<span>Complete Payment</span>
							<img src={PayIcon} />
						</MainButton>
						<MainButton
							right="true"
							color="#505BDA"
							bg="#EDEEF0"
							onClick={() => openComment(true)}
						>
							<span>Deposit</span>
							<img src={DepositIcon} />
						</MainButton>
					</div>
				</PaymentSummaryBox>
			</div>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<CommentBox submit={(arg: string) => payHandler(arg)} />
			</ModalComponent>
			<ModalComponent
				open={openCreate}
				close={() => setOpenCreate(false)}
			>
				{type === "walkin" ? (
					<NewCustomer
						submit={(arg: any) => {
							setOpenCreate(false);
							setSelectedCustomer(arg);
						}}
					/>
				) : (
					<NewSubdealer
						submit={(arg: any) => {
							setOpenCreate(false);
							setSelectedCustomer(arg);
						}}
						editInfo={null}
					/>
				)}
			</ModalComponent>
		</div>
	);
};

export default CustomerSelect;
