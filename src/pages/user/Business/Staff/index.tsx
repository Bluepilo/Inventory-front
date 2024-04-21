import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { useAppSelector } from "../../../../redux/hooks";
import { UseDebounce } from "../../../../utils/hooks";
import { BasicSearch } from "../../../../components/Filters/BasicInputs";
import basicService from "../../../../redux/features/basic/basic-service";
import { Table, TableComponent } from "../../../../styles/table.styles";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";
import SuccessIcon from "../../../../assets/icons/success.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import ActionsUser from "../../../../components/Users/ActionsUser";
import { FaUsers } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { haveRole } from "../../../../utils/role";

const Staff = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);

	const [lists, setList] = useState<any>({});
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [load, setLoad] = useState(false);

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchStaff();
		} else {
			listStaff();
		}
	}, [filters, debouncedSearch]);

	const searchStaff = async () => {
		try {
			setLoad(true);
			let res = await basicService.searchStaff(
				token,
				filters,
				debouncedSearch
			);
			setLoad(false);
			setList(res?.data);
		} catch (err) {
			setLoad(false);
		}
	};

	const listStaff = async () => {
		try {
			setLoad(true);
			let res = await basicService.allStaffs(token, filters);
			setLoad(false);
			setList(res?.data);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover
				title="Staff"
				dataCount={lists?.count}
				button={
					haveRole(details.roleId).isBusinessAdmin
						? "Manage Users"
						: ""
				}
				buttonIcon={<FaUsers />}
				buttonClick={() => navigate(`/dashboard/organization/users`)}
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
				<div className="mt-4">
					<TableComponent>
						<div className="table-responsive">
							<Table className="table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Role</th>
										<th>Shop</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								{!load && (
									<tbody>
										{lists?.rows?.map((l: any) => (
											<tr key={l.id}>
												<td className="link">
													<Link
														to={`/dashboard/users/${l.id}`}
													>
														{l.fullName}
													</Link>
												</td>

												<td>{l.email}</td>
												<td>{l.phoneNo}</td>
												<td>{l.role?.name || "--"}</td>
												<td>
													{l.shop?.name ||
														(l.role?.name.includes(
															"Business"
														)
															? "All Shops"
															: "")}
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
													<ActionsUser
														detail={l}
														reload={() =>
															listStaff()
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
	);
};

export default Staff;
