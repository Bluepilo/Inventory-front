import { HiDotsHorizontal } from "react-icons/hi";
import { Drop } from "../../styles/basic.styles";
import { useNavigate } from "react-router-dom";

const DropDowns = ({
	suspend,
	active,
	onEdit,
	onNavigate,
}: {
	suspend: () => void;
	active: boolean;
	onEdit: () => void;
	onNavigate: () => void;
}) => {
	const navigate = useNavigate();
	return (
		<Drop>
			<Drop.Toggle size="sm" id="dropdown-basic">
				<HiDotsHorizontal />
			</Drop.Toggle>

			<Drop.Menu>
				<Drop.Item
					href="#"
					onClick={(e) => {
						e.preventDefault();
						onNavigate();
					}}
				>
					Details
				</Drop.Item>
				<Drop.Item
					href="#2"
					onClick={(e) => {
						e.preventDefault();
						onEdit();
					}}
				>
					Edit
				</Drop.Item>
				<Drop.Item
					href="#"
					onClick={(e) => {
						e.preventDefault();
						suspend();
					}}
				>
					{active ? "Suspend" : "Activate"}
				</Drop.Item>
			</Drop.Menu>
		</Drop>
	);
};

export default DropDowns;
