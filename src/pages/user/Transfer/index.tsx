import { useAppSelector } from "../../../redux/hooks";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/transfer.png";
import { Link, useNavigate } from "react-router-dom";
import TitleCover from "../../../components/TitleCover";
import { useEffect, useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { displayError } from "../../../utils/errors";
import transferService from "../../../redux/features/transfer/transfer-service";
import { Table, TableComponent } from "../../../styles/table.styles";
import dateFormat from "dateformat";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import PendingIcon from "../../../assets/icons/pending.svg";
import Paginate from "../../../components/Paginate";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { haveRole } from "../../../utils/role";

const Transfer = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [lists, setLists] = useState<any>({});

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		getTransfers();
	}, [filters]);

	const getTransfers = async () => {
		try {
			setLoad(true);
			let res = await transferService.getTransfers(token, filters);
			setLists(res);
			setLoad(false);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return details.business.onboardingSteps?.transfer === "completed" ? (
		<div>
			<TitleCover
				title="Transfer Records"
				dataCount={lists?.count}
				button={
					haveRole(details.roleId).isBusinessActioners
						? "Make Transfer"
						: ""
				}
				buttonIcon={<IoCartSharp />}
				buttonClick={() => navigate("new")}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>From Shop</th>
									<th>Sent By</th>
									<th>To Shop</th>
									<th>Received By</th>
									<th>Products</th>
									<th>Date</th>
									<th>Action</th>
									<th>Status</th>
								</tr>
							</thead>
							{!load && (
								<tbody>
									{lists?.rows?.map((tr: any) => (
										<tr key={tr.id}>
											<td>{tr.shopFrom?.name}</td>
											<td>{tr.createdBy?.fullName}</td>
											<td>{tr.shopTo?.name}</td>
											<td>{tr.recievedBy?.fullName}</td>
											<td>{tr.products?.length}</td>
											<td>
												{dateFormat(
													tr.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td className="link">
												<Link to={`${tr.id}`}>
													View Details
												</Link>
											</td>
											<td className="status">
												<img
													src={
														tr.status.toLowerCase() ===
														"success"
															? SuccessIcon
															: tr.status.toLowerCase() ===
															  "pending"
															? PendingIcon
															: FailedIcon
													}
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
	) : (
		<NewPage
			title={"Transfer"}
			img={CoverImg}
			cover="Transfer"
			desc={`You can now seamlessly move products around between all your business Locations. Track the products, approve or decline the pending transfer requests. Integrated with automatic Inventory updates.`}
			btnTitle={"Make Transfer"}
			linkTo={() => navigate("new")}
		/>
	);
};

export default Transfer;
