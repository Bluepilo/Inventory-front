import React from "react";
import { ProductImg } from "../../styles/catalogue.styles";
import DefaultImg from "../../assets/images/image.png";
import { useAppSelector } from "../../redux/hooks";
import { formatCurrency } from "../../utils/currency";
import { Flex } from "../../styles/basic.styles";
import { MainButton } from "../../styles/links.styles";
import { useNavigate } from "react-router-dom";

const EachCatalogue = ({
	item,
	deleteHandler,
}: {
	item: any;
	deleteHandler: (arg: any, arg2: any) => void;
}) => {
	const { currency, details } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();

	const ifAllowed = (method: string) => {
		if (details.role.isAdmin) {
			return details.role.permissions?.find((f) => f.method === method)
				? true
				: false;
		} else {
			return true;
		}
	};

	return (
		<ProductImg>
			<div className="img">
				<img
					src={item.image || item?.brand?.image || DefaultImg}
					className={item.image || item?.brand?.image ? "" : "no-i"}
				/>
			</div>
			<h5 style={{ color: item.isService ? "#0241FF" : "inherit" }}>
				{item.summary}
			</h5>
			<Flex>
				<h4 className="me-2">
					<s>
						{currency} {formatCurrency(item.costPrice)}
					</s>
				</h4>
				<h4>
					{currency} {formatCurrency(item.price)}
				</h4>
			</Flex>
			<div className="buttons">
				<Flex>
					{ifAllowed("updateProduct") && (
						<MainButton
							sm="true"
							className="me-3"
							onClick={() =>
								navigate("new", {
									state: item,
								})
							}
						>
							<span>Edit</span>
						</MainButton>
					)}
					{ifAllowed("deleteProduct") && (
						<MainButton
							sm="true"
							bg="red"
							onClick={() => deleteHandler(item.id, item.name)}
						>
							<span>Delete</span>
						</MainButton>
					)}
				</Flex>
			</div>
		</ProductImg>
	);
};

export default EachCatalogue;
