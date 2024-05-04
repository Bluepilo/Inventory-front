import { useEffect, useState } from "react";
import {
	PaymentSummaryBox,
	UserBox,
	UserInfoBox,
} from "../../styles/sale.styles";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import { MainButton } from "../../styles/links.styles";
import AddIcon from "../../assets/icons/user-add.svg";
import ModalComponent from "../ModalComponent";
import NewSupplier from "../Customer/NewSupplier";
import customerService from "../../redux/features/customer/customer-services";
import { useAppSelector } from "../../redux/hooks";
import { formatCurrency } from "../../utils/currency";
import { FaTimes } from "react-icons/fa";
import CurrencyInput from "react-currency-input-field";
import PayIcon from "../../assets/icons/pay.svg";
import CommentBox from "../Sales/CommentBox";

interface Props {
	onPrev: () => void;
	discountApplied: number;
	totalAmount: number;
	complete: (arg: any) => void;
}

const SupplierSelect = ({
	onPrev,
	totalAmount,
	discountApplied,
	complete,
}: Props) => {
	const { token, details } = useAppSelector((state) => state.auth);
	const { methods } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
	const [list, setList] = useState<OptionProp[]>([]);
	const [openCreate, setOpenCreate] = useState(false);
	const [amountPaid, setAmountPaid] = useState(0);
	const [selectedPayment, setSelectedPayment] = useState<OptionProp | null>(
		null
	);
	const [openModal, setOpenModal] = useState(false);

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	useEffect(() => {
		fetchSuppliers();
	}, []);

	const fetchSuppliers = async () => {
		try {
			setLoad(true);
			let res = await customerService.getSuppliers(token, "?all=true");

			setLoad(false);
			let response = res?.length > 0;
			if (response) {
				let filter = res.filter((r: any) => r.isActive);

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

	const openComment = () => {
		if (!selectedCustomer?.value) {
			alert(`Please select a Supplier to proceed`);
			return;
		}

		if (!selectedPayment?.value) {
			alert(`Please select a payment method to proceed.`);
			return;
		}
		setOpenModal(true);
	};

	const payHandler = (comment: string) => {
		setOpenModal(false);
		let data = {
			supplierId: selectedCustomer.id,
			comment,
			totalAmountPaid: amountPaid,
			paymentMethodId: selectedPayment?.value,
			supplierBalance: selectedCustomer?.balance,
		};
		console.log(data);
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
						<span>Supplier Details</span>
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
							<span>New Supplier</span>
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
										{currency}
										{formatCurrency(
											selectedCustomer.balance
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
							{currency}{" "}
							{formatCurrency(totalAmount - discountApplied)}
						</h6>
					</div>
					<div className="line">
						<h6>Amount Paid</h6>
						<div className="flx">
							<CurrencyInput
								id="input-example"
								name="input-name"
								decimalsLimit={2}
								onValueChange={(values) => {
									setAmountPaid(values ? Number(values) : 0);
								}}
								prefix={`${currency} `}
								value={amountPaid}
							/>
						</div>
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
						<MainButton right="true" onClick={() => openComment()}>
							<span>Complete Transaction</span>
							<img src={PayIcon} />
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
				<NewSupplier
					submit={(arg: any) => {
						setOpenCreate(false);
						console.log(arg);
						setSelectedCustomer(arg);
					}}
					editInfo={null}
				/>
			</ModalComponent>
		</div>
	);
};

export default SupplierSelect;
