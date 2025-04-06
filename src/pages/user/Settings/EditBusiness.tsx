import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { useNavigate } from "react-router-dom";
import { Form, FormBody } from "../../../styles/form.styles";
import BusinessForm from "../../../components/Business/BusinessForm";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { MainButton } from "../../../styles/links.styles";
import { FaRegEye, FaRegEyeSlash, FaTrash } from "react-icons/fa6";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { logout } from "../../../redux/features/auth/auth-slice";
import LoadModal from "../../../components/Loaders/LoadModal";
import ModalComponent from "../../../components/ModalComponent";
import { haveRole } from "../../../utils/role";
import DeleteBusinessModal from "../../../components/Organization/DeleteBusinessModal";

const EditBusiness = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);
	const [load, setLoad] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const deleteHandler = async (e: any) => {
		e.preventDefault();
		setOpenModal(false);
		try {
			setLoad(true);
			await basicService.deleteBusiness(details.businessId, {
				reason: "Delete Business",
				password,
			});
			toast.success("Business has been deleted.");
			dispatch(logout());
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return haveRole(details.businessRoleId).isBusinessOwner ? (
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
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title="Verify it is you!"
			>
				<DeleteBusinessModal
					logMeOut={true}
					closeModal={() => setOpenModal(false)}
				/>
			</ModalComponent>
			{load && <LoadModal open={true} />}
		</div>
	) : (
		<></>
	);
};

export default EditBusiness;
