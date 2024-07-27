import { HiDotsHorizontal } from "react-icons/hi";
import { Drop } from "../../styles/basic.styles";

const DropDownProduct = ({
	onEdit,
	onDelete,
	showDelete,
	showEdit,
}: {
	showDelete: boolean;
	showEdit: boolean;
	onEdit: () => void;
	onDelete: () => void;
}) => {
	return (
		<Drop>
			<Drop.Toggle size="sm" id="dropdown-basic">
				<HiDotsHorizontal />
			</Drop.Toggle>

			<Drop.Menu>
				{showEdit && (
					<Drop.Item
						href="#"
						onClick={(e) => {
							e.preventDefault();
							onEdit();
						}}
					>
						Edit
					</Drop.Item>
				)}
				{showDelete && (
					<Drop.Item
						href="#2"
						onClick={(e) => {
							e.preventDefault();
							onDelete();
						}}
					>
						Delete
					</Drop.Item>
				)}
			</Drop.Menu>
		</Drop>
	);
};

export default DropDownProduct;
