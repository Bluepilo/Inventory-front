import { IoMdCheckmarkCircleOutline, IoMdCloudDownload } from "react-icons/io";
import TitleCover from "../../../components/TitleCover";
import { MainButton } from "../../../styles/links.styles";
import { Table } from "../../../styles/table.styles";
import { uploadData } from "../../../utils/data";
import {
	DropDownSelect,
	OptionProp,
} from "../../../components/Filters/BasicInputs";
import { useState } from "react";
import { UploadWrapper } from "../../../styles/basic.styles";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";
import config from "../../../utils/config";
import LoadModal from "../../../components/Loaders/LoadModal";
import { displayError } from "../../../utils/errors";
import UploadErrors from "../../../components/Catalogue/UploadErrors";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UploadProduct = () => {
	const navigate = useNavigate();

	const params = useParams();

	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [file, setFile] = useState<any>(null);
	const [selectedMode, setSelectedMode] = useState<OptionProp | null>(null);

	const [loadError, setLoadError] = useState(false);
	const [errors, setErrors] = useState([]);

	const downloadSample = () => {
		const excelFilePath = process.env.PUBLIC_URL + "/Upload_template.xlsx";

		fetch(excelFilePath)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = "Brand_Upload_Template.xls";
				link.click();
				URL.revokeObjectURL(url);
			});
	};

	const fileUpload = (e: any) => {
		setFile(e.target.files[0]);
	};

	const uploadHandler = async () => {
		if (!file) {
			alert("No file uploaded");
			return;
		}

		if (!selectedMode?.value) {
			alert("Please select product type");
			return;
		}

		try {
			setLoad(true);
			let mode = String(selectedMode?.value);

			const formData = new FormData();
			formData.append("file", file);
			formData.append("mode", mode);

			axios({
				method: "post",
				url: `${config.baseUrl}/product/upload-product-excel`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			})
				.then(function (res) {
					setLoad(false);
					let errors =
						res?.data?.data?.length > 0 && res?.data?.data[1];
					if (errors) {
						toast.success(
							`File Uploaded successfully with ${errors.length} errors.`
						);
						setLoadError(true);
						setErrors(res?.data?.data[1]);
					} else {
						toast.success("File has been uploaded successfully.");
						navigate(`/dashboard/catalogue/${params.id}`);
					}
				})
				.catch(function (err) {
					setLoad(false);
					if (err.response?.data?.data?.errors?.length > 0) {
						setLoadError(true);
						setErrors(err?.response?.data?.data?.errors);
					}
					setLoadError(true);
					displayError(err, true);
				});
		} catch (err: any) {
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover title={`Upload a File (Products Bulk Import)`} />
			<div className="mt-4">
				<p>
					Instantly add new items or folders into Bluepilo App using
					our bulk import template
				</p>
				<p>File type supported: CSV, XLSX, XLS</p>
				<div className="mt-2">
					<p className="fw-bold">
						1. Download our Bluepilo Import Template.
					</p>
					<MainButton onClick={downloadSample} right="true">
						<span>Download</span>
						<IoMdCloudDownload />
					</MainButton>
					<br />
					<span>
						Note: Kindly go download the Brand csv and edit the cost
						for price update
					</span>
					<p className="fw-bold mt-3">2.1. Fill in your data</p>
					<span>
						Fields in{" "}
						<strong style={{ color: "#F44336" }}>
							Red are compulsory
						</strong>{" "}
						and others are optional. Just like the sample table
						below.
					</span>
					<div className="table-responsive mt-4">
						<Table className="table table-bordered">
							<thead className="bg-light">
								<tr>
									<th style={{ color: "#F44336" }}>
										Brand Name
									</th>
									<th style={{ color: "#F44336" }}>
										Category
									</th>
									<th style={{ color: "#F44336" }}>
										Product Name
									</th>
									<th>Size</th>
									<th>Type</th>
									<th>Colour</th>
									<th>Year</th>
									<th>Product Code</th>
									<th style={{ color: "#F44336" }}>
										Cost Price
									</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{uploadData.map((item, index) => (
									<tr key={index}>
										<td>{item.brandName}</td>
										<td>{item.category}</td>
										<td>{item.productName}</td>
										<td>{item.size}</td>
										<td>{item.type}</td>
										<td>{item.colour}</td>
										<td>{item.year}</td>
										<td>{item.productCode}</td>
										<td>{item.costPrice}</td>
										<td>{item.price}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
					<p className="fw-bold">
						2.2. Your Category should be picked from dropdown
						provided.
					</p>
					<p className="fw-bold" style={{ margin: 0, padding: 0 }}>
						3. Select the type of product you are uploading
					</p>
					<div className="row mb-3">
						<div className="col-lg-6">
							<DropDownSelect
								options={[
									{
										label: "New Products Only",
										value: "new_only",
									},
									{
										label: " Existing Products with price changes",
										value: "price_only",
									},
									{
										label: "New Products and Existing Products with price changes",
										value: "allow_all",
									},
								]}
								value={selectedMode}
								changeSelected={setSelectedMode}
							/>
						</div>
					</div>
					<p className="fw-bold">
						4. Add your file below then Import
					</p>
					<div className="row mb-3">
						<div className="col-lg-6">
							<UploadWrapper>
								<div className="upload-btn-wrapper">
									<button className="btn wide">
										Select File
									</button>
									<input
										type="file"
										name="myfile"
										onChange={fileUpload}
										accept=".csv, .xls, .xlsx"
									/>
								</div>
							</UploadWrapper>
							{file && <p>{file.name} Selected</p>}
							<div className="text-center mt-3">
								<MainButton
									right="true"
									onClick={uploadHandler}
								>
									<span>Import</span>
									<IoMdCheckmarkCircleOutline />
								</MainButton>
							</div>
						</div>
					</div>
				</div>
			</div>
			{load && <LoadModal open={true} />}
			{loadError && (
				<UploadErrors
					errors={errors}
					openModal={loadError}
					closeModal={setLoadError}
				/>
			)}
		</div>
	);
};

export default UploadProduct;
