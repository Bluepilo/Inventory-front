import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { SwitchDiv } from "../../../../styles/basic.styles";
import { Table, TableComponent } from "../../../../styles/table.styles";
import adminService from "../../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../../redux/hooks";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import { Link } from "react-router-dom";
import SuccessIcon from "../../../../assets/icons/success.svg";
import PendingIcon from "../../../../assets/icons/pending.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import dateFormat from "dateformat";
import Paginate from "../../../../components/Paginate";
import CommentBox from "../../../../components/Sales/CommentBox";
import ModalComponent from "../../../../components/ModalComponent";
import { displayError } from "../../../../utils/errors";
import { toast } from "react-toastify";
import PermissionDenied from "../../../../components/PermissionDenied";

const BrandRequest = () => {
	const [status, setStatus] = useState("");
	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [openModal, setOpenModal] = useState(false);
	const [action, setAction] = useState<any>({});

	const { token, details } = useAppSelector((state) => state.auth);

	let filters = `?status=${status}&page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchRequests();
	}, [filters]);

	const fetchRequests = async () => {
		try {
			setLoad(true);
			let res = await adminService.fetchRequests(token, filters);
			setList(res);
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	const actionHandler = async (comment: string) => {
		setOpenModal(false);
		try {
			setLoad(true);
			await adminService.actionBrandRequests(token, action?.id, {
				action: action?.name,
				comment,
			});
			fetchRequests();
			toast.success("Action completed!");
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return details?.role?.permissions?.find(
		(f) => f.method === "listBrandRequest"
	) ? (
		<div>
			<TitleCover title="Brand Requests" />
			<SwitchDiv>
				<div
					className={!status ? "active" : ""}
					onClick={() => setStatus("")}
				>
					Pending
				</div>
				<div
					className={status === "approved" ? "active" : ""}
					onClick={() => setStatus("approved")}
				>
					Approved
				</div>
				<div
					className={status === "declined" ? "active" : ""}
					onClick={() => setStatus("declined")}
				>
					Declined
				</div>
			</SwitchDiv>
			<div className="mt-3">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Business</th>
									<th>Organization</th>
									<th>Brand</th>
									<th>Status</th>
									<th>Date</th>
									<th>{status ? "Action By" : "Action"}</th>
								</tr>
							</thead>
							<tbody>
								{!load &&
									Array.isArray(list.rows) &&
									list?.rows?.map((brand: any) => (
										<tr key={brand.id}>
											<td>{brand.business?.name}</td>
											<td className="link">
												<Link
													to={`/admin/organizations/${brand.business?.organizationId}`}
												>
													View
												</Link>
											</td>
											<td>{brand.name}</td>
											<td className="status">
												<img
													src={
														brand.status ===
														"approved"
															? SuccessIcon
															: brand.status ===
															  "pending"
															? PendingIcon
															: FailedIcon
													}
												/>
												<span>{brand.status}</span>
											</td>
											<td>
												{dateFormat(
													brand.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td className="link">
												{brand.status === "pending" ? (
													details?.role?.permissions?.find(
														(f) =>
															f.method ===
															"approveOrDeclineBrandRequest"
													) ? (
														<>
															<a
																href="#"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	setAction({
																		id: brand.id,
																		name: "approve",
																	});
																	setOpenModal(
																		true
																	);
																}}
															>
																Approve
															</a>
															<a
																href="#"
																style={{
																	color: "red",
																	marginLeft:
																		"10px",
																}}
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	setAction({
																		id: brand.id,
																		name: "reject",
																	});
																	setOpenModal(
																		true
																	);
																}}
															>
																Decline
															</a>
														</>
													) : (
														<></>
													)
												) : (
													<span>
														{
															brand.approvedByUser
																?.fullName
														}
													</span>
												)}
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
				{!load && list?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={limit}
						count={list.count}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<CommentBox
					submit={(arg: string) => actionHandler(arg)}
					btnName={action?.name}
					bg={action?.name === "reject" ? "#FF2725" : "#0241FF"}
				/>
			</ModalComponent>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default BrandRequest;
