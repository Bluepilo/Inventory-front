import React, { useEffect } from "react";
import TitleCover from "../../../components/TitleCover";
import { useNavigate } from "react-router-dom";
import { FormBody } from "../../../styles/form.styles";
import BusinessForm from "../../../components/Business/BusinessForm";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";

const EditBusiness = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
					</FormBody>
				</div>
			</div>
		</div>
	);
};

export default EditBusiness;
