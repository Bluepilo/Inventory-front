import { useEffect, useState } from "react";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/expense.png";
import { useAppSelector } from "../../../redux/hooks";
import { TiTag } from "react-icons/ti";
import TitleCover from "../../../components/TitleCover";
import Filters from "../../../components/Filters";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import { CheckBoxPrint, SummaryCard } from "../../../styles/dashboard.styles";
import expenseService from "../../../redux/features/expense/expense-service";
import { formatCurrency } from "../../../utils/currency";
import { TableComponent } from "../../../styles/table.styles";
import RecurrentTable from "../../../components/Expense/RecurrentTable";
import ExpenseTable from "../../../components/Expense/ExpenseTable";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import ModalComponent from "../../../components/ModalComponent";
import NewExpense from "../../../components/Expense/NewExpense";
import { haveRole } from "../../../utils/role";

const Expenses = () => {
	const { details, currency } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});
	const [openModal, setOpenModal] = useState(false);
	const [recurrent, setRecurrent] = useState(false);
	const [load, setLoad] = useState(false);

	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [statusId, setStatusId] = useState<OptionProp | null>(null);
	const [expenseCategory, setExpenseCategory] = useState<OptionProp | null>(
		null
	);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setShopId(null);
		setStatusId(null);
		setExpenseCategory(null);
		setDateType({ label: "This Month", value: "month" });
	};

	let filters = `?page=${page}&limit=${limit}&expenseCategoryId=${
		expenseCategory?.value || ""
	}&shopId=${shopId?.value || ""}&status=${
		statusId?.value || ""
	}&startDate=${startDate}&endDate=${endDate}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (recurrent) {
			loadRecurrent();
		} else {
			loadExpense();
		}
	}, [filters, recurrent]);

	const loadExpense = async () => {
		setLists({});
		try {
			setLoad(true);
			let res = await expenseService.getExpenses(filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const loadRecurrent = async () => {
		setLists({});
		try {
			setLoad(true);
			let res = await expenseService.getRecurrentExpenses(filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<>
			{details?.role?.isAdmin ||
			details?.business?.onboardingSteps?.expense === "completed" ? (
				<div>
					<TitleCover
						title="My Expenses"
						dataCount={lists?.count}
						button={
							haveRole(details.businessRoleId)
								.isBusinessActioners || details.role?.isAdmin
								? "Add Expense"
								: ""
						}
						buttonIcon={<TiTag />}
						buttonClick={() => {
							setOpenModal(true);
						}}
					/>
					<div>
						<Filters
							startDate={startDate}
							changeStartDate={setStartDate}
							endDate={endDate}
							changeEndDate={setEndDate}
							shopId={shopId}
							changeShopId={setShopId}
							clearValues={clearFilters}
							statusId={statusId}
							changeStatusId={setStatusId}
							expenseCategory={expenseCategory}
							changeExpenseCategory={setExpenseCategory}
							dateType={dateType}
							changeDateType={setDateType}
						/>
						<div className="row align-items-center mt-4">
							<div className="col-lg-6 mb-3">
								<SummaryCard>
									<div>
										<h6>
											Total{" "}
											{recurrent
												? "Reoccurence"
												: "Expense"}{" "}
											Cost:{" "}
										</h6>
										<h6>
											{lists?.rows
												? `${currency} ${formatCurrency(
														lists?.rows?.reduce(
															(a: any, b: any) =>
																a +
																Number(b.cost),
															0
														)
												  )}`
												: "--"}
										</h6>
									</div>
								</SummaryCard>
							</div>
							<div className="col-lg-6 mb-3">
								<CheckBoxPrint>
									<div className="checks">
										<input
											type="checkbox"
											checked={recurrent}
											onChange={(e) =>
												setRecurrent(e.target.checked)
											}
											name="recurrent"
										/>
										<label htmlFor="recurrent">
											List Recurrent Expenses
										</label>
									</div>
								</CheckBoxPrint>
							</div>
						</div>
						<div className="mt-4">
							<TableComponent>
								<div className="table-responsive">
									{recurrent ? (
										<RecurrentTable
											data={lists?.rows}
											load={load}
											currency={currency}
											setLoad={setLoad}
											reload={loadRecurrent}
										/>
									) : (
										<ExpenseTable
											data={lists?.rows}
											load={load}
											reload={() => loadExpense()}
											currency={currency}
										/>
									)}
								</div>
								{load && <SkeletonTable />}
							</TableComponent>
							{!load && lists?.count ? (
								<Paginate
									changeLimit={(l) => setLimit(l)}
									limit={lists.limit}
									count={lists.count}
									pageNumber={page}
									onPrev={(n) => setPage(n)}
									onNext={(n) => setPage(n)}
								/>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			) : (
				<NewPage
					title={"Expense"}
					img={CoverImg}
					cover="Manage your Expense"
					desc={`You can now record your expense in categories and also Setup auto re-occurrent expenditure that logs automatically based on the set dates. Upload your prove of expense documents and generate expense reports for financial analysis.`}
					btnTitle={"Record Expense"}
					linkTo={() => {
						setOpenModal(true);
					}}
				/>
			)}
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title="Record Expense"
			>
				<NewExpense
					submit={() => {
						setOpenModal(false);
						loadExpense();
					}}
				/>
			</ModalComponent>
		</>
	);
};

export default Expenses;
