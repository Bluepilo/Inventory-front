import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { CiShop } from "react-icons/ci";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/catalogue.png";
import TitleCover from "../../../components/TitleCover";
import { SummaryCard } from "../../../styles/dashboard.styles";
import productService from "../../../redux/features/product/product-service";
import { Table, TableComponent } from "../../../styles/table.styles";
import { FormCheck } from "react-bootstrap";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import DropDowns from "../../../components/Catalogue/DropDowns";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { Link } from "react-router-dom";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { displayError } from "../../../utils/errors";
import { toast } from "react-toastify";
import ModalComponent from "../../../components/ModalComponent";
import BrandForm from "../../../components/Catalogue/BrandForm";
import NewBrand from "../../../components/Catalogue/NewBrand";
import Papa from "papaparse";

const Catalogue = () => {
	const { details, token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [managedBrands, setManagedBrands] = useState<any>([]);
	const [selfServiceBrands, setSelfServiceBrands] = useState<any>([]);

	const [openNew, setOpenNew] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [brandDetail, setBrandDetail] = useState<any>(null);

	useEffect(() => {
		getBrands();
	}, []);

	const getBrands = async () => {
		try {
			setLoad(true);
			let res = await productService.allBrands(token);
			setLoad(false);
			if (Array.isArray(res)) {
				let managed = res.filter((m) => m.managed);
				let self = res.filter((s) => !s.managed);
				setManagedBrands(managed);
				setSelfServiceBrands(self);
			}
		} catch (err) {
			setLoad(false);
		}
	};

	const deleteHandler = async (id: string, name: string) => {
		if (window.confirm(`Are you sure you want to delete ${name}`)) {
			try {
				setLoad(true);
				await productService.deleteBrand(token, id);
				setLoad(false);
				toast.success(`${name} has been deleted successfully.`);
				getBrands();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	const xlsHandler = async (id: any, name: string) => {
		try {
			let res = await productService.listBrandProducts(
				token,
				"&all=true",
				id
			);
			let data = res.rows;
			if (data?.length === 0) {
				toast.error(`No products available for ${name}`);
				return;
			}

			const csvData = data?.map((value: any) => ({
				brandName: value.brand_,
				productName: value.name,
				category: value.category_,
				size: value.size,
				type: value.type,
				colour: value.colour,
				year: value.year,
				productCode: value.productCode,
				sellingPrice: value.price,
				costPrice: value.costPrice,
			}));

			const csvReport = {
				filename: `${name}_Catalogue.csv`,
				headers: [],
				data: csvData,
			};

			const csvContent = Papa.unparse(csvData);
			const blob = new Blob([csvContent], {
				type: "text/csv;charset=utf-8;",
			});
			const url = URL.createObjectURL(blob);
			const downloadLink = document.createElement("a");
			downloadLink.href = url;
			downloadLink.target = "_blank";
			downloadLink.download = csvReport.filename;
			downloadLink.click();
			URL.revokeObjectURL(url);
		} catch (err) {
			displayError(err, true);
		}
	};

	const updateManaged = async (id: string, name: string, status: boolean) => {
		try {
			let url;
			if (status) {
				url = "allow-update";
			} else {
				url = "stop-update";
			}

			setLoad(true);
			await productService.updateManaged(token, url, id, {
				brandId: id,
				status,
			});
			setLoad(false);
			toast.success(`${name} has been updated`);
			getBrands();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<>
			{details.business.onboardingSteps?.product === "completed" ? (
				<div>
					<TitleCover
						title="My Catalogue"
						button="Add Brand"
						buttonIcon={<CiShop />}
						buttonClick={() => {
							setOpenNew(true);
						}}
					/>
					<div className="row align-items-center mt-4">
						<div className="col-lg-6 mb-3">
							<SummaryCard>
								<div>
									<h6>Managed Brands:</h6>
									<h6>
										{load ? "--" : managedBrands.length}
									</h6>
								</div>
								<div>
									<h6>Self Service Brands:</h6>
									<h6>
										{load ? "--" : selfServiceBrands.length}
									</h6>
								</div>
							</SummaryCard>
						</div>
					</div>
					<div className="mt-4">
						<TableComponent>
							<div className="table-responsive">
								<Table className="table">
									<thead>
										<tr>
											<th>Brand</th>
											<th>Updates</th>
											<th>Status</th>
											<th>Type</th>
											<th>Actions</th>
										</tr>
									</thead>
									{!load && (
										<>
											<tbody>
												{managedBrands.map((m: any) => (
													<tr key={m.id}>
														<td className="link">
															<Link
																to={`${m.id}`}
																state={{
																	name: m.name,
																}}
															>
																{m.name}
															</Link>
														</td>
														<td>
															<FormCheck
																type="switch"
																id={`custom-switch-${m.id}`}
																label=""
																checked={
																	m.allowUpdate
																}
																onChange={(
																	e
																) => {
																	updateManaged(
																		m.id,
																		m.name,
																		e.target
																			.checked
																	);
																}}
															/>
														</td>
														<td className="status">
															<img
																src={
																	m.isActive
																		? SuccessIcon
																		: FailedIcon
																}
															/>
														</td>
														<td>Managed</td>
														<td>
															<DropDowns
																download={() =>
																	xlsHandler(
																		m.id,
																		m.name
																	)
																}
																onDelete={() =>
																	deleteHandler(
																		m.id,
																		m.name
																	)
																}
															/>
														</td>
													</tr>
												))}
											</tbody>
											<tbody className="line">
												{selfServiceBrands.map(
													(s: any) => (
														<tr key={s.id}>
															<td className="link">
																<Link
																	to={`${s.id}`}
																	state={{
																		name: s.name,
																	}}
																>
																	{s.name}
																</Link>
															</td>
															<td>
																<MdOutlineRadioButtonChecked
																	size={20}
																	color="#333"
																/>
															</td>
															<td className="status">
																<img
																	src={
																		s.isActive
																			? SuccessIcon
																			: FailedIcon
																	}
																/>
															</td>
															<td>
																Self Service
															</td>

															<td>
																<DropDowns
																	download={() =>
																		console.log(
																			""
																		)
																	}
																	onDelete={() =>
																		deleteHandler(
																			s.id,
																			s.name
																		)
																	}
																	onEdit={() => {
																		setBrandDetail(
																			s
																		);
																		setOpenEdit(
																			true
																		);
																	}}
																/>
															</td>
														</tr>
													)
												)}
											</tbody>
										</>
									)}
								</Table>
							</div>
							{load && <SkeletonTable />}
						</TableComponent>
					</div>
					<ModalComponent
						open={openEdit}
						close={() => setOpenEdit(false)}
						title="Edit Brand"
					>
						<BrandForm
							brandDetail={brandDetail}
							onComplete={() => {
								setOpenEdit(false);
								getBrands();
							}}
						/>
					</ModalComponent>
				</div>
			) : (
				<NewPage
					title={"Catalogue"}
					img={CoverImg}
					cover="Catalogue"
					desc={`Enjoy the self-service features by creating your own products and services with few clicks or simply upload the list via the CSV import (Excel) \n Request for your favorite brand and we provide you with the current product list and price. (T&C applied)`}
					btnTitle={"Add Brand"}
					linkTo={() => setOpenNew(true)}
				/>
			)}
			<ModalComponent open={openNew} close={() => setOpenNew(false)}>
				<NewBrand
					onComplete={() => {
						setOpenNew(false);
						getBrands();
					}}
				/>
			</ModalComponent>
		</>
	);
};

export default Catalogue;
