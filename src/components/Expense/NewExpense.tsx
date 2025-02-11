import { useState } from "react";
import { CheckBox, Form } from "../../styles/form.styles";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CurrencyInput from "react-currency-input-field";
import { UploadWrapper } from "../../styles/basic.styles";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import expenseService from "../../redux/features/expense/expense-service";
import { toast } from "react-toastify";
import Loading from "../Loaders/Loading";
import { updateOnboardingSteps } from "../../redux/features/basic/basic-slice";

const NewExpense = ({ submit }: { submit: any }) => {
	const dispatch = useAppDispatch();

	const { token, details, currency } = useAppSelector((state) => state.auth);
	const { expenseCat, shops } = useAppSelector((state) => state.basic);

	let arr = [{ label: "New Category", value: "new" }, ...expenseCat];

	const [load, setLoad] = useState(false);
	const [name, setName] = useState("");
	const [catId, setCatId] = useState<OptionProp | null>(null);
	const [expenseDate, setExpenseDate] = useState("");
	const [cost, setCost] = useState(0);
	const [isRecurrent, setIsRecurrent] = useState(false);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [description, setDescription] = useState("");
	const [proof, setProof] = useState("");
	const [frequency, setFrequency] = useState("once");
	const [uploading, setUploading] = useState(false);

	const fileUpload = (e: any) => {
		if (window.confirm("Upload Image?")) {
			let file = e.target.files[0];
			setUploading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("image", file);
			formData.append("upload_preset", "Bluepilo");
			formData.append("cloud_name", "dikkx8dz4");

			fetch("https://api.cloudinary.com/v1_1/dikkx8dz4/image/upload", {
				method: "POST",
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					setUploading(false);
					setProof(data.secure_url);
				})
				.catch((err) => {
					setUploading(false);
					console.log(err);
				});
		}
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			let obj = {
				expenseCategoryId: catId?.value === "new" ? null : catId?.value,
				name,
				date: expenseDate,
				cost,
				shopId: details.shopId || shopId?.value,
				isRecurrent,
				description,
				proof,
				frequency,
			};

			setLoad(true);
			let res = await expenseService.createExpense(token, obj);
			setLoad(false);
			saveTrialPick();
			if (res) {
				toast.success("Expense has been created.");
				submit();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.expense !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						expense: "completed",
					},
				})
			);
		}
	};

	return (
		<>
			<Form onSubmit={submitHandler} className="mb-3">
				<div className="row">
					<div className="col-lg-6">
						<label>What's this expense for?</label>
						<DropDownSelect
							options={arr}
							value={catId}
							changeSelected={setCatId}
						/>
					</div>
					{catId?.value === "new" && (
						<div className="col-lg-6">
							<label>Enter Type Name</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								disabled={load}
								className="height"
							/>
						</div>
					)}
					<div className="col-lg-6">
						<label>Date</label>
						<input
							type="date"
							value={expenseDate}
							onChange={(e) => setExpenseDate(e.target.value)}
							required
							disabled={load}
							className="height"
						/>
					</div>
					<div className="col-lg-6">
						<label>Expense Cost</label>
						<CurrencyInput
							id="input-example"
							name="input-name"
							decimalsLimit={2}
							onValueChange={(values) => {
								setCost(Number(values));
							}}
							prefix={`${currency} `}
							value={cost}
							disabled={load}
							className="height"
						/>
					</div>
					{!details.shopId && (
						<div className="col-lg-6 mb-3">
							<label>Shop</label>
							<DropDownSelect
								options={shops.filter((f) => f.isActive)}
								value={shopId}
								changeSelected={setShopId}
							/>
						</div>
					)}
					<div className="col-lg-12">
						<label>Description</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							disabled={load}
						/>
					</div>
					<div className="col-lg-12">
						<UploadWrapper>
							{proof ? (
								<div className="img-box">
									<a href={proof} target="_blank">
										View Uploaded Image
									</a>
									<button onClick={() => setProof("")}>
										X
									</button>
								</div>
							) : (
								<div className="upload-btn-wrapper">
									<button className="btn wide">
										{uploading
											? "Hold on..."
											: "Click to Upload image"}
									</button>
									<input
										disabled={uploading}
										type="file"
										name="myfile"
										onChange={fileUpload}
									/>
								</div>
							)}
						</UploadWrapper>
					</div>
				</div>
				<CheckBox className="mt-3 mb-4">
					<input
						type="checkbox"
						checked={isRecurrent}
						onChange={(e) => setIsRecurrent(e.target.checked)}
					/>
					<span>This is a Reoccuring Expense</span>
				</CheckBox>
				<div style={{ opacity: isRecurrent ? 1 : 0.3 }}>
					<label>Frequency Interval</label>
					<select
						disabled={load || !isRecurrent}
						value={frequency}
						onChange={(e) => setFrequency(e.target.value)}
						className="new-form height"
					>
						<option value={"once"}>Once</option>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
						<option value="yearly">Yearly</option>
					</select>
				</div>
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit type="submit" disabled={load}>
						Submit
					</ButtonSubmit>
				)}
			</Form>
		</>
	);
};

export default NewExpense;
