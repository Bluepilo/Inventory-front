import { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import UploadComponent from "../UploadComponent";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import productService from "../../redux/features/product/product-service";
import { displayError, displaySuccess } from "../../utils/errors";

const ProductCategoryForm = ({
	detail,
	onComplete,
}: {
	detail: any;
	onComplete: () => void;
}) => {
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (detail?.id) {
			setName(detail.name);
			setImage(
				"https://res.cloudinary.com/dikkx8dz4/image/upload/v1741019907/pxhbk9fwbdegjmgbad7v.svg"
			);
		}
	}, [detail]);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			if (!detail?.id) {
				await productService.addProductCategory({ name, image });
			} else {
				await productService.editProductCategory(
					{ name, image },
					detail?.id
				);
			}
			setLoad(false);
			displaySuccess(
				`${name} has been ${!detail?.id ? "Added" : "Updated"}`
			);
			onComplete();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};
	return (
		<Form onSubmit={submitHandler}>
			<label>Name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
				disabled={load}
				className="height"
			/>
			<div className="mb-3">
				<UploadComponent
					image={image}
					setImage={setImage}
					allowChange={true}
				/>
			</div>
			{load ? (
				<Loading />
			) : (
				<ButtonSubmit type="submit">
					{detail ? "Edit" : "Add"} Category
				</ButtonSubmit>
			)}
		</Form>
	);
};

export default ProductCategoryForm;
