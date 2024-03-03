import { HiDotsHorizontal } from "react-icons/hi";
import { Drop } from "../../styles/basic.styles";

const DropDowns = ({
	download,
	onEdit,
	onDelete,
}: {
	download: () => void;
	onEdit?: () => void;
	onDelete: () => void;
}) => {
	return (
		<Drop>
			<Drop.Toggle size="sm" id="dropdown-basic">
				<HiDotsHorizontal />
			</Drop.Toggle>

			<Drop.Menu>
				{onEdit && (
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
				<Drop.Item
					href="#"
					onClick={(e) => {
						e.preventDefault();
						download();
					}}
				>
					Download XLS
				</Drop.Item>
				<Drop.Item
					href="#2"
					onClick={(e) => {
						e.preventDefault();
						onDelete();
					}}
				>
					Delete
				</Drop.Item>
			</Drop.Menu>
		</Drop>
	);
};

export default DropDowns;
