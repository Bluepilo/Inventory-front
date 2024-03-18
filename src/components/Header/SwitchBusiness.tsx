import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IoCaretDown } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useState } from "react";
import OutsideClick from "../OutsideClick";
import { displayError } from "../../utils/errors";
import basicService from "../../redux/features/basic/basic-service";
import { Spinner } from "react-bootstrap";
import { userProfile } from "../../redux/features/auth/auth-slice";

const SwitchBusiness = () => {
	const dispatch = useAppDispatch();

	const [openDrop, setOpenDrop] = useState(false);
	const [load, setLoad] = useState(false);

	const { details, token } = useAppSelector((state) => state.auth);

	const switchHandler = async (id: any) => {
		setOpenDrop(false);
		if (id != details.businessId) {
			try {
				setLoad(true);
				await basicService.switchBusiness(token, id);
				setLoad(false);
				dispatch(userProfile(details.id));
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
								key={biz.id}
								onClick={() => switchHandler(biz.id)}
							>
								<span
									className={
										biz.id == details.businessId
											? "active"
											: ""
									}
								>
									{biz.name}
								</span>
								{biz.id == details.businessId && (
									<IoCheckmarkDoneCircle />
								)}
							</button>
						))}

						<Link
							to="/dashboard/organization"
							onClick={() => setOpenDrop(false)}
						>
							See all Businesses
						</Link>
					</div>
				)}
			</OutsideClick>
		</>
	) : (
		<h6>{details.businessId ? details?.business?.name : "Bluepilo"}</h6>
	);
};

export default SwitchBusiness;