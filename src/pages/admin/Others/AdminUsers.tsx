import { useEffect, useState } from "react";
import { BasicSearch } from "../../../components/Filters/BasicInputs";
import TitleCover from "../../../components/TitleCover";
import { UseDebounce } from "../../../utils/hooks";
import basicService from "../../../redux/features/basic/basic-service";
import { useAppSelector } from "../../../redux/hooks";
import { Table, TableComponent } from "../../../styles/table.styles";
import Paginate from "../../../components/Paginate";
import dateFormat from "dateformat";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";

const AdminUsers = () => {
	const [lists, setLists] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	const { token } = useAppSelector((state) => state.auth);

	let filters = `?page=${page}&limit=${limit}`;

	const debouncedSearch = UseDebounce(search);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchUsers();
		} else {
			listUsers();
		}
	}, [filters, debouncedSearch]);

	const searchUsers = async () => {
		try {
			setLoad(true);
			let res = await basicService.searchStaff(
				token,
				``,
				debouncedSearch
			);
			setLoad(false);
			let arr = res?.data?.rows?.filter((u: any) => u.role?.isAdmin);
			setLists({ ...res.data, rows: arr });
		} catch (err) {
			setLoad(false);
			console.log(err);
		}
	};

	const listUsers = async () => {
		try {
			setLoad(true);
			let res = await basicService.allStaffs(token, filters);
			setLoad(false);
			let arr = res?.data?.rows?.filter((u: any) => u.role?.isAdmin);
			setLists({ ...res.data, rows: arr });
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover title="Admin Users" dataCount={lists?.rows?.length} />
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
										<th>Date Added</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{!load &&
										lists?.rows?.map((user: any) => (
											<tr key={user.id}>
												<td>{user.fullName}</td>
												<td>{user.email}</td>
												<td>{user.phoneNo}</td>
												<td>{user.role?.name}</td>
												<td>
													{dateFormat(
														user.createdAt,
														"mmm dd, yyyy"
													)}
												</td>
												<td className="status">
													<img
														src={
															user.isActive
																? SuccessIcon
																: FailedIcon
														}
													/>
												</td>
											</tr>
										))}
								</tbody>
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
	);
};

export default AdminUsers;
