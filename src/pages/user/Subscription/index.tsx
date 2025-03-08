import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { SwitchDiv } from "../../../styles/basic.styles";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useAppSelector } from "../../../redux/hooks";
import { TableComponent } from "../../../styles/table.styles";
import SubHistory from "../../../components/Subscription/SubHistory";
import WalletHistory from "../../../components/Subscription/WalletHistory";
import { useNavigate } from "react-router-dom";
import { SummaryCard } from "../../../styles/dashboard.styles";
import { formatCurrency } from "../../../utils/currency";
import ModalComponent from "../../../components/ModalComponent";
import MakePayment from "../../../components/Subscription/MakePayment";
import CardList from "../../../components/Subscription/CardList";

const Subscription = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);

	const [pageType, setPageType] = useState("sub");
	const [openModal, setOpenModal] = useState(false);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<TitleCover
				title="Subscription History"
				button={
					pageType === "sub"
						? "Upgrade"
						: pageType === "wallet"
						? "Load Wallet"
						: "Add New Card"
				}
				buttonIcon={<FaMoneyCheckAlt />}
				buttonClick={() =>
					pageType === "sub"
						? navigate("upgrade")
						: setOpenModal(true)
				}
			/>
			<SwitchDiv style={{ width: "55%" }}>
				<div
					className={pageType === "sub" ? "active" : ""}
					onClick={() => setPageType("sub")}
				>
					My Subscription
				</div>
				<div
					className={pageType === "wallet" ? "active" : ""}
					onClick={() => setPageType("wallet")}
				>
					My Wallet
				</div>
				<div
					className={pageType === "card" ? "active" : ""}
					onClick={() => setPageType("card")}
				>
					Cards
				</div>
			</SwitchDiv>
			{pageType === "wallet" && (
				<div className="row align-items-center mt-4">
					<div className="col-lg-6 mb-3">
						<SummaryCard>
							<div>
								<h6>Wallet Balance:</h6>
								<h6>
									₦{" "}
									{formatCurrency(
										details.organization?.wallet?.balance
									)}
								</h6>
							</div>
						</SummaryCard>
					</div>
				</div>
			)}
			<div className="mt-4">
				<TableComponent>
					{pageType === "sub" ? (
						<SubHistory />
					) : pageType === "wallet" ? (
						<WalletHistory reload={reload} />
					) : (
						<CardList />
					)}
				</TableComponent>
			</div>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<MakePayment
					close={() => setOpenModal(false)}
					complete={() => setReload(!reload)}
					pageType={pageType}
				/>
			</ModalComponent>
		</div>
	);
};

export default Subscription;
