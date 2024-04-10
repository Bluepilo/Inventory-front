import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import TitleCover from "../../../components/TitleCover";
import { IoCartSharp } from "react-icons/io5";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/supply.png";
import ModalComponent from "../../../components/ModalComponent";
import NewSupplier from "../../../components/Customer/NewSupplier";
import { UseDebounce } from "../../../utils/hooks";
import customerService from "../../../redux/features/customer/customer-services";
import { BasicSearch } from "../../../components/Filters/BasicInputs";
import { SummaryCard } from "../../../styles/dashboard.styles";
import { formatCurrency } from "../../../utils/currency";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import { Table, TableComponent } from "../../../styles/table.styles";
import dateFormat from "dateformat";
import { Link, useNavigate } from "react-router-dom";
import DropDowns from "../../../components/Customer/DropDowns";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import ConfirmModal from "../../../components/Modals/ConfirmModal";
import { toast } from "react-toastify";
import { displayError } from "../../../utils/errors";

const Supplier = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);
	const [lists, setLists] = useState<any>({});
	const [summary, setSummary] = useState<any>({});
	const [ids, setIds] = useState<any>({});
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [load, setLoad] = useState(false);

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}`;

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchSuppliers();
		} else {
			listSuppliers();
		}
		getSummary();
	}, [filters, debouncedSearch]);

	const searchSuppliers = async () => {
		try {
			setLoad(true);
			let res = await customerService.searchSuppliers(
				token,
				filters,
				debouncedSearch
			);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const listSuppliers = async () => {
		try {
			setLoad(true);
			let res = await customerService.getSuppliers(token, filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getSummary = async () => {
		try {
			let res = await customerService.supplierSummary(
				token,
				debouncedSearch
			);
			setSummary(res);
		} catch (err) {}
	};

	const suspendHandler = async () => {
		try {
			setOpenConfirmation(false);
			await customerService.actionUser(
				token,
				"supplier",
				ids.id,
				ids.isActive ? "deactivate" : "activate",
				{ id: ids.id }
			);
			toast.success(
				`Subdealer has been ${ids.isActive ? "Suspended" : "Activated"}`
			);
			listSuppliers();
		} catch (err) {
			displayError(err, true);
		}
	};

	return (
		<>
			{details.business.onboardingSteps?.supplier === "completed" ? (
				<div>
					<TitleCover
						title="Suppliers"
						dataCount={lists?.count}
						button="Add Supplier"
						buttonIcon={<IoCartSharp />}
						buttonClick={() => {
							setIds(null);
							setOpenModal(true);
						}}
					/>
					<div className="mt-3">
						<div className="row">
							<div className="col-md-6">
								<BasicSearch
									searchVal={search}
									changeSearchVal={setSearch}
									wide="true"
									placeholder="Search by name, address or phone"
								/>
							</div>
						</div>
						<div className="row align-items-center mt-4">
							<div className="col-lg-7 mb-3">
								<SummaryCard>
									<div>
										<h6>Total in Wallets: </h6>
										<h6>
											{summary?.totalInWallet
												? `${currency} ${formatCurrency(
														summary.totalInWallet
												  )}`
												: "--"}
										</h6>
									</div>

									<div>
										<h6>Total Debts in Wallets:</h6>
										<h6>
											{summary?.totalDebts
												? `${currency} ${formatCurrency(
														summary.totalDebts
												  )}`
												: "--"}
										</h6>
									</div>
								</SummaryCard>
							</div>
						</div>
						<div className="mt-4">
							<TableComponent>
								<div className="table-responsive">
									<Table className="table">
										<thead>
											<tr>
												<th>Last Transaction</th>
												<th>Supplier Name</th>
												<th>Phone</th>
												<th className="price">
													Wallet Balance
												</th>

												<th>Status</th>
												<th>Actions</th>
											</tr>
										</thead>
										{!load && (
											<tbody>
												{lists?.rows?.map((l: any) => (
													<tr key={l.id}>
														<td>
															{dateFormat(
																l.updatedAt,
																"mmm dd, yyyy"
															)}
														</td>

														<td className="link">
															<Link
																to={`${l.id}`}
															>
																{l.fullName?.slice(
																	0,
																	12
																)}{" "}
																{l.fullName
																	?.length >
																	12 && "..."}
															</Link>
														</td>
														<td>{l.phoneNo}</td>
														<td
															className="price"
															style={{
																color:
																	l.balance >
																	0
																		? "inherit"
																		: "red",
															}}
														>
															{currency}{" "}
															{formatCurrency(
																l.balance
															)}
														</td>

														<td className="status">
															<img
																src={
																	l.isActive
																		? SuccessIcon
																		: FailedIcon
																}
															/>
														</td>
														<td>
															<DropDowns
																active={
																	l.isActive
																}
																suspend={() => {
																	setIds(l);
																	setOpenConfirmation(
																		true
																	);
																}}
																onNavigate={() =>
																	navigate(
																		`${l.id}`
																	)
																}
																onEdit={() => {
																	setOpenModal(
																		true
																	);
																	setIds(l);
																}}
															/>
														</td>
													</tr>
												))}
											</tbody>
										)}
									</Table>
								</div>
								{load && <SkeletonTable />}
							</TableComponent>
							{lists?.count ? (
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
					title={"Suppliers"}
					img={CoverImg}
					cover="Create Supplier"
					desc={
						"Maintain a database of suppliers information and track your financial records via an integrated supplier wallet design."
					}
					btnTitle={"Create Supplier"}
					linkTo={() => setOpenModal(true)}
				/>
			)}
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title="Supplier"
			>
				<NewSupplier
					submit={(arg: any) => {
						setOpenModal(false);
						listSuppliers();
					}}
					editInfo={ids}
				/>
			</ModalComponent>
			<ConfirmModal
				open={openConfirmation}
				close={() => setOpenConfirmation(false)}
				confirm={suspendHandler}
			/>
		</>
	);
};

export default Supplier;
