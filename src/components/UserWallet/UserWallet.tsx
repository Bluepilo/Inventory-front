import { useEffect, useState } from "react";
import Filters from "../Filters";
import { OptionProp } from "../Filters/BasicInputs";
import { WalletDiv } from "../../styles/basic.styles";
import WalletIcon from "../../assets/icons/wallet.svg";
import WalletRedIcon from "../../assets/icons/wallet-red.svg";
import { MainButton } from "../../styles/links.styles";
import { Table } from "../../styles/table.styles";
import customerService from "../../redux/features/customer/customer-services";
import { useAppSelector } from "../../redux/hooks";
import SkeletonWallet from "../Loaders/SkeletonWallet";
import { formatCurrency } from "../../utils/currency";
import dateFormat from "dateformat";
import ModalComponent from "../ModalComponent";
import LoadWallet from "./LoadWallet";
import WithdrawWallet from "./WithdrawWallet";

const UserWallet = ({
	userType,
	id,
}: {
	userType: string;
	id: string | number;
}) => {
	const { token } = useAppSelector((state) => state.auth);
	const { settings } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [transactionType, setTransactionType] = useState<OptionProp | null>(
		null
	);
	const [transactionList, setTransactionList] = useState([]);
	const [userDetails, setUserDetails] = useState<any>({});
	const [openDrop, setOpenDrop] = useState(false);
	const [openType, setOpenType] = useState("");

	let filters = `?startDate=${startDate}&endDate=${endDate}&transactionType=${
		transactionType?.value || ""
	}`;

	const getInitials = (string: any) => {
		let names = string.split(" "),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	};

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setTransactionType(null);
	};

	const fetchUser = async () => {
		try {
			setLoad(true);
			let res = await customerService.userDetails(token, userType, id);
			setLoad(false);
			if (userType === "supplier") {
				setUserDetails(res.supplier);
			} else {
				setUserDetails(res);
			}
		} catch (err) {
			setLoad(false);
		}
	};

	const fetchUserTransactions = async () => {
		try {
			let res = await customerService.userTransactions(
				token,
				userType,
				id,
				filters
			);
			if (res?.transactions) {
				setTransactionList(res.transactions);
			}
		} catch (err) {}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	useEffect(() => {
		fetchUserTransactions();
	}, [filters]);

	return (
		<div>
			{load ? (
				<SkeletonWallet />
			) : (
				userDetails?.id && (
					<>
						<Filters
							startDate={startDate}
							changeStartDate={setStartDate}
							endDate={endDate}
							changeEndDate={setEndDate}
							transactionType={transactionType}
							changeTransactionType={setTransactionType}
							clearValues={clearFilters}
						/>
						<WalletDiv className="shadow-sm">
							<div className="info">
								<div>
									<span className="initials">
										{getInitials(userDetails.fullName)}
									</span>
									<h6>{userDetails.fullName}</h6>
								</div>
								<p>{userDetails.phoneNo}</p>
								<p>{userDetails.email}</p>
								<p>{userDetails.address}</p>
							</div>
							<div className="balance">
								<div className="amount">
									<div>
										<p>Wallet Balance</p>
										<h6>
											₦{" "}
											{formatCurrency(
												userDetails.balance
											)}
										</h6>
									</div>
									{userType !== "supplier" && (
										<div>
											<p>Credit Limit</p>
											<h6>
												₦{" "}
												{formatCurrency(
													userType === "customer"
														? settings?.creditLimit
														: userDetails.creditLimit
												)}
											</h6>
										</div>
									)}
								</div>
								<div className="buttons">
									<MainButton
										onClick={() => {
											setOpenType("load");
											setOpenDrop(true);
										}}
									>
										<img src={WalletIcon} />
										<span>Load Wallet</span>
									</MainButton>
									<button
										className="custom"
										onClick={() => {
											setOpenType("withdraw");
											setOpenDrop(true);
										}}
									>
										<img src={WalletRedIcon} />
										<span>Withdraw from Wallet</span>
									</button>
								</div>
							</div>
						</WalletDiv>
						<h6 className="mt-3">Transaction Report</h6>
						<div className="table-responsive mt-3">
							<Table className="table">
								<thead>
									<tr>
										<th>Date</th>
										<th>Staff</th>
										<th>Transaction Type</th>
										<th className="price">Credit</th>
										<th className="price">Debit</th>
										<th className="price">Balance</th>
									</tr>
								</thead>
								<tbody>
									{transactionList?.map((tr: any) => (
										<tr key={tr.id}>
											<td>
												{dateFormat(
													tr.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td>{tr.user?.fullName}</td>
											<td>{tr.transactionType?.name}</td>
											<td className="price">
												{tr.mode === "out"
													? "-"
													: `₦ ${formatCurrency(
															tr.amountPaid
													  )}`}
											</td>
											<td className="price">
												{tr.mode === "in"
													? "-"
													: `₦ ${formatCurrency(
															tr.amountPaid
													  )}`}
											</td>
											<td className="price">
												₦{" "}
												{formatCurrency(
													tr.balanceAfter
												)}
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</>
				)
			)}
			<ModalComponent
				open={openDrop}
				close={() => setOpenDrop(false)}
				title={
					openType === "load"
						? "Load Wallet"
						: openType === "withdraw"
						? "Withdraw from Wallet"
						: `Wallet`
				}
			>
				{openType === "load" ? (
					<LoadWallet
						close={() => {
							setOpenDrop(false);
							fetchUserTransactions();
						}}
						userType={userType}
						id={id}
					/>
				) : openType === "withdraw" ? (
					<WithdrawWallet
						close={() => {
							setOpenDrop(false);
							fetchUserTransactions();
						}}
						userType={userType}
						id={id}
					/>
				) : (
					<></>
				)}
			</ModalComponent>
		</div>
	);
};

export default UserWallet;
