import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { useAppSelector } from "../../../redux/hooks";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import { SwitchDiv } from "../../../styles/basic.styles";
import Filters from "../../../components/Filters";
import salesService from "../../../redux/features/sales/sales-service";
import SummaryInfo from "../../../components/Transaction/SummaryInfo";
import { Table, TableComponent } from "../../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../utils/currency";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import ConfirmModal from "../../../components/Modals/ConfirmModal";
import { displayError } from "../../../utils/errors";
import { toast } from "react-toastify";
import DrawerInfo from "../../../components/Transaction/DrawerInfo";
import { haveRole } from "../../../utils/role";

const Transactions = () => {
	const { token, details: user } = useAppSelector((state) => state.auth);

	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [methodId, setMethodId] = useState<OptionProp | null>(null);
	const [transactionId, setTransactionId] = useState<OptionProp | null>(null);
	const [page] = useState(1);
	const [limit] = useState(20);

	const [load, setLoad] = useState(false);
	const [lists, setList] = useState<any>({});

	const [isCustomer, setIsCustomer] = useState(true);

	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [details, setDetails] = useState<any>(null);

	let filters = `?page-${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&type=${
		isCustomer ? "customer" : "supplier"
	}&status=all&transactionType=${transactionId?.value || ""}&shopId=${
		shopId?.value || ""
	}&paymentMethod=${methodId?.value || ""}`;

	const currency =
		user.business?.currency?.symbol || user.business?.currencyCode;

	useEffect(() => {
		window.scrollTo(0, 0);
		getTransactions();
	}, [filters]);

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setMethodId(null);
		setTransactionId(null);
		setShopId(null);
	};

	const getTransactions = async () => {
		try {
			setLoad(true);
			let res = await salesService.getTransactions(token, filters);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const confirmHandler = async () => {
		try {
			setOpenConfirmation(false);
			setLoad(true);
			await salesService.verifyTransactions(token, details?.id);
			setLoad(false);
			getTransactions();
			toast.success("Transaction has been verified!");
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover
				title="Transactions"
				dataCount={lists?.transactions?.length}
			/>
			<SwitchDiv>
				<div
					className={isCustomer ? "active" : ""}
					onClick={() => setIsCustomer(true)}
				>
					Customer Transactions
				</div>
				<div
					className={isCustomer ? "" : "active"}
					onClick={() => setIsCustomer(false)}
				>
					Supplier Transactions
				</div>
			</SwitchDiv>
			<Filters
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				shopId={shopId}
				changeShopId={setShopId}
				methodId={methodId}
				changeMethodId={setMethodId}
				clearValues={clearFilters}
				transactionType={transactionId}
				changeTransactionType={setTransactionId}
			/>

			<SummaryInfo
				transactions={lists?.transactions}
				isCustomer={isCustomer}
			/>

			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Customer</th>
									<th>Category</th>
									<th>Staff</th>
									<th>Shop</th>
									<th>Purpose</th>
									<th>Method</th>
									<th>Credit</th>
									<th>Debit</th>
									{haveRole(user.roleId).isBusinessAdmin && (
										<th>Verify</th>
									)}
								</tr>
							</thead>
							{!load && (
								<tbody>
									{lists?.transactions?.map((tr: any) => (
										<tr key={tr.id}>
											<td>
												{dateFormat(
													tr.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td>{tr.customerName}</td>
											<td>
												{isCustomer
													? tr.subdealerId
														? "Subdealer"
														: "Walk-in Customer"
													: "Supplier"}
											</td>
											<td>{tr.user?.fullName}</td>
											<td>{tr.shop?.name}</td>
											<td className="link">
												<a
													href="#"
													onClick={(e) => {
														e.preventDefault();
														setDetails(tr);
														setOpenDrawer(true);
													}}
												>
													{tr.transactionType?.name}
												</a>
											</td>
											<td>{tr.paymentMethod?.name}</td>
											<td>
												{tr.mode === "in"
													? `${currency} ${formatCurrency(
															tr.amountPaid
													  )}`
													: "--"}
											</td>
											<td>
												{tr.mode === "out"
													? `${currency} ${formatCurrency(
															tr.amountPaid
													  )}`
													: "--"}
											</td>
											{haveRole(user.roleId)
												.isBusinessAdmin && (
												<td className="bbtn">
													<button
														onClick={() => {
															if (!tr.verified) {
																setDetails(tr);
																setOpenConfirmation(
																	true
																);
															}
														}}
													>
														{tr.verified ? (
															<MdCheckBox
																color="#0241FF"
																size={20}
															/>
														) : (
															<MdCheckBoxOutlineBlank
																size={20}
															/>
														)}
													</button>
												</td>
											)}
										</tr>
									))}
								</tbody>
							)}
						</Table>
					</div>
					{load && <SkeletonTable />}
					<ConfirmModal
						open={openConfirmation}
						close={() => setOpenConfirmation(false)}
						confirm={confirmHandler}
						label="Proceeding with this confirm payment."
					/>
					{openDrawer && (
						<DrawerInfo
							details={details}
							close={() => setOpenDrawer(false)}
						/>
					)}
				</TableComponent>
			</div>
		</div>
	);
};

export default Transactions;
