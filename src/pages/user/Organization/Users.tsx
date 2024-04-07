import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { FiUserPlus } from "react-icons/fi";
import ModalComponent from "../../../components/ModalComponent";
import AddUser from "../../../components/Users/AddUser";
import customerService from "../../../redux/features/customer/customer-services";
import { useAppSelector } from "../../../redux/hooks";
import { Table, TableComponent } from "../../../styles/table.styles";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import Paginate from "../../../components/Paginate";
import { Link } from "react-router-dom";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import ActionsUser from "../../../components/Users/ActionsUser";

const Users = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});
	const [openModal, setOpenModal] = useState(false);
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [editDetails, setEditDetails] = useState<any>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		listUsers();
	}, [page, limit]);

	const listUsers = async () => {
		try {
			setLoad(true);
			let res = await customerService.listUsers(
				token,
				`?business_only=false&page=${page}&limit=${limit}`
			);
			setLists(res);
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover
				title="All Users"
				dataCount={lists?.count}
				button="New User"
				buttonIcon={<FiUserPlus />}
				buttonClick={() => {
					setOpenModal(true);
				}}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Username</th>
									<th>Email</th>
									<th>Phone</th>
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
											<td>{l.username}</td>
											<td>{l.email}</td>
											<td>{l.phoneNo}</td>
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
													reload={() => listUsers()}
													action={(arg: any) => {
														setEditDetails(arg);
														setOpenModal(true);
													}}
													more={true}
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
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={editDetails?.id ? "Edit User" : "Create New User"}
			>
				<AddUser
					onComplete={() => {
						setOpenModal(false);
						listUsers();
					}}
					editDetails={editDetails}
				/>
			</ModalComponent>
		</div>
	);
};

export default Users;
