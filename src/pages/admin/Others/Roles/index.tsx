import { useEffect, useState } from "react";
import adminService from "../../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../../redux/hooks";
import { displayError, displaySuccess } from "../../../../utils/errors";
import TitleCover from "../../../../components/TitleCover";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Table, TableComponent } from "../../../../styles/table.styles";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import ModalComponent from "../../../../components/ModalComponent";
import { Form } from "../../../../styles/form.styles";
import Loading from "../../../../components/Loaders/Loading";
import { ButtonSubmit, MainButton } from "../../../../styles/links.styles";
import PermissionDenied from "../../../../components/PermissionDenied";

const Roles = () => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [list, setList] = useState<any>([]);
	const [load, setLoad] = useState(false);
	const [name, setName] = useState("");
	const [hierarchy, setHierarchy] = useState("");
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		listRoles();
	}, []);

	const listRoles = async () => {
		try {
			setLoad(true);
			let res = await adminService.listRoles(token);
			if (Array.isArray(res)) {
				setList(res);
			}
			setLoad(false);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const createRole = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			await adminService.createRole(token, { name, hierarchy });
			setLoad(false);
			setOpenModal(false);
			listRoles();
			displaySuccess("Role has been created");
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const deleteRole = async (role: any) => {
		if (window.confirm(`Are you sure you want to delete ${role.name}`)) {
			try {
				setLoad(true);
				await adminService.deleteRole(token, role.id);
				setLoad(false);
				listRoles();
				displaySuccess(`${role.name} has been deleted`);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return details?.role?.permissions?.find((f) => f.method === "listRoles") ? (
		<div>
			<TitleCover
				title={"Roles"}
				button={
					details?.role?.permissions?.find(
						(f) => f.method === "createRole"
					)
						? "Add New"
						: ""
				}
				buttonIcon={<FaPlus />}
				buttonClick={() => {
					setOpenModal(true);
				}}
				dataCount={list?.length}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Hierarchy</th>
									{details?.role?.permissions?.find(
										(f) =>
											f.method ===
											"assignPermissionsToRole"
									) && <th>Permissions</th>}
									<th></th>
								</tr>
							</thead>
							{!load && (
								<tbody>
									{list?.map((li: any) => (
										<tr key={li.id}>
											<td>{li.name}</td>
											<td>{li.hierarchy}</td>
											{details?.role?.permissions?.find(
												(f) =>
													f.method ===
													"assignPermissionsToRole"
											) && (
												<td className="links">
													<Link to={`${li.id}`}>
														View Permissions
													</Link>
												</td>
											)}
											<td>
												{details?.role?.permissions?.find(
													(f) =>
														f.method ===
														"deleteRole"
												) && (
													<MainButton
														sm="true"
														bg="red"
														onClick={() =>
															deleteRole(li)
														}
													>
														<FaTrash />
														<span>Delete</span>
													</MainButton>
												)}
											</td>
										</tr>
									))}
								</tbody>
							)}
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
			</div>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<Form onSubmit={createRole}>
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
					<label>Hierarchy</label>
					<input
						type="number"
						value={hierarchy}
						onChange={(e) => setHierarchy(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit type="submit">Create Role</ButtonSubmit>
					)}
				</Form>
			</ModalComponent>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default Roles;
