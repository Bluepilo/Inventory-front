import React, { useEffect, useState } from "react";
import PermissionDenied from "../../../../components/PermissionDenied";
import { useAppSelector } from "../../../../redux/hooks";
import TitleCover from "../../../../components/TitleCover";
import { Table, TableComponent } from "../../../../styles/table.styles";
import productService from "../../../../redux/features/product/product-service";
import { displayError, displaySuccess } from "../../../../utils/errors";
import adminService from "../../../../redux/features/admin/admin-service";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import ModalComponent from "../../../../components/ModalComponent";
import ProductCategoryForm from "../../../../components/Catalogue/ProductCategoryForm";
import { CiCirclePlus } from "react-icons/ci";

const Categories = () => {
	const { details } = useAppSelector((state) => state.auth);

	const [list, setList] = useState<any>([]);
	const [load, setLoad] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [detail, setDetail] = useState<any>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		listProductCategories();
	}, []);

	const listProductCategories = async () => {
		try {
			setLoad(true);
			let res = await adminService.listProductCategories();
			setLoad(false);
			if (Array.isArray(res)) {
				setList(res);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const deleteHandler = async (obj: any) => {
		if (window.confirm(`Are you sure you want to delete ${obj.name}`)) {
			try {
				setLoad(true);
				await productService.deleteProductCategory(obj.id, true);
				setLoad(false);
				listProductCategories();
				displaySuccess("Category has been deleted!");
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return details?.role?.permissions?.find((f) => f.method === "listBrand") ? (
		<div>
			<TitleCover
				title="Categories"
				dataCount={list?.length}
				button={"Add Category"}
				buttonIcon={<CiCirclePlus />}
				buttonClick={() => {
					setDetail(null);
					setOpenModal(true);
				}}
			/>
			<div className="mt-3">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Image</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{!load &&
									list.map((li: any) => (
										<tr key={li.id}>
											<td>{li.name}</td>
											<td className="img">
												{li.image ? (
													<img src={li.image} />
												) : (
													<span>
														No Image attached
													</span>
												)}
											</td>
											<td className="bbtn">
												<button
													onClick={() => {
														setDetail(li);
														setOpenModal(true);
													}}
												>
													Edit
												</button>
												<button
													onClick={() => {
														deleteHandler(li);
													}}
													className="ms-2"
													style={{
														background: "red",
														color: "#fff",
													}}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
			</div>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<ProductCategoryForm
					detail={detail}
					onComplete={() => {
						setOpenModal(false);
						listProductCategories();
					}}
				/>
			</ModalComponent>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default Categories;
