import { HiDotsHorizontal } from "react-icons/hi";
import { Drop } from "../styles/basic.styles";

const DropDowns = () => {
	return (
		<Drop>
			<Drop.Toggle size="sm" id="dropdown-basic">
				<HiDotsHorizontal />
			</Drop.Toggle>

			<Drop.Menu>
				<Drop.Item href="#/action-1">Details</Drop.Item>
				<Drop.Item href="#/action-2">Edit</Drop.Item>
				<Drop.Item href="#/action-3">Suspend</Drop.Item>
			</Drop.Menu>
		</Drop>
	);
};

export default DropDowns;
