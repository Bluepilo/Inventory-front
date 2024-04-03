import { AddBusiness, BusinessBox } from "../../styles/org.styles";
import { Drop } from "../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";
import { CiShop } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdBusiness } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { displayError } from "../../utils/errors";
import basicService from "../../redux/features/basic/basic-service";
import { userProfile } from "../../redux/features/auth/auth-slice";
import { toast } from "react-toastify";
import { useState } from "react";

const Businesses = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { details, token } = useAppSelector((state) => state.auth);
	const { organization } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);

	const switchHandler = async (id: any, to: string) => {
		if (details.businessId !== id) {
			if (
				window.confirm("You will be switched to this business first.")
			) {
				try {
					setLoad(true);
					await basicService.switchBusiness(token, id);
					setLoad(false);
					if (to === "edit") {
						window.location.replace("/dashboard/settings");
					} else {
						window.location.replace("/dashboard/business/shops");
					}
				} catch (err) {
					setLoad(false);
					displayError(err, false);
				}
			}
		} else {
			navigateTo(to);
		}
	};

	const navigateTo = (to: string) => {
		if (to === "edit") {
			navigate("/dashboard/settings");
		} else {
			navigate("/dashboard/business/shops");
		}
	};

	const addOrRemoveUserBusiness = async (action: string, bizId: any) => {
		if (
			window.confirm(`Are you sure you want to ${action} this business?`)
		) {
			try {
				await basicService.addOrRemoveUserBusiness(
					token,
					action,
					bizId,
					details.id
				);
				dispatch(userProfile(details.id));
				toast.success(
					`Business has been ${action == "add" ? "Added" : "Removed"}`
				);
			} catch (err) {
				displayError(err, true);
			}
		}
	};

	return (
		<div className="row mt-5">
			{organization?.businesses?.map((biz: any) => (
				<div className="col-lg-4 col-md-6 mb-3" key={biz.id}>
					<BusinessBox
						className={`shadow-sm ${
							details.businessId == biz.id ? "active" : ""
						}`}
					>
						<div className="head">
							<div className="left">
								{biz.image ? (
									<img src={biz.image} />
								) : (
									<span className="box-holder" />
								)}
								<p>{biz.name}</p>
							</div>
							<Drop align={"end"}>
								<Drop.Toggle size="sm" id={`d-${biz.id}-drop`}>
									<HiDotsVertical />
								</Drop.Toggle>

								<Drop.Menu>
									<Drop.Item
										href="#2"
										onClick={(e) => {
											e.preventDefault();
											switchHandler(biz.id, "edit");
										}}
									>
										<FaRegEdit />
										<span className="ms-2">
											Edit Business Info
										</span>
									</Drop.Item>
									<Drop.Item
										href="#"
										onClick={(e) => {
											e.preventDefault();
											switchHandler(biz.id, "shop");
										}}
										className="mb-2 mt-1"
									>
										<CiShop />
										<span className="ms-2">
											Create Shop
										</span>
									</Drop.Item>
									{details.businessId != biz.id && (
										<Drop.Item
											href="#"
											onClick={(e) => {
												e.preventDefault();
												addOrRemoveUserBusiness(
													details?.allowedBusinesses?.find(
														(b) =>
															b.business?.id ==
															biz.id
													)
														? "remove"
														: "add",
													biz.id
												);
											}}
											className="mb-2 mt-1"
										>
											<MdBusiness />
											<span className="ms-2">
												{details?.allowedBusinesses?.find(
													(b) =>
														b.business?.id == biz.id
												)
													? "Remove"
													: "Add"}{" "}
												Business
											</span>
										</Drop.Item>
									)}
								</Drop.Menu>
							</Drop>
						</div>
						<div className="body">
							<div className="row">
								<span className="col-6 mb-2">Shops</span>
								<strong className="col-6 mb-2">
									{biz.shopsCount}
								</strong>
							</div>
							<div className="row">
								<span className="col-6 mb-2">Staff</span>
								<strong className="col-6 mb-2">
									{biz.usersCount}
								</strong>
							</div>
							<div className="row">
								<span className="col-6 mb-2">
									Managed Catalogue
								</span>
								<strong className="col-6 mb-2">
									{biz.manageProductsCount}
								</strong>
							</div>
							<div className="row">
								<span className="col-6 mb-2">
									Self-Service Catalogue
								</span>
								<strong className="col-6 mb-2">
									{biz.selfProductsCount}
								</strong>
							</div>
							<div className="row">
								<span className="col-6 mb-2">
									Total Stock Unit
								</span>
								<strong className="col-6 mb-2">
									{biz.stockUnits}
								</strong>
							</div>
							<div className="row">
								<span className="col-6 mb-2">
									Total Stock Value
								</span>
								<strong className="col-6 mb-2">
									{biz.stockValue}
								</strong>
							</div>
						</div>
					</BusinessBox>
				</div>
			))}
			<div className="col-lg-4 mb-3">
				<AddBusiness onClick={() => navigate("business")}>
					<FaPlus />
					<span>Add new</span>
				</AddBusiness>
			</div>
		</div>
	);
};

export default Businesses;
