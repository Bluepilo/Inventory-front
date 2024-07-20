import { useEffect, useState } from "react";
import adminService from "../../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../../redux/hooks";
import TitleCover from "../../../../components/TitleCover";
import { useParams } from "react-router-dom";
import { CheckBox, Form, FormBody } from "../../../../styles/form.styles";
import Loading from "../../../../components/Loaders/Loading";
import { MainButton } from "../../../../styles/links.styles";
import { displayError } from "../../../../utils/errors";
import { toast } from "react-toastify";
import PermissionDenied from "../../../../components/PermissionDenied";

const EditPermissions = () => {
	const { id } = useParams();

	const { token, details } = useAppSelector((state) => state.auth);

	const [name, setName] = useState("");
	const [permissions, setPermissions] = useState([]);
	const [rolePermits, setRolePermits] = useState<any>([]);
	const [removed, setRemoved] = useState<any>([]);
	const [load, setLoad] = useState(false);
	const [loadPermit, setLoadPermit] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		listPermissions();
		listRolePermissions(id);
	}, []);

	const listPermissions = async () => {
		try {
			let res = await adminService.listPermissions(token);
			setPermissions(res);
		} catch (err) {}
	};

	const listRolePermissions = async (id: any) => {
		try {
			setLoadPermit(true);
			let res = await adminService.listRolePermissions(token, id);
			setName(res?.name);
			let arr = res?.permissions?.map((p: any) => {
				return p.id;
			});
			setRolePermits(arr || []);
			setLoadPermit(false);
		} catch (err) {}
	};

	const addOrRemove = (check: boolean, id: number) => {
		if (check) {
			setRolePermits([...rolePermits, id]);
			setRemoved(removed.filter((r: any) => r != id));
		} else {
			setRolePermits(rolePermits.filter((p: any) => p != id));
			setRemoved([...removed, id]);
		}
	};

	const addAll = (check: boolean) => {
		if (check) {
			setRolePermits(
				permissions?.map((p: any) => {
					return p.id;
				})
			);
			setRemoved([]);
		} else {
			setRemoved(
				permissions?.map((p: any) => {
					return p.id;
				})
			);
			setRolePermits([]);
		}
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			if (rolePermits.length > 0) {
				await adminService.assignPermissions(token, id, {
					permissions: rolePermits,
				});
			}

			if (removed.length > 0) {
				await adminService.removePermissions(token, id, {
					permissions: rolePermits,
				});
			}
			setLoad(false);
			toast.success("Permissions Updated.");
			listRolePermissions(id);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return details?.role?.permissions?.find(
		(f) => f.method === "assignPermissionsToRole"
	) ? (
		<div>
			<TitleCover
				title={
					id === "new" ? "New Role" : `Edit ${name || "Permissions"}`
				}
			/>
			<div className="row mt-4">
				<div className="col-xl-8 col-lg-8 col-md-10">
					<FormBody>
						<Form onSubmit={submitHandler}>
							{loadPermit ? (
								<Loading />
							) : (
								<div className="row">
									<div className="col-lg-12">
										<label>Name</label>
										<input
											type="text"
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
											required
											disabled={true}
											className="height"
										/>
									</div>
									<div className="col-lg-12">
										<CheckBox>
											<input
												type="checkbox"
												onChange={(e) =>
													addAll(e.target.checked)
												}
											/>
											<span
												style={{ fontWeight: "bold" }}
											>
												Permissions
											</span>
										</CheckBox>
										<div className="row">
											{permissions.map((permit: any) => (
												<div
													className="col-lg-4 col-md-6"
													key={permit.id}
												>
													<CheckBox>
														<input
															type="checkbox"
															checked={
																rolePermits.find(
																	(r: any) =>
																		r ==
																		permit.id
																)
																	? true
																	: false
															}
															onChange={(e) =>
																addOrRemove(
																	e.target
																		.checked,
																	permit.id
																)
															}
														/>
														<span>
															{permit.name}
														</span>
													</CheckBox>
												</div>
											))}
										</div>
									</div>
									<div className="col-lg-12 text-center mt-3">
										{load ? (
											<Loading />
										) : (
											<MainButton type="submit">
												Update Permissions
											</MainButton>
										)}
									</div>
								</div>
							)}
						</Form>
					</FormBody>
				</div>
			</div>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default EditPermissions;
