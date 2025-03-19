import { useEffect, useState } from "react";
import AuthProgress from "../../components/Auth/AuthProgress";
import BusinessForm from "../../components/Business/BusinessForm";
import Success from "./Success";
import { useAppDispatch } from "../../redux/hooks";
import { userProfile } from "../../redux/features/auth/auth-slice";

const NewBusiness = () => {
	const dispatch = useAppDispatch();

	const [successful, setSuccessful] = useState(false);

	useEffect(() => {
		if (successful) {
			dispatch(userProfile());
		}
	}, [successful]);

	return (
		<div style={{ padding: "0 5%" }}>
			<h5 className="text-center">Add your Business</h5>
			<AuthProgress step={successful ? 4 : 3} />
			{successful ? (
				<Success />
			) : (
				<BusinessForm onComplete={() => setSuccessful(true)} />
			)}
			{/* <ModalComponent open={openModal} close={() => console.log("close")}>
				<Trial closeTrial={() => setOpenModal(false)} />
			</ModalComponent> */}
		</div>
	);
};

export default NewBusiness;
