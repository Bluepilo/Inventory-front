import React, { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import { displayError } from "../../utils/errors";
import { ButtonSubmit, WideButton } from "../../styles/links.styles";
import productService from "../../redux/features/product/product-service";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import Loading from "../Loaders/Loading";
import { updateOnboardingSteps } from "../../redux/features/basic/basic-slice";
import UploadComponent from "../UploadComponent";

const BrandForm = ({
	brandDetail,
	onComplete,
	onCancel,
}: {
	brandDetail: any;
	onComplete: () => void;
	onCancel?: () => void;
}) => {
	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [image, setImage] = useState("");

	useEffect(() => {
		if (brandDetail?.id) {
			setName(brandDetail.name);
			setAddress(brandDetail.address);
			setEmail(brandDetail.email);
			setPhone(brandDetail.phone);
			setImage(brandDetail.image);
		}
	}, [brandDetail]);

	useEffect(() => {
		if (brandDetail?.name) {
			setName(brandDetail.name);
		}
	}, []);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			if (brandDetail?.id) {
				await productService.editBrand(brandDetail.id, {
					name,
					phone,
					email,
					address,
					image,
				});
			} else {
				await productService.createBrand({
					name,
					phone,
					email,
					address,
					image,
				});
				if (!details.role?.isAdmin) {
					saveTrialPick();
				}
			}
			setLoad(false);
			toast.success(
				`Brand has been ${brandDetail?.id ? "Updated" : "Created"}`
			);
			onComplete();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const saveTrialPick = () => {
		if (details?.business?.onboardingSteps?.product !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						product: "completed",
					},
				})
			);
		}
	};

	return (
		<Form onSubmit={submitHandler} className="mb-3">
			{!brandDetail?.id && <h5 className="mb-4">Add New Brand</h5>}
			<div className="row">
				<div className="col-lg-6">
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Phone</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-12 mb-3">
					<UploadComponent
						image={image}
						setImage={setImage}
						allowChange={true}
					/>
				</div>
			</div>
			{load ? (
				<Loading />
			) : (
				<ButtonSubmit>
					{brandDetail?.id ? "Edit" : "Submit"}
				</ButtonSubmit>
			)}
			{!load && onCancel && (
				<WideButton
					onClick={() => onCancel()}
					className="mt-3"
					bg="#fff"
					color="#333"
				>
					Cancel
				</WideButton>
			)}
		</Form>
	);
};

export default BrandForm;
