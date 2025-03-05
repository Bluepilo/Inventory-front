import { useEffect, useState } from "react";
import adminService from "../../../redux/features/admin/admin-service";
import { displayError, displaySuccess } from "../../../utils/errors";
import PageCover from "../../../components/PageCover";
import TitleCover from "../../../components/TitleCover";
import { CiCirclePlus } from "react-icons/ci";
import ModalComponent from "../../../components/ModalComponent";
import DiscountForm from "../../../components/Forms/DiscountForm";
import { Table, TableComponent } from "../../../styles/table.styles";
import { Link } from "react-router-dom";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import { Drop } from "../../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";

const Discounts = () => {
	const [list, setList] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [detail, setDetail] = useState<any>(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	useEffect(() => {
		listDiscounts();
	}, []);

	const listDiscounts = async () => {
		try {
			setLoad(true);
			let res = await adminService.listDiscounts();
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const deleteHandler = async (arg: any) => {
		if (window.confirm(`Are you sure you want to delete ${arg.name}?`)) {
			try {
				setLoad(true);
				await adminService.deleteDiscount(arg.id);
				setLoad(false);
				listDiscounts();
				displaySuccess("Discount Deleted!");
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return (
		<PageCover permission="listTransactions">
			<div>
				<TitleCover
					title="Discounts"
					dataCount={list?.rows?.length}
					button={"Add Discount"}
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
										<th>Type</th>
										<th>Value</th>
										<th>Condition</th>
										<th>Organization</th>
										<th>Usage</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{!load &&
										list?.rows &&
										list.rows?.map((li: any) => (
											<tr key={li.id}>
												<td>{li.name}</td>
												<td>{li.type}</td>
												<td>{li.value}</td>
												<td>{li.condition}</td>
												<td className="link">
													{li.organizationId ? (
														<Link
															to={`/admin/organizations/${li.organizationId}`}
														>
															View Organization
														</Link>
													) : (
														<span>For All</span>
													)}
												</td>
												<td>
													{li.usage
														? "In Use"
														: "Not In Use"}
												</td>
												<td>
													<Drop>
														<Drop.Toggle
															size="sm"
															id="dropdown-basic"
														>
															<HiDotsVertical />
														</Drop.Toggle>
														<Drop.Menu>
															<Drop.Item
																href="#"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	setDetail(
																		li
																	);
																	setOpenModal(
																		true
																	);
																}}
															>
																Edit
															</Drop.Item>
															<Drop.Item
																href="#"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	deleteHandler(
																		li
																	);
																}}
															>
																Delete
															</Drop.Item>
														</Drop.Menu>
													</Drop>
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						{load && <SkeletonTable />}
					</TableComponent>
					{!load && list?.count ? (
						<Paginate
							changeLimit={(l) => setLimit(l)}
							limit={limit}
							count={list.count}
							pageNumber={page}
							onPrev={(n) => setPage(n)}
							onNext={(n) => setPage(n)}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<DiscountForm
					detail={detail}
					onComplete={() => {
						setOpenModal(false);
						listDiscounts();
					}}
				/>
			</ModalComponent>
		</PageCover>
	);
};

export default Discounts;
