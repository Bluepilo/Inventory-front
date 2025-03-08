import React, { useEffect, useState } from "react";
import subscriptionService from "../../redux/features/subscription/subscriptionService";
import SkeletonTable from "../Loaders/SkeletonTable";
import SkeletonDetails from "../Loaders/SkeletonDetails";
import { FaCcMastercard, FaCcVisa, FaCreditCard } from "react-icons/fa6";
import { DebitCardStyle } from "../../styles/sub.styles";
import { FlexCenter } from "../../styles/basic.styles";
import { MainButton } from "../../styles/links.styles";
import { displayError, displaySuccess } from "../../utils/errors";

const CardList = () => {
	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>([]);

	useEffect(() => {
		window.scrollTo(0, 0);
		getCards();
	}, []);

	const getCards = async () => {
		try {
			setLoad(true);
			let res = await subscriptionService.getCards();
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const makeDefaultHandler = async (id: number) => {
		try {
			if (
				window.confirm(
					`Are you sure you want to make this your default card?`
				)
			) {
				setLoad(true);
				await subscriptionService.setDefaultCard(id);
				setLoad(false);
				displaySuccess("Default Card has been Changed");
				getCards();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const deleteHandler = async (id: number) => {
		try {
			if (window.confirm(`Are you sure you want to delete this card?`)) {
				setLoad(true);
				await subscriptionService.deleteCard(id);
				setLoad(false);
				displaySuccess("Card has been deleted.");
				getCards();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			{load ? (
				<SkeletonDetails />
			) : list?.rows?.length > 0 ? (
				<div className="row">
					{list.rows?.map((li: any) => (
						<div key={li.id} className="col-md-4 mb-3">
							<DebitCardStyle>
								<div className="text-end">
									{li?.cardType?.trim() === "visa" ? (
										<FaCcVisa color="blue" size={25} />
									) : li?.cardType?.trim() === "master" ? (
										<FaCcMastercard
											color="blue"
											size={25}
										/>
									) : (
										<FaCreditCard color="blue" size={25} />
									)}
								</div>
								<div className="text-center">
									<h3>**** **** **** {li.last4}</h3>
									<p>
										Expiry: {li.expYear}{" "}
										{li.isDefault && (
											<span>(Default Card)</span>
										)}
									</p>
								</div>
							</DebitCardStyle>
							<FlexCenter className="mt-3">
								{!li.isDefault && (
									<MainButton
										className="mx-2"
										sm="true"
										bg="#D4E9FF"
										color="#000D33"
										onClick={() =>
											makeDefaultHandler(li.id)
										}
									>
										<span>Make Default</span>
									</MainButton>
								)}
								<MainButton
									className="mx-2"
									sm="true"
									bg="#f44336"
									onClick={() => deleteHandler(li.id)}
								>
									<span>Delete Card</span>
								</MainButton>
							</FlexCenter>
						</div>
					))}
				</div>
			) : (
				<p>You do not have any card saved.</p>
			)}
		</div>
	);
};

export default CardList;
