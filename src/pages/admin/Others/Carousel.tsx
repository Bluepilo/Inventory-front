import React, { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { Alert, ComingSoon } from "../../../styles/basic.styles";
import { displayError, displaySuccess } from "../../../utils/errors";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import { FaPlus } from "react-icons/fa6";
import { Table, TableComponent } from "../../../styles/table.styles";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import ModalComponent from "../../../components/ModalComponent";
import CarouselForm from "../../../components/Carousel/CarouselForm";
import { MainButton } from "../../../styles/links.styles";

const Carousel = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [openModal, setOpenModal] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [detail, setDetail] = useState<any>(null);

	useEffect(() => {
		listCarousels();
	}, []);

	const listCarousels = async () => {
		try {
			setLoad(true);
			let res = await adminService.allCarousels(token);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const deleteHandler = async (id: number) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			try {
				setLoad(true);
				await adminService.deleteCarousel(token, id);
				displaySuccess("Carousel deleted Successfully!");
				setLoad(false);
				listCarousels();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return (
		<div>
			<TitleCover
				title={"Ads Carousel"}
				button={"Add New"}
				buttonIcon={<FaPlus />}
				buttonClick={() => {
					setDetail(null);
					setOpenModal(true);
				}}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Title</th>
									<th>For</th>
									<th>Image</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{!load &&
									list?.rows?.map((li: any) => (
										<tr key={li.id}>
											<td>{li.title}</td>
											<td>{li.type}</td>
											<td className="link">
												<a
													href={li.image}
													target="_blank"
												>
													View
												</a>
											</td>
											<td>
												<MainButton
													sm="true"
													onClick={() => {
														setDetail(li);
														setOpenModal(true);
													}}
												>
													<span>Edit</span>
												</MainButton>
												<MainButton
													sm="true"
													bg="red"
													className="ms-2"
													onClick={() =>
														deleteHandler(li.id)
													}
												>
													<span>Delete</span>
												</MainButton>
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
						limit={list.limit}
						count={list.count}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={detail ? "Edit Carousel" : "Add Carousel"}
			>
				<CarouselForm
					onClose={() => setOpenModal(false)}
					onSubmit={() => listCarousels()}
					detail={detail}
				/>
			</ModalComponent>
		</div>
	);
};

export default Carousel;
