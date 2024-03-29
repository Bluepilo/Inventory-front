import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { Alert, SwitchDiv } from "../../../styles/basic.styles";
import { FaCircleInfo } from "react-icons/fa6";
import { Form, FormBody, JointDiv } from "../../../styles/form.styles";
import {
	DropDownSelect,
	OptionProp,
} from "../../../components/Filters/BasicInputs";
import CurrencyInput from "react-currency-input-field";
import { MainButton } from "../../../styles/links.styles";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import productService from "../../../redux/features/product/product-service";
import { useAppSelector } from "../../../redux/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { displayError } from "../../../utils/errors";
import { toast } from "react-toastify";
import LoadModal from "../../../components/Loaders/LoadModal";

const NewProduct = () => {
	const params = useParams();

	const navigate = useNavigate();

	const editState = useLocation().state;

	const { token } = useAppSelector((state) => state.auth);

	const [isService, setIsService] = useState(false);
	const [load, setLoad] = useState(false);

	const [name, setName] = useState("");
	const [categoryName, setCategoryName] = useState("");
	const [categoryList, setCategoryList] = useState<OptionProp[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<OptionProp | null>(
		null
	);
	const [sellingPrice, setSellingPrice] = useState(0);
	const [costPrice, setCostPrice] = useState(0);
	const [totalStock, setTotalStock] = useState("");
	const [size, setSize] = useState("");
	const [year, setYear] = useState("");
	const [productCode, setProductCode] = useState("");
	const [color, setColor] = useState("");
	const [productType, setProductType] = useState("");

	useEffect(() => {
		getCategories();
		if (editState?.id) {
			populateFields();
		}
	}, [editState]);

	const getCategories = async () => {
		try {
			let res = await productService.productCategories(token);
			if (Array.isArray(res)) {
				let arr = res.map((r) => {
					return { label: r.name, value: r.id };
				});
				let listArr = [{ label: "New Category", value: "new" }, ...arr];
				setCategoryList(listArr);
			}
		} catch (err) {}
	};

	const populateFields = () => {
		setIsService(editState.isService);
		setName(editState.name);
		setTotalStock(editState.totalStock);
		setSelectedCategory({
			label: editState.category?.name,
			value: editState.category?.id,
		});
		setCostPrice(Number(editState.costPrice));
		setSellingPrice(Number(editState.price));
		setSize(editState.size);
		setColor(editState.colour);
		setYear(editState.year);
		setProductCode(editState.productCode);
		setProductType(editState.type);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		let obj = {
			name,
			brandId: params.id,
			categoryId:
				selectedCategory?.value === "new"
					? null
					: selectedCategory?.value,
			categoryName,
			costPrice,
			price: sellingPrice,
			size,
			type: productType,
			year,
			colour: color,
			productCode,
			isService,
			totalStock,
		};
		try {
			setLoad(true);
			let res;
			if (editState?.id) {
				res = await productService.editProduct(
					token,
					obj,
					editState.id
				);
			} else {
				res = await productService.createProduct(token, obj);
			}
			setLoad(false);
			if (res) {
				navigate(`/dashboard/catalogue/${params.id}`);
				toast.success(
					`Product has been ${editState?.id ? "Updated" : "Created"}`
				);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover
				title={`${editState?.id ? "Update" : "Create"} Product`}
			/>
			<SwitchDiv>
				<div
					className={!isService ? "active" : ""}
					onClick={() => {
						if (!editState?.id) {
							setIsService(false);
						}
					}}
				>
					Goods
				</div>
				<div
					className={isService ? "active" : ""}
					onClick={() => {
						if (!editState?.id) {
							setIsService(true);
						}
					}}
				>
					Service
				</div>
			</SwitchDiv>
			<div className="row mt-3">
				<div className="col-lg-8">
					<Alert>
						<FaCircleInfo />
						<span>
							{isService
								? "This is where you add products that are not trackable via inventory. i.e uncountable and not physical."
								: "This is where you add products that are trackable via inventory. i.e Physical and Countable."}
						</span>
					</Alert>
					<FormBody className="mt-4">
						<Form onSubmit={submitHandler}>
							<div className="row">
								<div className="col-lg-12">
									<label>Product Name</label>
									<input
										type="text"
										required
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										className="height"
									/>
								</div>
								{!isService && (
									<div
										className={`col-lg-${
											selectedCategory?.value === "new"
												? "4"
												: "6"
										}`}
									>
										<label>Amount In Stock</label>
										<input
											type="number"
											value={totalStock}
											onChange={(e) =>
												setTotalStock(e.target.value)
											}
											className="height"
										/>
									</div>
								)}
								<div
									className={`col-lg-${
										selectedCategory?.value === "new"
											? "4"
											: "6"
									} mb-3`}
								>
									<label>Category</label>
									<DropDownSelect
										options={categoryList}
										value={selectedCategory}
										changeSelected={setSelectedCategory}
									/>
								</div>
								<div className="col-lg-4">
									<label>Category Name</label>
									<input
										type="text"
										className="height"
										value={categoryName}
										onChange={(e) =>
											setCategoryName(e.target.value)
										}
									/>
								</div>
								<div className="col-lg-6">
									<label>Cost Price</label>
									<CurrencyInput
										id="input-example"
										name="input-name"
										decimalsLimit={2}
										onValueChange={(values) => {
											setCostPrice(Number(values));
										}}
										prefix={"₦ "}
										value={costPrice}
										disabled={load}
										className="height"
									/>
								</div>
								<div className="col-lg-6">
									<label>Selling Price</label>
									<CurrencyInput
										id="input-example"
										name="input-name"
										decimalsLimit={2}
										onValueChange={(values) => {
											setSellingPrice(Number(values));
										}}
										prefix={"₦ "}
										value={sellingPrice}
										disabled={load}
										className="height"
									/>
								</div>
								<div className="col-lg-12 mb-2">
									<h6>Specifications</h6>
								</div>
								<div className="col-lg-4">
									<JointDiv>
										<select className="height" disabled>
											<option value={""}>Size</option>
										</select>
										<input
											className="height"
											type="text"
											value={size}
											onChange={(e) =>
												setSize(e.target.value)
											}
											disabled={load}
										/>
									</JointDiv>
								</div>
								<div className="col-lg-4">
									<JointDiv>
										<select disabled className="height">
											<option value={""}>Year</option>
										</select>
										<input
											className="height"
											type="text"
											value={year}
											onChange={(e) =>
												setYear(e.target.value)
											}
											disabled={load}
										/>
									</JointDiv>
								</div>
								<div className="col-lg-4">
									<JointDiv>
										<select className="height" disabled>
											<option value={""}>Color</option>
										</select>
										<input
											className="height"
											type="text"
											value={color}
											onChange={(e) =>
												setColor(e.target.value)
											}
											disabled={load}
										/>
									</JointDiv>
								</div>
								<div className="col-lg-4">
									<JointDiv>
										<select disabled className="height">
											<option value={""}>Type</option>
										</select>
										<input
											className="height"
											type="text"
											value={productType}
											onChange={(e) =>
												setProductType(e.target.value)
											}
											disabled={load}
										/>
									</JointDiv>
								</div>
								<div className="col-lg-4">
									<JointDiv>
										<select disabled className="height">
											<option value={""}>Code</option>
										</select>
										<input
											className="height"
											type="text"
											value={productCode}
											onChange={(e) =>
												setProductCode(e.target.value)
											}
											disabled={load}
										/>
									</JointDiv>
								</div>
								<div className="col-lg-12 text-center mt-3">
									<MainButton type="submit" right="true">
										<span>
											{editState?.id ? "Update" : "Add"}{" "}
											Product
										</span>
										<IoMdCheckmarkCircleOutline />
									</MainButton>
								</div>
							</div>
						</Form>
					</FormBody>
				</div>
			</div>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default NewProduct;
