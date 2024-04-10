import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { displayError } from "../../../utils/errors";
import customerService from "../../../redux/features/customer/customer-services";
import { useAppSelector } from "../../../redux/hooks";
import { useParams } from "react-router-dom";
import SkeletonDetails from "../../../components/Loaders/SkeletonDetails";
import { Alert, ComingSoon } from "../../../styles/basic.styles";
import { ActionDetailsDiv, DetailCard } from "../../../styles/sale.styles";
import { RiShieldUserFill } from "react-icons/ri";
import { IoBusinessOutline } from "react-icons/io5";
import { UnderlineLink, WideButton } from "../../../styles/links.styles";
import ModalComponent from "../../../components/ModalComponent";
import AddUser from "../../../components/Users/AddUser";
import AddToBusiness from "../../../components/Users/AddToBusiness";
import NextofKin from "../../../components/Users/NextofKin";
import ChangePassword from "../../../components/Users/ChangePassword";

const Details = () => {
	const [load, setLoad] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState("");

	const params = useParams();

	const { token } = useAppSelector((state) => state.auth);

	const [detail, setDetail] = useState<any>({});
	const [error, setError] = useState("");

	useEffect(() => {
		getDetails();
	}, []);

	const getDetails = async () => {
		try {
			setError("");
			setLoad(true);
			let res = await customerService.userDetails(
				token,
				"user",
				params?.id
			);
			setDetail(res);
			setLoad(false);
		} catch (err) {
			setLoad(false);
			let msg = displayError(err, true);
			setError(msg);
		}
	};

	const removeHandler = async (id: number) => {
		if (
			window.confirm(
				"Are you sure you want to remove this user from this business"
			)
		) {
			try {
				setLoad(true);
				await customerService.removeUserFromBusiness(
					token,
					id,
					detail.id
				);
				setLoad(false);
				getDetails();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return (
		<div>
			<TitleCover title="User Details" />
			<div className="mt-3">
				{load ? (
					<SkeletonDetails />
				) : error ? (
					<ComingSoon>
						<Alert>
							{error.includes("not found")
								? "You might want to switch to a business that has this user. User not found."
								: error}{" "}
						</Alert>
					</ComingSoon>
				) : (
					detail?.id && (
						<ActionDetailsDiv>
							<div className="row">
								<div className="col-lg-6 mb-4">
									<DetailCard style={{ height: "100%" }}>
										<div className="head">
											<div className="sale-info">
												<h6>{detail.fullName}</h6>
											</div>
											<div className="user-info">
												<p>
													{detail.image ? (
														<img
															src={detail.image}
														/>
													) : (
														<RiShieldUserFill />
													)}
													<span>
														{detail.username}
													</span>
												</p>
											</div>
										</div>
										<div className="body">
											<div className="row">
												<span className="col-4 mb-2">
													Full Name:
												</span>
												<b className="col-8 mb-2">
													{detail.fullName}
												</b>
												<span className="col-4 mb-2">
													Username:
												</span>
												<b className="col-8 mb-2">
													{detail.username}
												</b>
												<span className="col-4 mb-2">
													Email:
												</span>
												<b className="col-8 mb-2">
													{detail.email}
												</b>
												<span className="col-4 mb-2">
													Phone Number:
												</span>
												<b className="col-8 mb-2">
													{detail.phoneNo}
												</b>
												<span className="col-4 mb-2">
													Address:
												</span>
												<b className="col-8 mb-2">
													{detail.address}
												</b>
											</div>
											<div className="row mt-3">
												<div className="col-md-6">
													<WideButton
														onClick={() => {
															setModalType(
																"edit"
															);
															setOpenModal(true);
														}}
													>
														<span>
															Edit Details
														</span>
													</WideButton>
												</div>
											</div>
											<div className="row mt-3">
												<div className="col-md-6">
													<WideButton
														bg="red"
														onClick={() => {
															setModalType(
																"password"
															);
															setOpenModal(true);
														}}
													>
														<span>
															Reset Password
														</span>
													</WideButton>
												</div>
											</div>
										</div>
									</DetailCard>
								</div>
								<div className="col-lg-6 mb-4">
									<DetailCard style={{ height: "100%" }}>
										<div className="biz-detail">
											<h5>Businesses Managed</h5>

											{detail.allowedBusinesses?.length >
												0 && (
												<div className="each">
													{detail.allowedBusinesses.map(
														(biz: any) => (
															<div
																className="each"
																key={biz.id}
															>
																<h6>
																	<IoBusinessOutline />{" "}
																	<span>
																		{
																			biz
																				.business
																				?.name
																		}
																	</span>
																</h6>
																<div className="body">
																	<div className="para">
																		<span>
																			Role
																			in
																			Business:
																		</span>
																		<b>
																			{
																				biz
																					.role
																					?.name
																			}
																		</b>
																	</div>
																	<div className="para">
																		{!biz?.shopId && (
																			<>
																				<span>
																					Shop:
																				</span>
																				<b>
																					{
																						biz
																							.shop
																							?.name
																					}
																					dfff
																				</b>
																			</>
																		)}
																	</div>
																	<div className="para text-end">
																		<UnderlineLink
																			href="#"
																			onClick={(
																				e
																			) => {
																				e.preventDefault();
																				removeHandler(
																					biz
																						.business
																						.id
																				);
																			}}
																		>
																			Remove
																			from
																			business
																		</UnderlineLink>
																	</div>
																</div>
															</div>
														)
													)}
												</div>
											)}
											<div className="row mt-3">
												<div className="col-md-6">
													<WideButton
														onClick={() => {
															setModalType("add");
															setOpenModal(true);
														}}
													>
														<span>
															Add More Business
														</span>
													</WideButton>
												</div>
											</div>
										</div>
									</DetailCard>
								</div>
								<div className="col-lg-6 mb-4">
									<DetailCard>
										<div className="biz-detail">
											<h5>Next of Kin Details</h5>
										</div>
										<div className="body">
											<div className="row">
												<span className="col-4 mb-2">
													Full Name:
												</span>
												<b className="col-8 mb-2">
													{detail.nokName}
												</b>
												<span className="col-4 mb-2">
													Email:
												</span>
												<b className="col-8 mb-2">
													{detail.nokEmail}
												</b>
												<span className="col-4 mb-2">
													Phone Number:
												</span>
												<b className="col-8 mb-2">
													{detail.nokPhoneNo}
												</b>
												<span className="col-4 mb-2">
													Address:
												</span>
												<b className="col-8 mb-2">
													{detail.nokAddress}
												</b>
											</div>
											<div className="row mt-3">
												<div className="col-md-6">
													<WideButton
														onClick={() => {
															setModalType("nok");
															setOpenModal(true);
														}}
													>
														<span>Update</span>
													</WideButton>
												</div>
											</div>
										</div>
									</DetailCard>
								</div>
							</div>
						</ActionDetailsDiv>
					)
				)}
			</div>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				{modalType === "edit" ? (
					<AddUser
						editDetails={detail}
						onComplete={() => {
							setOpenModal(false);
							getDetails();
						}}
					/>
				) : modalType === "add" ? (
					<AddToBusiness
						detail={detail}
						close={() => {
							setOpenModal(false);
							getDetails();
						}}
					/>
				) : modalType === "nok" ? (
					<NextofKin
						detail={detail}
						close={() => {
							setOpenModal(false);
							getDetails();
						}}
					/>
				) : modalType === "password" ? (
					<ChangePassword
						detail={detail}
						close={() => {
							setOpenModal(false);
							getDetails();
						}}
					/>
				) : (
					<></>
				)}
			</ModalComponent>
		</div>
	);
};

export default Details;
