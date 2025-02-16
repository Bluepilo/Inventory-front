import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IoCaretDown } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useState } from "react";
import OutsideClick from "../OutsideClick";
import { displayError } from "../../utils/errors";
import basicService from "../../redux/features/basic/basic-service";
import { Spinner } from "react-bootstrap";
import { haveRole } from "../../utils/role";

const SwitchBusiness = () => {
	const [openDrop, setOpenDrop] = useState(false);
	const [load, setLoad] = useState(false);

	const { details } = useAppSelector((state) => state.auth);

	const switchHandler = async (id: any) => {
		setOpenDrop(false);
		if (id != details.businessId) {
			try {
				setLoad(true);
				await basicService.switchBusiness(id);
				setLoad(false);
				window.location.reload();
			} catch (err) {
				setLoad(false);
				displayError(err, false);
			}
		}
	};

	return details.organization ? (
		<>
			<div className="business" onClick={() => setOpenDrop(true)}>
				<h6>
					{details.businessId ? details?.business?.name : "Bluepilo"}
				</h6>
				<IoCaretDown />
				{load && <Spinner size="sm" style={{ marginLeft: "10px" }} />}
			</div>
			<OutsideClick handleToggle={() => setOpenDrop(false)}>
				{openDrop && (
					<div className="switch-drop shadow-sm">
						{details.allowedBusinesses?.map((biz) => (
							<button
								key={biz.business?.id}
								onClick={() => switchHandler(biz.business?.id)}
							>
								<span
									className={
										biz.business?.id == details.businessId
											? "active"
											: ""
									}
								>
									{biz.business?.name}
								</span>
								{biz.business?.id == details.businessId && (
									<IoCheckmarkDoneCircle />
								)}
							</button>
						))}
						{haveRole(details.businessRoleId).isBusinessOwner && (
							<Link
								to="/dashboard/organization"
								onClick={() => setOpenDrop(false)}
							>
								See all Businesses
							</Link>
						)}
					</div>
				)}
			</OutsideClick>
		</>
	) : (
		<h6>{details.businessId ? details?.business?.name : "Bluepilo"}</h6>
	);
};

export default SwitchBusiness;
