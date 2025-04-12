import { AccountBox } from "../../styles/profile.styles";
import { ButtonSubmit, MainButton } from "../../styles/links.styles";
import { FaTrash } from "react-icons/fa6";
import { displayError, displaySuccess } from "../../utils/errors";
import { useState } from "react";
import productService from "../../redux/features/product/product-service";
import ModalComponent from "../ModalComponent";
import { Form } from "../../styles/form.styles";
import Loading from "../Loaders/Loading";
import UploadComponent from "../UploadComponent";
import { Flex } from "../../styles/basic.styles";
import { FaEdit } from "react-icons/fa";

const ProductCategories = ({
	list,
	onRefresh,
}: {
	list: any;
	onRefresh: () => void;
}) => {
	const [load, setLoad] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [id, setId] = useState<any>(null);

	const addHandler = async () => {
		try {
			setLoad(true);
			if (!id) {
				await productService.addProductCategory({ name, image });
			} else {
				await productService.editProductCategory({ name, image }, id);
			}
			setLoad(false);
			displaySuccess(`${name} has been ${!id ? "Added" : "Updated"}`);
			onRefresh();
			setOpenModal(false);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const deleteHandler = async (li: any) => {
		if (window.confirm(`Are you sure you want to delete ${li.name}?`)) {
			try {
				setLoad(true);
				await productService.deleteProductCategory(li.id);
				setLoad(false);
				displaySuccess(`${li.name} deleted.`);
				onRefresh();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return (
		<AccountBox>
			<div className="d-flex justify-content-between align-items-center">
				<h6 className="mb-3">Product Categories</h6>
				<MainButton
					onClick={() => {
						setId(null);
						setName("");
						setImage("");
						setOpenModal(true);
					}}
				>
					<span>Add New</span>
				</MainButton>
			</div>
			{load && <Loading />}
			<div className="row mt-4">
				{list?.map((cat: any) => (
					<div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
						<div className="list">
							<span>{cat.name}</span>
							<Flex>
								<button
									onClick={() => {
										setName(cat.name);
										setImage(cat.image);
										setId(cat.id);
										setOpenModal(true);
									}}
								>
									<FaEdit />
								</button>
								<button
									className="red ms-2"
									onClick={() => deleteHandler(cat)}
								>
									<FaTrash />
								</button>
							</Flex>
						</div>
					</div>
				))}
			</div>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={`${id ? "Edit" : "Add"} Product Category`}
			>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						addHandler();
					}}
				>
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
							{id ? "Edit" : "Add"} Category
						</ButtonSubmit>
					)}
				</Form>
			</ModalComponent>
		</AccountBox>
	);
};

export default ProductCategories;
