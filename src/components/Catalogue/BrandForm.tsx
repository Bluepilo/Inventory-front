import React, { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import { displayError } from "../../utils/errors";
import { ButtonSubmit, WideButton } from "../../styles/links.styles";
import productService from "../../redux/features/product/product-service";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import Loading from "../Loaders/Loading";

const BrandForm = ({
	brandDetail,
	onComplete,
	onCancel,
}: {
	brandDetail: any;
	onComplete: () => void;
	onCancel?: () => void;
}) => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		if (brandDetail?.id) {
			setName(brandDetail.name);
			setAddress(brandDetail.address);
			setEmail(brandDetail.email);
			setPhone(brandDetail.phone);
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
				await productService.editBrand(token, brandDetail.id, {
					name,
					phone,
					email,
					address,
				});
			} else {
				await productService.createBrand(token, {
					name,
					phone,
					email,
					address,
				});
			}
			toast.success(
				`Brand has been ${brandDetail?.id ? "Updated" : "Created"}`
			);
			onComplete();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
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
					/>
				</div>
				<div className="col-lg-6">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={load}
					/>
				</div>
				<div className="col-lg-6">
					<label>Phone</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						disabled={load}
					/>
				</div>
				<div className="col-lg-6">
					<label>Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						disabled={load}
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
