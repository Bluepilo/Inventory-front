import { useEffect, useState } from "react";
import CoverImg from "../../../../assets/defaults/customer.png";
import { useAppSelector } from "../../../../redux/hooks";
import NewPage from "../../../../components/NewPage";
import TitleCover from "../../../../components/TitleCover";
import { IoCartSharp } from "react-icons/io5";
import ModalComponent from "../../../../components/ModalComponent";
import NewSubdealer from "../../../../components/Customer/NewSubdealer";
import { UseDebounce } from "../../../../utils/hooks";
import customerService from "../../../../redux/features/customer/customer-services";
import { BasicSearch } from "../../../../components/Filters/BasicInputs";
import { SummaryCard } from "../../../../styles/dashboard.styles";
import { formatCurrency } from "../../../../utils/currency";
import { Table, TableComponent } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import { Link, useNavigate } from "react-router-dom";
import SuccessIcon from "../../../../assets/icons/success.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";
import DropDowns from "../../../../components/Customer/DropDowns";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import { displayError, displaySuccess } from "../../../../utils/errors";
import { toast } from "react-toastify";
import { haveRole } from "../../../../utils/role";
import RoleGuard from "../../../../components/RoleGuard";

const Subdealer = () => {
	const navigate = useNavigate();

	const { details, currency } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);
	const [lists, setLists] = useState<any>({});
	const [summary, setSummary] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [ids, setIds] = useState<any>({});
	const [sortConfig, setSortConfig] = useState({
		keys: ["updatedAt", "name", "balance", "creditLimit"],
		direction: "asc",
	});

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&shopId=${details.shopId || ""}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchSubdealers();
		} else {
			listSubdealers();
		}
		getSummary();
	}, [filters, debouncedSearch]);

	const searchSubdealers = async () => {
		try {
			setLoad(true);
			let res = await customerService.searchSubdealers(
				filters,
				debouncedSearch
			);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const listSubdealers = async () => {
		try {
			setLoad(true);
			let res = await customerService.getSubdealers(filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getSummary = async () => {
		try {
			let res = await customerService.subdealerSummary(debouncedSearch);
			setSummary(res);
		} catch (err) {}
	};

	const suspendHandler = async () => {
		try {
			setOpenConfirmation(false);
			await customerService.actionUser(
				"subdealer",
				ids.id,
				ids.isActive ? "suspend" : "activate",
				{ id: ids.id }
			);
			toast.success(
				`Subdealer has been ${ids.isActive ? "Suspended" : "Activated"}`
			);
			listSubdealers();
		} catch (err) {
			displayError(err, true);
		}
	};

	const deleteHandler = async (id: any) => {
		if (window.confirm("Are you sure you want to delete this subdealer?")) {
			try {
				setLoad(true);
				await customerService.deleteUser(id, "subdealer");
				displaySuccess("Subdealer Deleted!");
				listSubdealers();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	const handleSort = (key: string) => {
		let direction = "asc";

		if (sortConfig.keys.includes(key) && sortConfig.direction === "asc") {
			direction = "desc";
		}

		const keys = [key, ...sortConfig.keys.filter((k) => k !== key)];

		const sortedCustomers = [...lists.rows].sort((a, b) => {
			let comparison = 0;

			for (let i = 0; i < keys.length; i++) {
				const sortKey = keys[i];

				if (sortKey === "balance" || sortKey === "creditLimit") {
					const valueA = parseFloat(a[sortKey]) || 0;
					const valueB = parseFloat(b[sortKey]) || 0;
					comparison = valueA - valueB;
				} else {
					const valueA = String(a[sortKey] || "");
					const valueB = String(b[sortKey] || "");
					comparison = valueA.localeCompare(valueB, "en", {
						sensitivity: "base",
					});
				}

				if (comparison !== 0) {
					break;
				}
			}

			return comparison;
		});

		if (direction === "desc") {
			sortedCustomers.reverse();
		}

		setSortConfig({ keys: [key], direction });
		setLists({ ...lists, rows: sortedCustomers });
	};

	return (
		<>
			{details.business.onboardingSteps?.subdealer === "completed" ? (
				<div>
					<TitleCover
						title="Subdealers"
						dataCount={lists?.count}
						button={
							haveRole(details.businessRoleId).isBusinessActioners
								? "Add Subdealer"
								: ""
						}
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
												<th
													className="point"
													onClick={() =>
														handleSort("updatedAt")
													}
												>
													Last Transaction{" "}
													{sortConfig.keys.includes(
														"updatedAt"
													) && (
														<span
															style={{
																cursor: "pointer",
															}}
														>
															{sortConfig.direction ===
															"asc"
																? "▲"
																: "▼"}
														</span>
													)}
												</th>
												<th
													className="point"
													onClick={() =>
														handleSort("fullName")
													}
												>
													Customer{" "}
													{sortConfig.keys.includes(
														"fullName"
													) && (
														<span
															style={{
																cursor: "pointer",
															}}
														>
															{sortConfig.direction ===
															"asc"
																? "▲"
																: "▼"}
														</span>
													)}
												</th>
												<th
													className="point"
													onClick={() =>
														handleSort("phoneNo")
													}
												>
													Phone{" "}
													{sortConfig.keys.includes(
														"phoneNo"
													) && (
														<span
															style={{
																cursor: "pointer",
															}}
														>
															{sortConfig.direction ===
															"asc"
																? "▲"
																: "▼"}
														</span>
													)}
												</th>
												<th
													className="price point"
													onClick={() =>
														handleSort("balance")
													}
												>
													Wallet Balance{" "}
													{sortConfig.keys.includes(
														"balance"
													) && (
														<span
															style={{
																cursor: "pointer",
															}}
														>
															{sortConfig.direction ===
															"asc"
																? "▲"
																: "▼"}
														</span>
													)}
												</th>
												<th
													className="price point"
													onClick={() =>
														handleSort(
															"creditLimit"
														)
													}
												>
													Credit Limit{" "}
													{sortConfig.keys.includes(
														"creditLimit"
													) && (
														<span
															style={{
																cursor: "pointer",
															}}
														>
															{sortConfig.direction ===
															"asc"
																? "▲"
																: "▼"}
														</span>
													)}
												</th>
												<th>Status</th>
												<RoleGuard access="isBusinessActioners">
													<th>Actions</th>
												</RoleGuard>
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
														<td className="price">
															{currency}{" "}
															{formatCurrency(
																l.creditLimit
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
														<RoleGuard access="isBusinessActioners">
															<td>
																<DropDowns
																	active={
																		l.isActive
																	}
																	suspend={() => {
																		setIds(
																			l
																		);
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
																		setIds(
																			l
																		);
																	}}
																	deleteIt={
																		l
																			.transactions
																			?.length ===
																		0
																			? () =>
																					deleteHandler(
																						l.id
																					)
																			: null
																	}
																/>
															</td>
														</RoleGuard>
													</tr>
												))}
											</tbody>
										)}
									</Table>
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
					title={"Subdealer"}
					img={CoverImg}
					cover="Customer Management"
					desc={`Maintain a reliable database of your customer’s information and easily build a loyalty plans. Manage Customer accounts and get transaction histories in one place. Download reports to PDF and CSV.`}
					btnTitle={"Add Subdealer"}
					linkTo={() => setOpenModal(true)}
				/>
			)}
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<NewSubdealer
					submit={(arg: any) => {
						setOpenModal(false);
						listSubdealers();
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

export default Subdealer;
