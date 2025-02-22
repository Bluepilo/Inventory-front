import { ProductImg } from "../../styles/catalogue.styles";
import DefaultImg from "../../assets/images/image.png";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../redux/hooks";

const EachProductImage = ({
	product,
	onSelect,
}: {
	product: any;
	onSelect: (arg: any) => void;
}) => {
	const { currency } = useAppSelector((state) => state.auth);

	return (
		<ProductImg onClick={() => onSelect(product)}>
			<div className="img">
				<img
					src={product.image || product?.brand?.image || DefaultImg}
					className={
						product.image || product?.brand?.image ? "" : "no-i"
					}
				/>
			</div>
			<h5>{product.name}</h5>
			<h4>
				{currency} {formatCurrency(product.price)}
			</h4>
		</ProductImg>
	);
};

export default EachProductImage;
