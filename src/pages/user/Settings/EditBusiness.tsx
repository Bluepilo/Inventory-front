import React, { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { useNavigate } from "react-router-dom";
import { FormBody } from "../../../styles/form.styles";
import BusinessForm from "../../../components/Business/BusinessForm";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { MainButton } from "../../../styles/links.styles";
import { FaTrash } from "react-icons/fa6";
import ConfirmModal from "../../../components/Modals/ConfirmModal";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { logout } from "../../../redux/features/auth/auth-slice";
import LoadModal from "../../../components/Loaders/LoadModal";

const EditBusiness = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { details, token } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const deleteHandler = async () => {
		setOpenModal(false);
		try {
			setLoad(true);
			await basicService.deleteBusiness(token, details.businessId);
			toast.success("Business has been deleted.");
			dispatch(logout());
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title="Edit Business" />
			<div className="row mt-4">
				<div className="col-md-8">
					<FormBody>
						<BusinessForm
							editDetail={details.business}
							onComplete={() => {
								toast.success("Business has been updated");
								navigate(-1);
							}}
							dashboard={true}
						/>
						<div className="mt-5 text-end">
							<MainButton
								bg="#f44336"
								onClick={() => setOpenModal(true)}
							>
								<FaTrash />
								<span>Delete Business</span>
							</MainButton>
						</div>
					</FormBody>
				</div>
			</div>
			<ConfirmModal
				open={openModal}
				close={() => setOpenModal(false)}
				label={`Are you sure you want to delete this business? You will be logged out and won't have access to this business.`}
				confirm={() => {
					setOpenModal(false);
					deleteHandler();
				}}
			/>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default EditBusiness;
