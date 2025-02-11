import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { BasicSearch } from "../../../../components/Filters/BasicInputs";
import { UseDebounce } from "../../../../utils/hooks";
import { Table, TableComponent } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import SuccessIcon from "../../../../assets/icons/success.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";
import basicService from "../../../../redux/features/basic/basic-service";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Drop } from "../../../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import { displayError } from "../../../../utils/errors";
import { toast } from "react-toastify";
import { CiShop } from "react-icons/ci";
import ModalComponent from "../../../../components/ModalComponent";
import ShopForm from "../../../../components/Shop/ShopForm";
import NewPage from "../../../../components/NewPage";
import CoverImg from "../../../../assets/defaults/report.png";
import { allShops } from "../../../../redux/features/basic/basic-slice";

const Shop = () => {
	const dispatch = useAppDispatch();

	const { token, details } = useAppSelector((state) => state.auth);

	const [lists, setList] = useState<any>({});
	const [search, setSearch] = useState("");
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [shopDetail, setShopDetail] = useState<any>({});
	const [action, setAction] = useState("");
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchShop();
		} else {
			listShops();
		}
	}, [filters, debouncedSearch]);

	const searchShop = async () => {
		try {
			setLoad(true);
			let res = await basicService.searchShops(
				token,
				filters,
				debouncedSearch
			);
			setLoad(false);
			setList(res?.data);
		} catch (err) {
			setLoad(false);
		}
	};

	const listShops = async () => {
		try {
			setLoad(true);
			let res = await basicService.allShops(token, filters);
			setLoad(false);
			setList(res?.data);
		} catch (err) {
			setLoad(false);
		}
	};

	const activateHandler = async () => {
		try {
			setOpenConfirmation(false);
			setLoad(true);
			await basicService.actionShop(token, action, shopDetail?.id);
			toast.success(`Shop has been ${action}d.`);
			listShops();
			dispatch(allShops());
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const deleteHandler = async (id: any) => {
		if (window.confirm("Are you sure you want to delete?")) {
			try {
				setLoad(true);
				await basicService.deleteShop(token, id);
				toast.success(`Shop has been deleted.`);
				listShops();
				dispatch(allShops());
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return (
		<div>
			{details.business.onboardingSteps?.shop === "completed" ? (
				<>
					<TitleCover
						title="Shops"
						dataCount={lists?.count}
						button="Add Shop"
						buttonIcon={<CiShop />}
						buttonClick={() => {
							setShopDetail({});
							setOpenModal(true);
						}}
					/>
					<div className="mt-3">
						<div className="row">
							<div className="col-md-6">
								<BasicSearch
									searchVal={search}
									changeSearchVal={setSearch}
									wide="true"
									placeholder="Search by name, address or phone"
								/>
							</div>
						</div>
						<div className="mt-4">
							<TableComponent>
								<div className="table-responsive">
									<Table className="table">
										<thead>
											<tr>
												<th>Name</th>
												<th>Address</th>
												<th>State</th>
												<th>Phone</th>
												<th>Date Added</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										{!load && (
											<tbody>
												{lists?.rows?.map((l: any) => (
													<tr key={l.id}>
														<td>{l.name}</td>

														<td>{l.address}</td>

														<td>{l.state?.name}</td>
														<td>{l.phoneNo}</td>
														<td>
															{dateFormat(
																l.createdAt,
																"mmm dd, yyyy"
															)}
														</td>
														<td className="status">
															<img
																src={
																	l.isActive
																		? SuccessIcon
																		: FailedIcon
																}
															/>
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
																			setAction(
																				l.isActive
																					? "deactivate"
																					: "activate"
																			);
																			setShopDetail(
																				l
																			);
																			setOpenConfirmation(
																				true
																			);
																		}}
																	>
																		{l.isActive
																			? "Close"
																			: "Open"}
																	</Drop.Item>
																	<Drop.Item
																		href="#2"
																		onClick={(
																			e
																		) => {
																			e.preventDefault();
																			setShopDetail(
																				l
																			);
																			setOpenModal(
																				true
																			);
																		}}
																	>
																		Edit
																	</Drop.Item>
																	{l
																		.transactions
																		?.length ===
																		0 && (
																		<Drop.Item
																			href="#2"
																			onClick={(
																				e
																			) => {
																				e.preventDefault();
																				deleteHandler(
																					l.id
																				);
																			}}
																		>
																			Delete
																		</Drop.Item>
																	)}
																</Drop.Menu>
															</Drop>
														</td>
													</tr>
												))}
											</tbody>
										)}
									</Table>
								</div>
								{load && <SkeletonTable />}
							</TableComponent>
							{lists?.count ? (
								<Paginate
									changeLimit={(l) => setLimit(l)}
									limit={lists.limit}
									count={lists.count}
									pageNumber={page}
									onPrev={(n) => setPage(n)}
									onNext={(n) => setPage(n)}
								/>
							) : (
								<></>
							)}
						</div>
					</div>
				</>
			) : (
				<NewPage
					title={"Shops"}
					img={CoverImg}
					cover="Create Shops"
					desc={
						"Maintain a database of your shops to manage your business"
					}
					btnTitle={"Create Shop"}
					linkTo={() => {
						setShopDetail({});
						setOpenModal(true);
					}}
				/>
			)}
			<ConfirmModal
				open={openConfirmation}
				close={() => setOpenConfirmation(false)}
				confirm={() => activateHandler()}
				label={`Are you sure you want to ${action}?`}
			/>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={shopDetail?.id ? "Edit Shop" : "New Shop"}
			>
				<ShopForm
					detail={shopDetail}
					onComplete={() => {
						setOpenModal(false);
						listShops();
					}}
				/>
			</ModalComponent>
		</div>
	);
};

export default Shop;
