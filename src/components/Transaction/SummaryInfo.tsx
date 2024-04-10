import { CashSummaryCard } from "../../styles/dashboard.styles";
import CashInIcon from "../../assets/icons/cash-in.svg";
import CashOutIcon from "../../assets/icons/cash-out.svg";
import WalletIcon from "../../assets/icons/wallet-dark.svg";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../redux/hooks";

const SummaryInfo = ({
	transactions,
	isCustomer,
}: {
	transactions: any;
	isCustomer: boolean;
}) => {
	const { details } = useAppSelector((state) => state.auth);

	const totalInPayment = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.mode === "in") return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};

	const totalOutPayment = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.mode !== "in") return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};
	const totalWithdrawnPayment = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Withdrawn Payment")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};
	const deposit = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Deposit")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};
	const supplierDeposit = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Supplier Deposit")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};
	const sale = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Sale")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};

	const withdrawnSale = () => {
		let a = transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Withdrawn Sale")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
		let b = transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Product return")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
		return a + b;
	};
	const purchases = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Purchase")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};

	const withdrawnPurchase = () => {
		return transactions.reduce((prev: any, trn: any) => {
			if (trn.transactionType.name === "Withdrawn Purchase")
				return prev + +trn.amountPaid;
			return prev;
		}, 0);
	};

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	return transactions && Array.isArray(transactions) ? (
		<div className="row">
			<div className="col-lg-4 col-md-6">
				<CashSummaryCard>
					<div className="top">
						<div className="icon">
							<img src={CashInIcon} />
						</div>
						<div>
							<h6>
								{currency} {formatCurrency(totalInPayment())}
							</h6>
							<p>Total Cash In</p>
						</div>
					</div>
					<div className="bottom">
						<div>
							<h6 className="first">Total Cash Out:</h6>
							<h6>
								{currency} {formatCurrency(totalOutPayment())}
							</h6>
						</div>
						<div>
							<h6 className="first">Difference:</h6>
							<h6>
								{currency}{" "}
								{formatCurrency(
									totalInPayment() - totalOutPayment()
								)}
							</h6>
						</div>
					</div>
				</CashSummaryCard>
			</div>
			<div className="col-lg-4 col-md-6">
				<CashSummaryCard>
					<div className="top">
						<div className="icon">
							<img src={WalletIcon} />
						</div>
						<div>
							<h6>
								{currency} {formatCurrency(deposit())}
							</h6>
							<p>Total Deposits</p>
						</div>
					</div>
					<div className="bottom">
						<div>
							<h6 className="first">Total Withdrawn Payments:</h6>
							<h6>₦ {formatCurrency(totalWithdrawnPayment())}</h6>
						</div>
						<div>
							<h6 className="first">Difference:</h6>
							<h6>
								₦{" "}
								{formatCurrency(
									deposit() - totalWithdrawnPayment()
								)}
							</h6>
						</div>
					</div>
				</CashSummaryCard>
			</div>
			<div className="col-lg-4 col-md-6">
				<CashSummaryCard>
					<div className="top">
						<div className="icon">
							<img src={CashOutIcon} />
						</div>
						<div>
							<h6>
								₦{" "}
								{formatCurrency(
									isCustomer ? sale() : purchases()
								)}
							</h6>
							<p>Total {isCustomer ? "Sales" : "Purchases"}</p>
						</div>
					</div>
					<div className="bottom">
						<div>
							<h6 className="first">
								Total Withdrawn{" "}
								{isCustomer ? "Sales" : "Purchases"}:
							</h6>
							<h6>
								₦{" "}
								{formatCurrency(
									isCustomer
										? withdrawnSale()
										: withdrawnPurchase()
								)}
							</h6>
						</div>
						<div>
							<h6 className="first">Difference:</h6>
							<h6>
								₦{" "}
								{formatCurrency(
									isCustomer
										? sale() - withdrawnSale()
										: purchases() - withdrawnPurchase()
								)}
							</h6>
						</div>
					</div>
				</CashSummaryCard>
			</div>
		</div>
	) : (
		<></>
	);
};

export default SummaryInfo;
