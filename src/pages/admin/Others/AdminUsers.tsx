import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { useAppSelector } from "../../../redux/hooks";
import { Table, TableComponent } from "../../../styles/table.styles";
import Paginate from "../../../components/Paginate";
import dateFormat from "dateformat";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import adminService from "../../../redux/features/admin/admin-service";
import { Drop } from "../../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";
import ModalComponent from "../../../components/ModalComponent";
import { Form } from "../../../styles/form.styles";
import Loading from "../../../components/Loaders/Loading";
import { ButtonSubmit } from "../../../styles/links.styles";
import { displayError, displaySuccess } from "../../../utils/errors";
import PermissionDenied from "../../../components/PermissionDenied";
import { FaPlus } from "react-icons/fa6";
import AddUser from "../../../components/Users/AddUser";

const AdminUsers = () => {
	const [lists, setLists] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState("assign");
	const [roleId, setRoleId] = useState("");
	const [user, setUser] = useState<any>(null);
	const [roles, setRoles] = useState<any>([]);

	const { token, details: admin } = useAppSelector((state) => state.auth);

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		listUsers();
		listRoles();
	}, [filters]);

	const listUsers = async () => {
		try {
			setLoad(true);
			let res = await adminService.listUsers(token);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const listRoles = async () => {
		try {
			let res = await adminService.listRoles(token);
			if (Array.isArray(res)) {
				setRoles(res);
			}
		} catch (err) {}
	};

	const actionUsers = async (user: any, del?: string) => {
		if (
			window.confirm(
				`Are you sure you want to ${
					del ? "delete" : user.isActive ? "deactivate" : "activate"
				} ${user.fullName}`
			)
		) {
			try {
				setLoad(true);
				if (del) {
					await adminService.deleteUser(token, user.id);
				} else {
					await adminService.actionUsers(
						token,
						user.id,
						user.isActive ? "deactivate" : "activate"
					);
				}
				setLoad(false);
				listUsers();
				displaySuccess(
					`${user.fullName} ${
						user.isActive ? "Deactivated" : "Activated"
					}`
				);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	const assignRole = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			await adminService.assignRole(token, user?.id, roleId);
			setLoad(false);
			listUsers();
			setOpenModal(false);
			displaySuccess("Role Assigned");
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return admin?.role?.permissions?.find((f) => f.method === "listUsers") ? (
		<div>
			<TitleCover
				title="Admin Users"
				dataCount={lists?.rows?.length}
				button={"Add New"}
				buttonIcon={<FaPlus />}
				buttonClick={() => {
					setModalType("create");
					setOpenModal(true);
				}}
			/>
			<div className="mt-3">
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
										<th></th>
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
												<td>
													<Drop>
														<Drop.Toggle
															size="sm"
															id="dropdown-basic"
														>
															<HiDotsVertical />
														</Drop.Toggle>
														<Drop.Menu>
															{admin?.role?.permissions?.find(
																(f) =>
																	f.method ===
																	"deactivateUser"
															) && (
																<Drop.Item
																	href="#"
																	onClick={(
																		e
																	) => {
																		e.preventDefault();
																		actionUsers(
																			user
																		);
																	}}
																>
																	{user.isActive
																		? "Deactivate"
																		: "Activate"}
																</Drop.Item>
															)}
															{admin?.role?.permissions?.find(
																(f) =>
																	f.method ===
																	"deleteUser"
															) && (
																<Drop.Item
																	href="#"
																	onClick={(
																		e
																	) => {
																		e.preventDefault();
																		actionUsers(
																			user,
																			"delete"
																		);
																	}}
																>
																	Delete
																</Drop.Item>
															)}
															{admin?.role?.permissions?.find(
																(f) =>
																	f.method ===
																	"assignRoleToUser"
															) && (
																<Drop.Item
																	href="#"
																	onClick={(
																		e
																	) => {
																		e.preventDefault();
																		setUser(
																			user
																		);
																		setModalType(
																			"assign"
																		);
																		setOpenModal(
																			true
																		);
																	}}
																>
																	Assign Role
																</Drop.Item>
															)}
														</Drop.Menu>
													</Drop>
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
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={
					modalType === "create" ? "Create User" : `${user?.fullName}`
				}
			>
				{modalType === "assign" ? (
					<Form onSubmit={assignRole}>
						<label>Role</label>
						<select
							value={roleId}
							onChange={(e) => setRoleId(e.target.value)}
							required
							disabled={load}
							className="height"
						>
							<option value={""}>Select One</option>
							{roles?.map((role: any) => (
								<option value={role.id} key={role.id}>
									{role.name}
								</option>
							))}
						</select>

						{load ? (
							<Loading />
						) : (
							<ButtonSubmit type="submit">
								Assign Role
							</ButtonSubmit>
						)}
					</Form>
				) : (
					<AddUser
						onComplete={() => {
							setOpenModal(false);
							listUsers();
						}}
						editDetails={null}
						admin={true}
						roles={roles}
					/>
				)}
			</ModalComponent>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default AdminUsers;
