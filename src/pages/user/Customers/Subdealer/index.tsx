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
import { Link } from "react-router-dom";
import SuccessIcon from "../../../../assets/icons/success.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";
import DropDowns from "../../../../components/DropDowns";

const Subdealer = () => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);
	const [lists, setLists] = useState<any>({});
	const [summary, setSummary] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}`;

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

	const listSubdealers = async () => {
		try {
			setLoad(true);
			let res = await customerService.getSubdealers(token, filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getSummary = async () => {
		try {
			let res = await customerService.subdealerSummary(
				token,
				debouncedSearch
			);
			setSummary(res);
		} catch (err) {}
	};

	return (
		<>
			{details.business.onboardingSteps?.subdealer === "completed" ? (
				<div>
					<TitleCover
						title="Subdealers"
						dataCount={lists?.count}
						button="Add Subdealer"
						buttonIcon={<IoCartSharp />}
						buttonClick={() => setOpenModal(true)}
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
												? `₦ ${formatCurrency(
														summary.totalInWallet
												  )}`
												: "--"}
										</h6>
									</div>

									<div>
										<h6>Total Debts in Wallets:</h6>
										<h6>
											{summary?.totalDebts
												? `₦ ${formatCurrency(
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
												<th>Customer</th>
												<th>Phone</th>
												<th className="price">
													Wallet Balance
												</th>
												<th className="price">
													Credit Limit
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
															₦{" "}
															{formatCurrency(
																l.balance
															)}
														</td>
														<td className="price">
															₦{" "}
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
														<td>
															<DropDowns />
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
					editInfo={null}
				/>
			</ModalComponent>
		</>
	);
};

export default Subdealer;
