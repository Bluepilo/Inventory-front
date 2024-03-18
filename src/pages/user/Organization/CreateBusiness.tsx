import React, { useEffect } from "react";
import BusinessForm from "../../../components/Business/BusinessForm";
import { FormBody } from "../../../styles/form.styles";
import TitleCover from "../../../components/TitleCover";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBusiness = () => {
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<TitleCover title="Create New Business" />
			<div className="row mt-4">
				<div className="col-md-8">
					<FormBody>
						<BusinessForm
							onComplete={() => {
								toast.success("A new business has been added");
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

export default CreateBusiness;
